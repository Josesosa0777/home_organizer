from __future__ import annotations

import json
import logging
import os
import sqlite3
from pathlib import Path
from sqlite3 import Connection, Row
from typing import Any, Dict

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

DEFAULT_DB_PATH = Path(__file__).resolve().parent / "home_organizer.db"


def get_database_url() -> str:
    return os.getenv("DATABASE_URL", str(DEFAULT_DB_PATH))


def get_connection(db_path: str | None = None) -> Connection:
    if db_path is None:
        db_path = get_database_url()
    uri_mode = db_path.startswith("file:")
    connection = sqlite3.connect(
        db_path,
        check_same_thread=False,
        detect_types=sqlite3.PARSE_DECLTYPES,
        uri=uri_mode,
    )
    connection.row_factory = sqlite3.Row
    return connection


def serialize_item(row: Row) -> Dict[str, Any]:
    if row is None:
        raise ValueError("No se encontró el registro")

    tags_value = []
    metadata_value: Dict[str, Any] = {}
    try:
        tags_value = json.loads(row["tags"]) if row["tags"] else []
    except (json.JSONDecodeError, TypeError):
        tags_value = []
    try:
        metadata_value = json.loads(row["metadata"]) if row["metadata"] else {}
    except (json.JSONDecodeError, TypeError):
        metadata_value = {}

    return {
        "id": row["id"],
        "name": row["name"],
        "category": row["category"],
        "location": row["location"],
        "tags": tags_value,
        "notes": row["notes"],
        "archived": bool(row["archived"]),
        "created_at": row["created_at"],
        "metadata": metadata_value,
    }


def init_db(db_path: str | None = None) -> None:
    if db_path is None:
        db_path = get_database_url()

    if db_path.startswith("file:") and "memory" in db_path:
        logger.info("Inicializando base de datos en memoria compartida")
    else:
        logger.info("Inicializando base de datos %s", db_path)

    with get_connection(db_path) as connection:
        connection.executescript(
            """
            CREATE TABLE IF NOT EXISTS items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                category TEXT NOT NULL,
                location TEXT,
                tags TEXT,
                notes TEXT,
                archived INTEGER DEFAULT 0,
                created_at TEXT,
                metadata TEXT
            );
            CREATE INDEX IF NOT EXISTS idx_items_category ON items(category);
            CREATE INDEX IF NOT EXISTS idx_items_archived ON items(archived);
            CREATE INDEX IF NOT EXISTS idx_items_name ON items(name);
            """
        )
        connection.commit()
        logger.info("Base de datos inicializada")
