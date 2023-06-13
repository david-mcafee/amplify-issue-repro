import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { OrderItem } from "../../models";

// function OrderDishListItem({ orderDish }: { orderDish: OrderDish }) {
// TODO: what should type be, here?
export default function OrderDishListItem({ orderDish }: { orderDish: any }) {
  const [dish, setDish] = useState<OrderItem>();

  useEffect(() => {
    // NOTE: `fetchDish` should be async, but it's not. Move `fetchDish` definition within useEffect instead.
    async function fetchDish() {
      // setDishError(false);
      // setLoading(true);

      // console.log("fetch dish", orderDish);

      // First check that there is an `orderDish`:
      if (orderDish) {
        const dish = await orderDish.dish;
        setDish(dish);
      }

      // Previous code:
      // orderDish.dish
      //   .then((d) => {
      //     // Why is Dish empty???
      //     if (d?.id) {
      //       setDish(d);
      //       // resolvedDish(d);
      //     } else {
      //       setDishError("Dish is Empty");
      //     }
      //   })
      //   .catch((error) => setDishError(error?.message || true))
      //   .finally(() =>
      //     setTimeout(() => {
      //       setLoading(false);
      //     }, 500)
      //   );
    }

    fetchDish();
  }, []);

  return (
    <Box>
      <Typography fontWeight={800}>{`Dish name: ${dish?.name}`}</Typography>
    </Box>
  );
}
