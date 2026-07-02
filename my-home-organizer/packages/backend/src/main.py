from __future__ import annotations

import json
import logging
from datetime import datetime, timezone
from sqlite3 import Connection
from typing import Any, Dict, List, Optional

from fastapi import FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .database import get_connection, get_database_url, init_db, serialize_item
from .models import ItemCreate, ItemResponse, ItemUpdate, StatsResponse, VALID_CATEGORIES

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

app = FastAPI(
    title="My Home Organizer",
    description="API para gestión de items del hogar con categorías, filtros y estadísticas.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event() -> None:
    init_db(get_database_url())


def build_item_query(
    category: Optional[str] = None,
    archived: Optional[bool] = None,
    search: Optional[str] = None,
) -> tuple[str, List[Any]]:
    clauses: List[str] = []
    values: List[Any] = []

    if category:
        normalized = category.strip().lower()
        if normalized not in VALID_CATEGORIES:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="categoría inválida",
            )
        clauses.append("category = ?")
        values.append(normalized)

    if archived is not None:
        clauses.append("archived = ?")
        values.append(1 if archived else 0)

    if search:
        clauses.append("LOWER(name) LIKE ?")
        values.append(f"%{search.strip().lower()}%")

    query = "SELECT * FROM items"
    if clauses:
        query += " WHERE " + " AND ".join(clauses)
    query += " ORDER BY created_at DESC"
    return query, values


def get_item_or_404(item_id: int, connection: Connection) -> Dict[str, Any]:
    cursor = connection.execute("SELECT * FROM items WHERE id = ?", (item_id,))
    row = cursor.fetchone()
    if row is None:
        logger.warning("Item no encontrado: %s", item_id)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item no encontrado",
        )
    return serialize_item(row)


@app.get("/api/items", response_model=List[ItemResponse])
async def list_items(
    category: Optional[str] = Query(None),
    archived: Optional[bool] = Query(None),
    search: Optional[str] = Query(None),
) -> List[Dict[str, Any]]:
    query, values = build_item_query(category, archived, search)
    with get_connection(get_database_url()) as connection:
        logger.info(
            "Listando items con filtros: category=%s archived=%s search=%s",
            category,
            archived,
            search,
        )
        cursor = connection.execute(query, values)
        rows = cursor.fetchall()
        return [serialize_item(row) for row in rows]


@app.post(
    "/api/items",
    response_model=ItemResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_item(item: ItemCreate) -> Dict[str, Any]:
    payload = item.model_dump()
    stored_tags = json.dumps(payload["tags"])
    stored_metadata = json.dumps(payload["metadata"])
    created_at = datetime.now(timezone.utc).isoformat()
    archived_value = 1 if payload.get("archived") else 0

    with get_connection(get_database_url()) as connection:
        cursor = connection.execute(
            """
            INSERT INTO items (
                name, category, location, tags, notes, archived,
                created_at, metadata
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                payload["name"],
                payload["category"],
                payload["location"],
                stored_tags,
                payload["notes"],
                archived_value,
                created_at,
                stored_metadata,
            ),
        )
        connection.commit()
        item_id = cursor.lastrowid
        logger.info("Item creado con ID %s", item_id)
        return {**payload, "id": item_id, "created_at": created_at}


@app.get("/api/items/{item_id}", response_model=ItemResponse)
async def get_item(item_id: int) -> Dict[str, Any]:
    with get_connection(get_database_url()) as connection:
        return get_item_or_404(item_id, connection)


@app.patch("/api/items/{item_id}", response_model=ItemResponse)
async def update_item(item_id: int, item_update: ItemUpdate) -> Dict[str, Any]:
    update_data = item_update.model_dump(exclude_unset=True)
    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Se requiere al menos un campo para actualizar",
        )

    if "tags" in update_data:
        update_data["tags"] = json.dumps(update_data["tags"])
    if "metadata" in update_data:
        update_data["metadata"] = json.dumps(update_data["metadata"])
    if "archived" in update_data:
        update_data["archived"] = 1 if update_data["archived"] else 0

    assignments = ", ".join(f"{key} = ?" for key in update_data.keys())
    values = list(update_data.values())
    values.append(item_id)

    with get_connection(get_database_url()) as connection:
        get_item_or_404(item_id, connection)
        connection.execute(f"UPDATE items SET {assignments} WHERE id = ?", tuple(values))
        connection.commit()
        logger.info("Item actualizado %s", item_id)
        return get_item_or_404(item_id, connection)


@app.delete("/api/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item(item_id: int) -> JSONResponse:
    with get_connection(get_database_url()) as connection:
        get_item_or_404(item_id, connection)
        connection.execute("DELETE FROM items WHERE id = ?", (item_id,))
        connection.commit()
        logger.info("Item eliminado %s", item_id)
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT, content=None)


@app.patch("/api/items/{item_id}/archive", response_model=ItemResponse)
async def toggle_archive(item_id: int) -> Dict[str, Any]:
    with get_connection(get_database_url()) as connection:
        item = get_item_or_404(item_id, connection)
        next_archived = 0 if item["archived"] else 1
        connection.execute("UPDATE items SET archived = ? WHERE id = ?", (next_archived, item_id))
        connection.commit()
        logger.info("Archivo alternado para item %s", item_id)
        return get_item_or_404(item_id, connection)


@app.get("/api/stats", response_model=StatsResponse)
async def get_stats() -> Dict[str, int]:
    with get_connection(get_database_url()) as connection:
        cursor = connection.execute("SELECT COUNT(*) as total FROM items")
        total = cursor.fetchone()["total"]
        counts: Dict[str, int] = {category: 0 for category in VALID_CATEGORIES}
        cursor = connection.execute(
            "SELECT category, COUNT(*) as count FROM items GROUP BY category"
        )
        for row in cursor.fetchall():
            counts[row["category"]] = row["count"]
        logger.info("Estadísticas calculadas")
        return {
            "total": total,
            "box": counts.get("box", 0),
            "item": counts.get("item", 0),
            "clothing": counts.get("clothing", 0),
            "document": counts.get("document", 0),
        }
