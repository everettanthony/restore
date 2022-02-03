import { useEffect , useState } from "react";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { Link, useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import LoadingComponent from '../../app/layout/LoadingComponent';
import { Box, Button, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import ViewListIcon from '@mui/icons-material/ViewList';
import NotFound from "../../app/errors/NotFound";
import numFormatted from "../../app/utilities/numFormatted";
import { LoadingButton } from "@mui/lab";

export default function  ProductDetails() {
  const {basket, setBasket, removeItem} = useStoreContext();
  const { id } = useParams<{id: string}>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const item = basket?.items.find(i => i.productId === product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);

    agent.Catalog.details(parseInt(id))
      .then(rsp => setProduct(rsp))
      .catch(error => console.log('Error', error))
      .finally(() => setLoading(false));
  }, [id, item]);

  function handleInputChange(event: any) {
    if (event.target.value >= 0) {
      setQuantity(parseInt(event.target.value));
    }
  }

  function handleUpdateCart() {
    setSubmitting(true);

    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      agent.Basket.addItem(product?.id!, updatedQuantity)
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setSubmitting(false))
    }
    else {
      const updatedQuantity = item.quantity - quantity;
      agent.Basket.removeItem(product?.id!, updatedQuantity)
        .then(basket => removeItem(product?.id!, updatedQuantity))
        .catch(error => console.log(error))
        .finally(() => setSubmitting(false))
    }
  }

  if (loading) return <LoadingComponent message='Loading product details...' />
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
              loading={submitting} 
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