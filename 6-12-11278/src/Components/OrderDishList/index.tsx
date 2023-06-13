import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import { OrderDish } from "../../models";
import OrderDishListItem from "../OrderDishListItem";

// export default function OrderDishList({ order }: { order: Order }) {
export default function OrderDishList({ order }: { order: any }) {
  const [orderDishes, setOrderDishes] = useState<OrderDish[]>([]);

  async function fetchOrderDishes() {
    // NOTE: Added check to ensure that order is present:
    if (order) {
      // NOTE: what should the type be, here, if any?
      const _orderDishes = await order.orderDishes.toArray();
      setOrderDishes(_orderDishes);
    }
  }

  useEffect(() => {
    if (!order?.id) {
      return;
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
