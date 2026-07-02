import PropTypes from "prop-types";
import { FormControl, InputLabel, MenuItem, Select, TextField, Switch, FormControlLabel, Stack } from "@mui/material";

const FILTER_CATEGORIES = ["", "box", "item", "clothing", "document"];

function FilterBar({ category, archived, search, onCategoryChange, onArchivedChange, onSearchChange }) {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
      <FormControl sx={{ minWidth: 160 }}>
        <InputLabel shrink>Categoría</InputLabel>
        <Select displayEmpty value={category} label="Categoría" onChange={(event) => onCategoryChange(event.target.value)} notched>
          {FILTER_CATEGORIES.map((option) => (
            <MenuItem key={option} value={option}>
              {option || "Todas"}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Buscar"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        sx={{ flex: 1 }}
      />
      <FormControlLabel
        control={<Switch checked={archived} onChange={(event) => onArchivedChange(event.target.checked)} />}
        label="Solo archivados"
      />
    </Stack>
  );
}

FilterBar.propTypes = {
  category: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  search: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onArchivedChange: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default FilterBar;
