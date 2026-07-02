import PropTypes from "prop-types";
import { Grid, Card, CardContent, Typography, Skeleton } from "@mui/material";

function Stats({ stats, loading }) {
  if (loading) {
    return (
      <Grid container spacing={2}>
        {[1, 2, 3, 4, 5].map((key) => (
          <Grid item xs={12} sm={6} md={4} key={key}>
            <Skeleton height={120} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="subtitle2">Total</Typography>
            <Typography variant="h5">{stats.total}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="subtitle2">Cajas</Typography>
            <Typography variant="h5">{stats.box}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="subtitle2">Inventario</Typography>
            <Typography variant="h5">{stats.item}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="subtitle2">Ropa</Typography>
            <Typography variant="h5">{stats.clothing}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="subtitle2">Documentos</Typography>
            <Typography variant="h5">{stats.document}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

Stats.propTypes = {
  stats: PropTypes.shape({
    total: PropTypes.number,
    box: PropTypes.number,
    item: PropTypes.number,
    clothing: PropTypes.number,
    document: PropTypes.number,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Stats;
