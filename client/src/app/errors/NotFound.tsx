import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container component={Paper} sx={{py: 2}}>
      <Typography variant='h3' color='error' gutterBottom sx={{mb: 0}}>Not Found</Typography>
      <Divider sx={{my: 1}} />
      <Button component={Link} to='/catalog' sx={{mt: 2}}>Return to Catalog</Button>
    </Container>
  )
}