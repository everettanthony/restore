import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { Order } from "../../app/models/order";
import OrderDetailed from "./OrderDetailed";
import LoadingComponent from "../../app/layout/LoadingComponent";
import totalsNumFormatted from "../../app/utilities/totalsNumFormatted";
import dateFormatted from "../../app/utilities/dateFormatted";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";

export default function Orders() {
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedOrderNumber, setSelectedOrderNumber] = useState(0);

    useEffect(() => {
      agent.Orders.list()
        .then(orders => setOrders(orders))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }, [])

    if (loading) return <LoadingComponent message='Loading orders' />

    if (selectedOrderNumber > 0) return (
      <OrderDetailed 
          order={orders?.find(o => o.id === selectedOrderNumber)!}
          setSelectedOrder={setSelectedOrderNumber}
      />
    )

    return (
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                  <TableRow>
                      <TableCell>Order Number</TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell>Order Date</TableCell>
                      <TableCell>Order Status</TableCell>
                      <TableCell>Actions</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {orders?.map((order) => (
                      <TableRow
                          key={order.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component="th" scope="row">
                              {order.id}
                          </TableCell>
                          <TableCell>{totalsNumFormatted(order.total)}</TableCell>
                          <TableCell>{dateFormatted(order.orderDate)}</TableCell>
                          <TableCell>{order.orderStatus}</TableCell>
                          <TableCell>
                              <Button onClick={() => setSelectedOrderNumber(order.id)}>
                                  View
                              </Button>
                          </TableCell>
                      </TableRow>
                  ))}
              </TableBody>
          </Table>
      </TableContainer>
    )
}