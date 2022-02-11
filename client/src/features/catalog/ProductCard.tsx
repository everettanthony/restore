import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { Link } from "react-router-dom";
import { addBasketItemAsync } from "../basket/basketSlice";
import { Product } from "../../app/models/product";
import numFormatted from "../../app/utilities/numFormatted";
import { Card, CardMedia, CardContent, CardActions, Typography, Divider, Button } from "@mui/material"; 
import { LoadingButton } from "@mui/lab";

interface Props {
  product: Product;
}

export default function  ProductCard({product}: Props) {
  const { status } = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();

  return (
    <Card>
      <CardMedia
        sx={{ height: 140, backgroundSize: "contain", bgcolor: "#a7d0f1" }}
        image={product.pictureUrl}
        title={product.name} 
      />
      <CardContent sx={{ pb: 0 }}>
        <Typography gutterBottom color="primary.main" fontWeight="bold" variant="body1">
          {product.name}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
        <Typography gutterBottom variant="h6">
          {numFormatted(product.price / 100)} 
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <LoadingButton 
          loading={status.includes('pendingAddItem' + product.id  + 'add')} 
          size="small" 
          onClick={() => dispatch(addBasketItemAsync({productId: product.id, name: 'add'}))}>Add To Cart</LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
  )
}