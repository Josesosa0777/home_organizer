import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ItemForm from "../components/ItemForm.jsx";

describe("ItemForm", () => {
  it("renderiza el formulario y llama onSave", async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const onCancel = vi.fn();
    render(<ItemForm editingItem={null} onSave={onSave} onCancel={onCancel} />);

    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: "Test Item" } });
    fireEvent.click(screen.getByRole("button", { name: /Guardar/i }));

    expect(onSave).toHaveBeenCalled();
  });
});
