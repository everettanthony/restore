import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/store/configureStore";
import BasketSummary from "./BasketSummary";
import BasketTable from "./BasketTable";
import { Typography, Grid, Button } from "@mui/material";

export default function BasketPage() {
  const { basket } = useAppSelector(state => state.basket);
  if (!basket) return <Typography variant='h3'>Your basket is empty</Typography>

  return (
    <Fragment>
      <BasketTable items={basket.items} />
      <Grid container sx={{mt:1}}>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <BasketSummary />
          <Button
            component={Link}
            to='/checkout'
            variant='contained'
            size='large'
            sx={{ marginTop: 1 }}
            fullWidth>Checkout
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  )
}