import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { BasketItem } from "../../app/models/basket";
import { removeBasketItemAsync, addBasketItemAsync } from "./basketSlice";
import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Box } from "@mui/system";
import numFormatted from "../../app/utilities/numFormatted";

interface Props {
    items: BasketItem[];
    isBasket?: boolean;
}

export default function BasketTable({ items, isBasket = true }: Props) {
    const { status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    return (
      <TableContainer component={Paper} variant='outlined'>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell align='center'>Quantity</TableCell>
              <TableCell>Subtotal</TableCell>
              {isBasket && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(item => (
              <TableRow
                key={item.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                    <Box display='flex' alignItems='center'>
                      <img src={item.pictureUrl} alt={item.name} style={{height: 50, marginRight: 20}}/>
                      <span>{item.name}</span>
                    </Box>
                  </TableCell>
                  <TableCell>{numFormatted(item.price / 100)}</TableCell>
                  <TableCell align='center'>
                    {isBasket && 
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
                    }
                    <span style={{paddingLeft: 3, paddingRight: 3}}>{item.quantity}</span>
                    {isBasket && 
                      <LoadingButton 
                        loading={status === 'pendingAddItem' + item.productId + 'add'} 
                        color='secondary' 
                        onClick={() => dispatch(addBasketItemAsync({productId: item.productId, name: 'add'}))}>
                        <Add />
                      </LoadingButton>
                    }
                    </TableCell>
                  <TableCell>{numFormatted((item.price / 100) * item.quantity)}</TableCell>
                  {isBasket && 
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
                  }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}