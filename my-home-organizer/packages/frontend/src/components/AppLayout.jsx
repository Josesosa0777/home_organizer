import PropTypes from "prop-types";
import { AppBar, Toolbar, Typography, Box, Button, Container } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ArchiveIcon from "@mui/icons-material/Archive";

const NAV_ITEMS = [
  { key: "dashboard", label: "Inicio", icon: <DashboardIcon fontSize="small" /> },
  { key: "items", label: "Items", icon: <InventoryIcon fontSize="small" /> },
  { key: "archived", label: "Archivados", icon: <ArchiveIcon fontSize="small" /> },
];

function AppLayout({ page, onNavigate, children }) {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ bgcolor: "white", color: "text.primary", borderBottom: "1px solid #e2e8f0" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: 800, color: "primary.main", letterSpacing: "-0.5px" }}
          >
            🏠 Home Organizer
          </Typography>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            {NAV_ITEMS.map(({ key, label, icon }) => (
              <Button
                key={key}
                startIcon={icon}
                onClick={() => onNavigate(key)}
                variant={page === key ? "contained" : "text"}
                size="small"
                sx={{ px: 2 }}
              >
                {label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {children}
      </Container>
    </Box>
  );
}

AppLayout.propTypes = {
  page: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default AppLayout;
