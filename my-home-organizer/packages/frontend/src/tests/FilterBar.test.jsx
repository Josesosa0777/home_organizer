import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FilterBar from "../components/FilterBar.jsx";

describe("FilterBar", () => {
  it("renderiza los controles de filtro", () => {
    render(<FilterBar category="" archived={false} search="" onCategoryChange={() => {}} onArchivedChange={() => {}} onSearchChange={() => {}} />);
    expect(screen.queryAllByText(/Categoría/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("textbox", { name: /Buscar/i })).toBeInTheDocument();
  });
});
