import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: { main: "#2563eb" },
    secondary: { main: "#7c3aed" },
    background: { default: "#f1f5f9", paper: "#ffffff" },
    error: { main: "#ef4444" },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { border: "1px solid #e2e8f0" } },
    },
    MuiButton: {
      styleOverrides: { root: { textTransform: "none", fontWeight: 600, borderRadius: 8 } },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 600 } },
    },
    MuiDialog: {
      styleOverrides: { paper: { borderRadius: 16, border: "1px solid #e2e8f0" } },
    },
    MuiTextField: {
      defaultProps: { size: "small" },
    },
  },
});

export default theme;
