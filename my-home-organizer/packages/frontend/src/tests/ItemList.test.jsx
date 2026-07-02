import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ItemList from "../components/ItemList.jsx";

// Mock ItemCard to avoid Material UI icons import issues in tests
vi.mock("../components/ItemCard.jsx", () => ({
  default: ({ item }) => <div>{item.name}</div>,
}));

describe("ItemList", () => {
  it("muestra mensaje cuando no hay items", () => {
    render(<ItemList items={[]} loading={false} onEdit={() => {}} onDelete={() => {}} onToggleArchive={() => {}} />);
    expect(screen.getByText(/No hay items/i)).toBeInTheDocument();
  });
});
