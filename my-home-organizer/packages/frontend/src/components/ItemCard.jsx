import PropTypes from "prop-types";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Stack,
  Chip,
} from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function ItemCard({ item, onEdit, onDelete, onToggleArchive }) {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="h6">{item.name}</Typography>
          <Chip label={item.category} size="small" />
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {item.location || "Sin ubicación"}
        </Typography>
        {item.notes && <Typography variant="body2">Notas: {item.notes}</Typography>}
      </CardContent>
      <CardActions>
        <IconButton aria-label="editar" onClick={() => onEdit(item)}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="archivar" onClick={() => onToggleArchive(item.id)}>
          <ArchiveIcon />
        </IconButton>
        <IconButton aria-label="eliminar" onClick={() => onDelete(item.id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

ItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    location: PropTypes.string,
    notes: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleArchive: PropTypes.func.isRequired,
};

export default ItemCard;
