import { Product } from "../../app/models/product";
import { Card, CardMedia, CardContent, CardActions, Typography, Divider, Button } from "@mui/material"; 

interface Props {
  product: Product;
}

export default function  ProductCard({product}: Props) {
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
          {'$' + (product.price / 100).toFixed(2)} 
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Button size="small">Add To Cart</Button>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
  )
}