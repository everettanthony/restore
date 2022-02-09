import { Card, CardActions, CardContent, Skeleton, Divider } from "@mui/material";

export default function ProductCardSkeleton() {
  return (
    <Card>
      <Skeleton sx={{ height: 140 }} animation="wave" variant="rectangular" />
      <CardContent sx={{ pb: 0, height: 109.4 }}>
        <Skeleton animation="wave" height={24} style={{ marginBottom: 5 }} width="90%" />
        <Skeleton animation="wave" height={20} style={{ marginBottom: 5 }} width="70%" />
        <Skeleton animation="wave" height={32} style={{ marginBottom: 10 }} width="40%" />
      </CardContent>
      <Divider />
      <CardActions sx={{ height: 47 }}>
        <Skeleton animation="wave" height={31} width='40%' />
        <Skeleton animation="wave" height={31} width="20%" />
      </CardActions>
    </Card>
  )
}