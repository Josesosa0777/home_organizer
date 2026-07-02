import { useState, useMemo } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import FilterBar from "../components/FilterBar.jsx";
import ItemList from "../components/ItemList.jsx";
import ItemForm from "../components/ItemForm.jsx";
import { useItems } from "../hooks/useItems.js";

const API_URL = import.meta.env.VITE_API_URL;

function ItemsPage() {
  const [category, setCategory] = useState("");
  const [archived, setArchived] = useState(false);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const filters = useMemo(
    () => ({ category: category || undefined, archived, search: search || undefined }),
    [category, archived, search],
  );

  const { items, isLoading, createItem, updateItem, deleteItem, toggleArchive } = useItems(
    API_URL,
    filters,
  );

  const handleEdit = (item) => {
    setEditingItem(item);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setEditingItem(null);
  };

  const handleSave = async (item) => {
    if (editingItem) {
      await updateItem(editingItem.id, item);
    } else {
      await createItem(item);
    }
    handleClose();
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" fontWeight={800}>
          Items
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Nuevo item
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <FilterBar
          category={category}
          archived={archived}
          search={search}
          onCategoryChange={setCategory}
          onArchivedChange={setArchived}
          onSearchChange={setSearch}
        />
      </Box>

      <ItemList
        items={items}
        loading={isLoading}
        onEdit={handleEdit}
        onDelete={deleteItem}
        onToggleArchive={toggleArchive}
      />

      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}
        >
          {editingItem ? "Editar item" : "Nuevo item"}
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: "8px !important" }}>
          <ItemForm
            editingItem={editingItem}
            onSave={handleSave}
            onCancel={handleClose}
            bare
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default ItemsPage;
