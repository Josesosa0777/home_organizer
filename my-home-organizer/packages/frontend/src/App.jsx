import { useMemo, useState } from "react";
import { Container, CssBaseline, Typography, Box, Divider } from "@mui/material";
import { useItems } from "./hooks/useItems.js";
import ItemList from "./components/ItemList.jsx";
import ItemForm from "./components/ItemForm.jsx";
import FilterBar from "./components/FilterBar.jsx";
import Stats from "./components/Stats.jsx";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [category, setCategory] = useState("");
  const [archived, setArchived] = useState(false);
  const [search, setSearch] = useState("");
  const [editingItem, setEditingItem] = useState(null);

  const query = useMemo(
    () => ({ category: category || undefined, archived, search: search || undefined }),
    [category, archived, search],
  );

  const { items, stats, isLoading, refetch, createItem, updateItem, deleteItem, toggleArchive } = useItems(API_URL, query);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          My Home Organizer
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Organiza cajas, inventario, ropa y documentos importantes en un solo lugar.
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Stats stats={stats} loading={isLoading} />
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
        <Box sx={{ mb: 4 }}>
          <ItemForm
            apiUrl={API_URL}
            editingItem={editingItem}
            onSave={async (item) => {
              if (editingItem) {
                await updateItem(editingItem.id, item);
                setEditingItem(null);
              } else {
                await createItem(item);
              }
              refetch();
            }}
            onCancel={() => setEditingItem(null)}
          />
        </Box>
        <Divider sx={{ mb: 3 }} />
        <ItemList
          items={items}
          loading={isLoading}
          onEdit={setEditingItem}
          onDelete={async (id) => {
            await deleteItem(id);
            refetch();
          }}
          onToggleArchive={async (id) => {
            await toggleArchive(id);
            refetch();
          }}
        />
      </Container>
    </>
  );
}

export default App;
