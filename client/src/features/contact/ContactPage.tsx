import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { decrement, increment } from "./counterSlice";

export default function ContactPage() {
  const dispatch = useAppDispatch();
  const { data, title } = useAppSelector(state => state.counter);

  return (
    <div>
      <Typography variant='h2'>
        {title}        
      </Typography>
      <Typography variant='h5'>
        Data: {data}        
      </Typography>
      <ButtonGroup>
        <Button variant='contained' color='error' sx={{ marginRight: 1 }} onClick={() => dispatch(decrement(1))}>-</Button>
        <Button variant='contained' color='primary' sx={{ marginRight: 1 }} onClick={() => dispatch(increment(1))}>+</Button>
        <Button variant='contained' color='secondary' onClick={() => dispatch(increment(5))}>+5</Button>
      </ButtonGroup>
    </div>
  )
}