import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Stats from "../components/Stats.jsx";

describe("Stats", () => {
  it("muestra estadísticas cuando hay datos", () => {
    render(<Stats stats={{ total: 3, box: 1, item: 1, clothing: 1, document: 0 }} loading={false} />);
    expect(screen.getByText(/Total/i)).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
