import { useEffect , useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { Link, useParams } from "react-router-dom";
import LoadingComponent from '../../app/layout/LoadingComponent';
import { Box, Button, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import ViewListIcon from '@mui/icons-material/ViewList';
import NotFound from "../../app/errors/NotFound";
import numFormatted from "../../app/utilities/numFormatted";
import { LoadingButton } from "@mui/lab";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function  ProductDetails() {
  const { basket, status } = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();
  const { id } = useParams<{id: string}>();
  const product = useAppSelector(state => productSelectors.selectById(state, id));
  const { status: productStatus } = useAppSelector(state => state.catalog);
  const [quantity, setQuantity] = useState(0);
  const item = basket?.items.find(i => i.productId === product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    if (!product) dispatch(fetchProductAsync(parseInt(id)));
  }, [id, item, dispatch, product]);

  function handleInputChange(event: any) {
    if (event.target.value >= 0) {
      setQuantity(parseInt(event.target.value));
    }
  }

  function handleUpdateCart() {
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(addBasketItemAsync({productId: product?.id!, quantity: updatedQuantity}))
    }
    else {
      const updatedQuantity = item.quantity - quantity;
      dispatch(removeBasketItemAsync({productId: product?.id!, quantity: updatedQuantity}))    
    }
  }

  if (productStatus.includes('pending')) return <LoadingComponent message='Loading product details...' />
  if (!product) return <NotFound />

  return (
    <Grid container spacing={6}>
      <Grid item xs={6} sx={{alignItems: 'center', display: 'flex', justifyContent: 'center'}}>
        <img src={product.pictureUrl} alt={product.name} style={{width: '75%'}} />
      </Grid>
      <Grid item xs={6}>
        <Typography variant='h3'>{product.name}</Typography>
        <Divider sx={{mb: 2}} />
        <Typography variant='h4' color='secondary'>{numFormatted(product.price / 100)}</Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2} sx={{marginTop:1}}>
          <Grid item xs={6}>
            <TextField 
              variant='outlined' 
              type='number' 
              label='Quantity in Cart' 
              fullWidth 
              value={quantity} 
              onChange={handleInputChange} />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton 
              disabled={(item?.quantity === quantity) || (!item && quantity === 0)}
              loading={status.includes('pending')} 
              sx={{height: '55px'}} 
              color='primary' 
              size='large' 
              variant='contained' 
              fullWidth 
              onClick={handleUpdateCart}>
              {item ? 'Update Quantity' : 'Add to Cart'}
            </LoadingButton>
          </Grid>
        </Grid>
        <Box display='flex' justifyContent='flex-end' marginTop='15px'>
          <Button 
            component={Link} 
            to={`/catalog`} 
            size="large" 
            variant='contained' 
            color='secondary' 
            startIcon={<ViewListIcon />}>Return to Catalog</Button>
        </Box>
      </Grid>
    </Grid>
  )
}