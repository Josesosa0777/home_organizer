import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const VALID_CATEGORIES = ["box", "item", "clothing", "document"];

function ItemForm({ editingItem, onSave, onCancel }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("item");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const [notes, setNotes] = useState("");
  const [metadata, setMetadata] = useState("{}");

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setCategory(editingItem.category);
      setLocation(editingItem.location ?? "");
      setTags((editingItem.tags || []).join(", "));
      setNotes(editingItem.notes ?? "");
      setMetadata(JSON.stringify(editingItem.metadata ?? {}, null, 2));
      return;
    }
    setName("");
    setCategory("item");
    setLocation("");
    setTags("");
    setNotes("");
    setMetadata("{}");
  }, [editingItem]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let parsedMetadata = {};

    try {
      parsedMetadata = JSON.parse(metadata);
    } catch {
      return;
    }

    await onSave({
      name,
      category,
      location: location || undefined,
      tags: tags ? tags.split(",").map((tag) => tag.trim()).filter(Boolean) : [],
      notes: notes || undefined,
      metadata: parsedMetadata,
    });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {editingItem ? "Editar item" : "Crear nuevo item"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Nombre"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <TextField
            select
            label="Categoría"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {VALID_CATEGORIES.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Ubicación"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
          <TextField
            label="Tags"
            helperText="Separar con comas"
            value={tags}
            onChange={(event) => setTags(event.target.value)}
          />
          <TextField
            label="Notas"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            multiline
          />
          <TextField
            label="Metadata JSON"
            value={metadata}
            onChange={(event) => setMetadata(event.target.value)}
            multiline
            minRows={4}
            helperText={'Ejemplo: { "room": "sala" }'}
          />
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained">
              Guardar
            </Button>
            {editingItem && (
              <Button variant="outlined" onClick={onCancel}>
                Cancelar
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}

ItemForm.propTypes = {
  editingItem: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ItemForm;
