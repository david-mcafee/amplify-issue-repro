import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { OrderDish, OrderItem } from "../../models";

export default function OrderDishListItem({
  orderDish,
}: {
  orderDish: OrderDish;
}) {
  const [dish, setDish] = useState<OrderItem>();

  useEffect(() => {
    // NOTE: Move `fetchDish` definition within `useEffect`:
    async function fetchDish() {
      // NOTE: Added check to ensure that `orderDish` is present:
      if (orderDish) {
        const dish = await orderDish.dish;
        setDish(dish);
      }
    }

    fetchDish();
  }, []);

  return (
    <Box>
      <Typography fontWeight={800}>{`Dish name: ${dish?.name}`}</Typography>
    </Box>
  );
}
