import { Fragment } from "react";
import { useAppSelector } from "../../app/store/configureStore";
import BasketTable from "../basket/BasketTable";
import BasketSummary from "../basket/BasketSummary";
import { Grid, Typography } from "@mui/material";

export default function Review() {
  const { basket } = useAppSelector(state => state.basket);
 
  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>Order summary</Typography>
      {basket &&
        <BasketTable items={basket.items} isBasket={false} />    
      }
      <Grid container sx={{mt:1}}>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
        </Grid>
      </Grid>
    </Fragment>
  );
}