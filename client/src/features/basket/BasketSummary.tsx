import { Fragment } from "react";
import { useAppSelector } from "../../app/store/configureStore";
import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import totalsNumFormatted from "../../app/utilities/totalsNumFormatted";

export default function BasketSummary() {
    const { basket } = useAppSelector(state => state.basket);
    const subTotal = basket?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
    const deliveryFee = subTotal > 10000 ? 0 : 500;

    return (
      <Fragment>
        <TableContainer component={Paper} variant={'outlined'} sx={{pt: 1,px:1}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell colSpan={2} sx={{fontWeight: 700}}>Subtotal</TableCell>
                <TableCell align="right">{totalsNumFormatted(subTotal)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2} sx={{fontWeight: 700}}>Delivery fee*</TableCell>
                <TableCell align="right">{totalsNumFormatted(deliveryFee)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2} sx={{fontWeight: 700}}>Total</TableCell>
                <TableCell align="right">{totalsNumFormatted(subTotal + deliveryFee)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span style={{fontStyle: 'italic'}}>*Orders over $100 qualify for free delivery</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Fragment>
    )
}