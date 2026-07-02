import { useMemo } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import InventoryIcon from "@mui/icons-material/Inventory";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import DescriptionIcon from "@mui/icons-material/Description";
import { useItems } from "../hooks/useItems.js";

const API_URL = import.meta.env.VITE_API_URL;

const STAT_CARDS = [
  { key: "total",    label: "Total",      icon: <HomeIcon />,       color: "#64748b", bg: "#f8fafc" },
  { key: "box",      label: "Cajas",      icon: <Inventory2Icon />, color: "#f59e0b", bg: "#fffbeb" },
  { key: "item",     label: "Inventario", icon: <InventoryIcon />,  color: "#3b82f6", bg: "#eff6ff" },
  { key: "clothing", label: "Ropa",       icon: <CheckroomIcon />,  color: "#8b5cf6", bg: "#f5f3ff" },
  { key: "document", label: "Documentos", icon: <DescriptionIcon />,color: "#10b981", bg: "#ecfdf5" },
];

export const CATEGORY_META = {
  box:      { label: "Caja",       color: "#f59e0b", bg: "#fffbeb" },
  item:     { label: "Inventario", color: "#3b82f6", bg: "#eff6ff" },
  clothing: { label: "Ropa",       color: "#8b5cf6", bg: "#f5f3ff" },
  document: { label: "Documento",  color: "#10b981", bg: "#ecfdf5" },
};

function StatCard({ label, value, icon, color, bg, loading }) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {label}
            </Typography>
            {loading ? (
              <Skeleton width={48} height={44} />
            ) : (
              <Typography variant="h4" fontWeight={700}>
                {value}
              </Typography>
            )}
          </Box>
          <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: bg, color, display: "flex" }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number,
  icon: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
  bg: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

function DashboardPage({ onNavigate }) {
  const filters = useMemo(() => ({ archived: false }), []);
  const { items, stats, isLoading } = useItems(API_URL, filters);
  const recent = items.slice(0, 6);

  return (
    <Box>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Box>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Bienvenido
          </Typography>
          <Typography color="text.secondary">
            Gestiona el inventario de tu hogar de forma sencilla.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => onNavigate("items")}
          size="large"
        >
          Agregar item
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 5 }}>
        {STAT_CARDS.map(({ key, label, icon, color, bg }) => (
          <Grid item xs={6} sm={4} md key={key}>
            <StatCard
              label={label}
              value={stats[key]}
              icon={icon}
              color={color}
              bg={bg}
              loading={isLoading}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" fontWeight={700}>
          Últimos items
        </Typography>
        <Button size="small" onClick={() => onNavigate("items")}>
          Ver todos
        </Button>
      </Box>

      {isLoading ? (
        <Stack spacing={1}>
          {[1, 2, 3].map((k) => (
            <Skeleton key={k} height={72} variant="rounded" sx={{ borderRadius: 3 }} />
          ))}
        </Stack>
      ) : recent.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: "center", py: 5 }}>
            <Typography color="text.secondary">
              No hay items aún. ¡Comienza agregando uno!
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={1}>
          {recent.map((item) => {
            const meta = CATEGORY_META[item.category] ?? { label: item.category, color: "#64748b", bg: "#f8fafc" };
            return (
              <Card key={item.id}>
                <CardContent
                  sx={{ py: "12px !important", display: "flex", alignItems: "center", gap: 2 }}
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography fontWeight={600} noWrap>
                      {item.name}
                    </Typography>
                    {item.location && (
                      <Typography variant="body2" color="text.secondary" noWrap>
                        📍 {item.location}
                      </Typography>
                    )}
                  </Box>
                  <Chip
                    label={meta.label}
                    size="small"
                    sx={{ bgcolor: meta.bg, color: meta.color, border: "none", flexShrink: 0 }}
                  />
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      )}
    </Box>
  );
}

DashboardPage.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

export default DashboardPage;
