import { useMemo } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useItems } from "../hooks/useItems.js";
import ItemList from "../components/ItemList.jsx";

const API_URL = import.meta.env.VITE_API_URL;

function ArchivedPage() {
  const filters = useMemo(() => ({ archived: true }), []);
  const { items, isLoading, deleteItem, toggleArchive } = useItems(API_URL, filters);

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Archivados
        </Typography>
        <Typography color="text.secondary">
          Items archivados. Puedes restaurarlos o eliminarlos.
        </Typography>
      </Box>

      {!isLoading && items.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: "center", py: 5 }}>
            <Typography color="text.secondary">No hay items archivados.</Typography>
          </CardContent>
        </Card>
      ) : (
        <ItemList
          items={items}
          loading={isLoading}
          onDelete={deleteItem}
          onToggleArchive={toggleArchive}
        />
      )}
    </Box>
  );
}

export default ArchivedPage;
