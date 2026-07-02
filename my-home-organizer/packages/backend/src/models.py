from __future__ import annotations

import json
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field, field_validator, model_validator

VALID_CATEGORIES = {"box", "item", "clothing", "document"}


class ItemBase(BaseModel):
    name: str = Field(..., min_length=1)
    category: str
    location: Optional[str] = None
    tags: List[str] = Field(default_factory=list)
    notes: Optional[str] = None
    archived: bool = False
    metadata: Dict[str, Any] = Field(default_factory=dict)

    @field_validator("category")
    @classmethod
    def validate_category(cls, value: str) -> str:
        category_value = value.strip().lower()
        if category_value not in VALID_CATEGORIES:
            raise ValueError("categoría inválida")
        return category_value

    @field_validator("tags", mode="before")
    @classmethod
    def ensure_tags_list(cls, value: Optional[Any]) -> List[str]:
        if value is None:
            return []
        if isinstance(value, str):
            return [tag.strip() for tag in value.split(",") if tag.strip()]
        if isinstance(value, list):
            return [str(tag).strip() for tag in value if str(tag).strip()]
        raise ValueError("tags debe ser una lista de cadenas")

    @field_validator("metadata", mode="before")
    @classmethod
    def ensure_metadata_dict(cls, value: Optional[Any]) -> Dict[str, Any]:
        if value is None:
            return {}
        if isinstance(value, str):
            try:
                data = json.loads(value)
            except json.JSONDecodeError as error:
                raise ValueError("metadata debe ser un JSON válido") from error
            if not isinstance(data, dict):
                raise ValueError("metadata debe ser un objeto JSON")
            return data
        if isinstance(value, dict):
            return value
        raise ValueError("metadata debe ser un objeto JSON")


class ItemCreate(ItemBase):
    pass


class ItemUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1)
    category: Optional[str] = None
    location: Optional[str] = None
    tags: Optional[List[str]] = None
    notes: Optional[str] = None
    archived: Optional[bool] = None
    metadata: Optional[Dict[str, Any]] = None

    @field_validator("category")
    @classmethod
    def validate_category(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return None
        category_value = value.strip().lower()
        if category_value not in VALID_CATEGORIES:
            raise ValueError("categoría inválida")
        return category_value

    @field_validator("tags", mode="before")
    @classmethod
    def ensure_tags_list(cls, value: Optional[Any]) -> Optional[List[str]]:
        if value is None:
            return None
        if isinstance(value, str):
            return [tag.strip() for tag in value.split(",") if tag.strip()]
        if isinstance(value, list):
            return [str(tag).strip() for tag in value if str(tag).strip()]
        raise ValueError("tags debe ser una lista de cadenas")

    @field_validator("metadata", mode="before")
    @classmethod
    def ensure_metadata_dict(cls, value: Optional[Any]) -> Optional[Dict[str, Any]]:
        if value is None:
            return None
        if isinstance(value, str):
            try:
                data = json.loads(value)
            except json.JSONDecodeError as error:
                raise ValueError("metadata debe ser un JSON válido") from error
            if not isinstance(data, dict):
                raise ValueError("metadata debe ser un objeto JSON")
            return data
        if isinstance(value, dict):
            return value
        raise ValueError("metadata debe ser un objeto JSON")

    @model_validator(mode="after")
    def minimum_one_field(self) -> "ItemUpdate":
        if not any(
            getattr(self, field) is not None
            for field in ["name", "category", "location", "tags", "notes", "archived", "metadata"]
        ):
            raise ValueError("Se requiere al menos un campo para actualizar")
        return self


class ItemResponse(ItemBase):
    id: int
    created_at: str


class StatsResponse(BaseModel):
    total: int
    box: int
    item: int
    clothing: int
    document: int
