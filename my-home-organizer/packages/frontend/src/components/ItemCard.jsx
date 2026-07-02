import PropTypes from "prop-types";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Stack,
  Chip,
  Box,
  Tooltip,
} from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const CATEGORY_META = {
  box:      { label: "Caja",       color: "#f59e0b", bg: "#fffbeb" },
  item:     { label: "Inventario", color: "#3b82f6", bg: "#eff6ff" },
  clothing: { label: "Ropa",       color: "#8b5cf6", bg: "#f5f3ff" },
  document: { label: "Documento",  color: "#10b981", bg: "#ecfdf5" },
};

function ItemCard({ item, onEdit, onDelete, onToggleArchive }) {
  const meta = CATEGORY_META[item.category] ?? { label: item.category, color: "#64748b", bg: "#f8fafc" };

  return (
    <Card sx={{ mb: 2, borderLeft: `4px solid ${meta.color}` }}>
      <CardContent sx={{ pb: "8px !important" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 0.5 }}>
          <Typography variant="h6" fontWeight={600} sx={{ lineHeight: 1.3, fontSize: "1rem" }}>
            {item.name}
          </Typography>
          <Chip
            label={meta.label}
            size="small"
            sx={{ bgcolor: meta.bg, color: meta.color, border: "none", ml: 1, flexShrink: 0 }}
          />
        </Stack>

        {item.location && (
          <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 0.5 }}>
            <LocationOnIcon sx={{ fontSize: 13, color: "text.disabled" }} />
            <Typography variant="body2" color="text.secondary">
              {item.location}
            </Typography>
          </Stack>
        )}

        {item.notes && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontStyle: "italic" }}>
            {item.notes}
          </Typography>
        )}

        {item.tags?.length > 0 && (
          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
            {item.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ height: 20, fontSize: 11 }} />
            ))}
          </Stack>
        )}
      </CardContent>

      <CardActions sx={{ pt: 0, px: 1.5, pb: 1 }}>
        {onEdit && (
          <Tooltip title="Editar">
            <IconButton size="small" onClick={() => onEdit(item)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title={item.archived ? "Restaurar" : "Archivar"}>
          <IconButton size="small" onClick={() => onToggleArchive(item.id)}>
            {item.archived ? (
              <UnarchiveIcon fontSize="small" />
            ) : (
              <ArchiveIcon fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar">
          <IconButton size="small" onClick={() => onDelete(item.id)} sx={{ color: "error.main" }}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
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
    tags: PropTypes.arrayOf(PropTypes.string),
    archived: PropTypes.bool,
  }).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  onToggleArchive: PropTypes.func.isRequired,
};

export default ItemCard;
