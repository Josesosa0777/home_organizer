import PropTypes from "prop-types";
import { Box, Typography, CircularProgress } from "@mui/material";
import ItemCard from "./ItemCard.jsx";

function ItemList({ items, loading, onEdit, onDelete, onToggleArchive }) {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!items.length) {
    return (
      <Typography color="text.secondary" sx={{ py: 4, textAlign: "center" }}>
        No hay items para mostrar.
      </Typography>
    );
  }

  return (
    <Box>
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleArchive={onToggleArchive}
        />
      ))}
    </Box>
  );
}

ItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  onToggleArchive: PropTypes.func.isRequired,
};

export default ItemList;
