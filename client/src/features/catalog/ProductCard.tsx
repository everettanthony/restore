import { useState } from "react";
import { useStoreContext } from "../../app/context/StoreContext";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import numFormatted from "../../app/utilities/numFormatted";
import { Card, CardMedia, CardContent, CardActions, Typography, Divider, Button } from "@mui/material"; 
import { LoadingButton } from "@mui/lab";

interface Props {
  product: Product;
}

export default function  ProductCard({product}: Props) {
  const [loading, setLoading] = useState(false);
  const {setBasket} = useStoreContext();

  function handleAddItem(productId: number) {
    setLoading(true);
    agent.Basket.addItem(productId)
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }

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
          loading={loading} 
          size="small" 
          onClick={() => handleAddItem(product.id)}>Add To Cart</LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
  )
}