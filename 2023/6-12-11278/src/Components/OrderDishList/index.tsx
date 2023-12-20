import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import { OrderDish } from "../../models";
import OrderDishListItem from "../OrderDishListItem";
import { Order } from "../../models";

export default function OrderDishList({ order }: { order: Order }) {
  const [orderDishes, setOrderDishes] = useState<OrderDish[]>([]);

  useEffect(() => {
    if (!order?.id) {
      return;
    }

    // NOTE: Move `fetchOrderDishes` definition within `useEffect`:
    async function fetchOrderDishes() {
      // NOTE: Added check to ensure that `order` is present:
      if (order) {
        const _orderDishes = await order.orderDishes.toArray();
        setOrderDishes(_orderDishes);
      }
    }

    fetchOrderDishes();
  }, [order?.id]);

  return (
    <>
      <Box>
        {orderDishes.map((od, index) => (
          <ListItem key={od.id} disablePadding>
            <OrderDishListItem orderDish={od} />
          </ListItem>
        ))}
      </Box>
    </>
  );
}
