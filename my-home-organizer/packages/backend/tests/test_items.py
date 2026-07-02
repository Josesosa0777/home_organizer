from __future__ import annotations

from pathlib import Path

import pytest
from fastapi import status
from httpx import AsyncClient, ASGITransport

from src.database import init_db
from src.main import app


@pytest.fixture(autouse=True)
def setup_database(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
    database_path = f"file:{tmp_path / 'test.db'}?mode=rwc"
    monkeypatch.setenv("DATABASE_URL", database_path)
    init_db(database_path)


@pytest.mark.asyncio
async def test_create_item_successful() -> None:
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as client:
        response = await client.post(
            "/api/items",
            json={
                "name": "Caja de cocina",
                "category": "box",
                "location": "cocina",
                "tags": ["fragil", "utensilios"],
                "notes": "Caja con platos y vasos",
                "metadata": {"box_number": 1, "destination_room": "cocina", "sealed": True},
            },
        )
        assert response.status_code == status.HTTP_201_CREATED
        body = response.json()
        assert body["id"] == 1
        assert body["name"] == "Caja de cocina"
        assert body["category"] == "box"


@pytest.mark.asyncio
async def test_get_item_successful() -> None:
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as client:
        create_response = await client.post(
            "/api/items",
            json={
                "name": "Camisa azul",
                "category": "clothing",
                "metadata": {"type": "camisa", "color": "azul"},
            },
        )
        item_id = create_response.json()["id"]
        response = await client.get(f"/api/items/{item_id}")
        assert response.status_code == status.HTTP_200_OK
        assert response.json()["name"] == "Camisa azul"


@pytest.mark.asyncio
async def test_update_item_successful() -> None:
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as client:
        create_response = await client.post(
            "/api/items",
            json={
                "name": "Documento garantía",
                "category": "document",
                "metadata": {"doc_type": "garantia"},
            },
        )
        item_id = create_response.json()["id"]
        response = await client.patch(
            f"/api/items/{item_id}",
            json={"location": "archivo", "archived": True},
        )
        assert response.status_code == status.HTTP_200_OK
        assert response.json()["location"] == "archivo"
        assert response.json()["archived"] is True


@pytest.mark.asyncio
async def test_delete_item_successful() -> None:
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as client:
        create_response = await client.post(
            "/api/items",
            json={"name": "Item general", "category": "item"},
        )
        item_id = create_response.json()["id"]
        delete_response = await client.delete(f"/api/items/{item_id}")
        assert delete_response.status_code == status.HTTP_204_NO_CONTENT
        get_response = await client.get(f"/api/items/{item_id}")
        assert get_response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.asyncio
async def test_list_items_and_filters() -> None:
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as client:
        await client.post(
            "/api/items",
            json={"name": "Caja sala", "category": "box", "metadata": {"box_number": 2}},
        )
        await client.post(
            "/api/items",
            json={
                "name": "Camisa verde",
                "category": "clothing",
                "metadata": {"type": "camisa", "color": "verde"},
            },
        )
        response = await client.get("/api/items?category=clothing")
        assert response.status_code == status.HTTP_200_OK
        items = response.json()
        assert len(items) == 1
        assert items[0]["category"] == "clothing"

        response_archived = await client.get("/api/items?archived=false")
        assert response_archived.status_code == status.HTTP_200_OK
        assert len(response_archived.json()) == 2

        response_search = await client.get("/api/items?search=camisa")
        assert response_search.status_code == status.HTTP_200_OK
        assert len(response_search.json()) == 1
        assert "Camisa" in response_search.json()[0]["name"]


@pytest.mark.asyncio
async def test_toggle_archive() -> None:
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as client:
        create_response = await client.post(
            "/api/items",
            json={"name": "Libro usar", "category": "item"},
        )
        item_id = create_response.json()["id"]
        toggle_response = await client.patch(f"/api/items/{item_id}/archive")
        assert toggle_response.status_code == status.HTTP_200_OK
        assert toggle_response.json()["archived"] is True
        toggle_response = await client.patch(f"/api/items/{item_id}/archive")
        assert toggle_response.json()["archived"] is False


@pytest.mark.asyncio
async def test_stats() -> None:
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as client:
        await client.post(
            "/api/items",
            json={"name": "Caja prueba", "category": "box", "metadata": {"box_number": 3}},
        )
        await client.post(
            "/api/items",
            json={"name": "Silla sala", "category": "item"},
        )
        await client.post(
            "/api/items",
            json={"name": "Pantalon", "category": "clothing"},
        )
        response = await client.get("/api/stats")
        assert response.status_code == status.HTTP_200_OK
        stats = response.json()
        assert stats["total"] == 3
        assert stats["box"] == 1
        assert stats["item"] == 1
        assert stats["clothing"] == 1
        assert stats["document"] == 0


@pytest.mark.asyncio
async def test_get_nonexistent_item_returns_404() -> None:
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as client:
        response = await client.get("/api/items/999")
        assert response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.asyncio
async def test_create_item_invalid_category_returns_422() -> None:
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as client:
        response = await client.post(
            "/api/items",
            json={"name": "Mueble", "category": "invalid"},
        )
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


@pytest.mark.asyncio
async def test_create_item_empty_name_returns_422() -> None:
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as client:
        response = await client.post(
            "/api/items",
            json={"name": "", "category": "item"},
        )
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


@pytest.mark.asyncio
async def test_patch_nonexistent_item_returns_404() -> None:
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as client:
        response = await client.patch("/api/items/999", json={"location": "bodega"})
        assert response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.asyncio
async def test_delete_nonexistent_item_returns_404() -> None:
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as client:
        response = await client.delete("/api/items/999")
        assert response.status_code == status.HTTP_404_NOT_FOUND
