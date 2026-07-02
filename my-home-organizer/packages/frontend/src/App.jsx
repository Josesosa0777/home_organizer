import { useState } from "react";
import AppLayout from "./components/AppLayout.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ItemsPage from "./pages/ItemsPage.jsx";
import ArchivedPage from "./pages/ArchivedPage.jsx";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <AppLayout page={page} onNavigate={setPage}>
      {page === "dashboard" && <DashboardPage onNavigate={setPage} />}
      {page === "items" && <ItemsPage />}
      {page === "archived" && <ArchivedPage />}
    </AppLayout>
  );
}

export default App;
