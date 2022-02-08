import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";
import numFormatted from "../../app/utilities/numFormatted";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, Paper, Box, Grid, Button } from "@mui/material";
import { Delete, Remove, Add } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";

export default function BasketPage() {
  const { basket, status } = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();

  if (!basket) return <Typography variant='h3'>Your basket is empty</Typography>

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell align='center'>Quantity</TableCell>
              <TableCell>Subtotal</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map(item => (
              <TableRow
                hover
                key={item.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { cursor: 'pointer' } }}>
                  <TableCell>
                    <Box display='flex' alignItems='center'>
                      <img src={item.pictureUrl} alt={item.name} style={{height: 50, marginRight: 20}}/>
                      <span>{item.name}</span>
                    </Box>
                  </TableCell>
                  <TableCell>{numFormatted(item.price / 100)}</TableCell>
                  <TableCell align='center'>
                    <LoadingButton 
                      loading={status === 'pendingRemoveItem' + item.productId + 'remove'} 
                      color='error' 
                      onClick={() => dispatch(removeBasketItemAsync({
                        productId: item.productId, 
                        quantity: 1,
                        name: 'remove'
                      }))}>
                      <Remove />
                    </LoadingButton>
                    <span style={{paddingLeft: 3, paddingRight: 3}}>{item.quantity}</span>
                    <LoadingButton 
                      loading={status === 'pendingAddItem' + item.productId} 
                      color='secondary' 
                      onClick={() => dispatch(addBasketItemAsync({productId: item.productId}))}>
                      <Add />
                    </LoadingButton>
                    </TableCell>
                  <TableCell>{numFormatted((item.price / 100) * item.quantity)}</TableCell>
                  <TableCell>
                    <LoadingButton 
                      loading={status === 'pendingRemoveItem' + item.productId + 'delete'} 
                      color='error' 
                      onClick={() => dispatch(removeBasketItemAsync(
                        {
                          productId: item.productId, 
                          quantity: item.quantity,
                          name: 'delete'
                        }))}>
                      <Delete/>
                    </LoadingButton>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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