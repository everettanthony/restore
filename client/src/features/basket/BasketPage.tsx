import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../app/context/StoreContext";
import agent from "../../app/api/agent";
import numFormatted from "../../app/utilities/numFormatted";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, Paper, Box, Grid, Button } from "@mui/material";
import { Delete, Remove, Add } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";

export default function BasketPage() {
  const {basket, setBasket, removeItem} = useStoreContext();
  const [status, setStatus] = useState({
    loading: false,
    name: ''
  });

  function handleAddItem(productId: number, name: string) {
    setStatus({loading: true, name});
    agent.Basket.addItem(productId)
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setStatus({loading: false, name: ''}))
  }

  function handleRemoveItem(productId: number, quantity = 1, name: string) {
    setStatus({loading: true, name});
    agent.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch(error => console.log(error))
      .finally(() => setStatus({loading: false, name: ''}))
  }

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
                      loading={status.loading && status.name === 'remove' + item.productId} 
                      color='error' 
                      onClick={() => handleRemoveItem(item.productId, 1, 'remove' + item.productId)}>
                      <Remove />
                    </LoadingButton>
                    <span style={{paddingLeft: 3, paddingRight: 3}}>{item.quantity}</span>
                    <LoadingButton 
                      loading={status.loading && status.name === 'add' + item.productId} 
                      color='secondary' 
                      onClick={() => handleAddItem(item.productId, 'add' + item.productId)}>
                      <Add />
                    </LoadingButton>
                    </TableCell>
                  <TableCell>{numFormatted((item.price / 100) * item.quantity)}</TableCell>
                  <TableCell>
                    <LoadingButton 
                      loading={status.loading && status.name === 'delete' + item.productId} 
                      color='error' 
                      onClick={() => handleRemoveItem(item.productId, item.quantity, 'delete' + item.productId)}>
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
            fullWidth>Checkout
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  )
}