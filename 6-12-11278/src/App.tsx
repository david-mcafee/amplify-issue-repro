import { useEffect, useState } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Order, OrderStatus, OrderDish, OrderItem, Restaurant } from "./models";
import DataStoreOperations from "./Components/DataStoreOperations";
import OrderDishList from "./Components/OrderDishList";

// Hard coding restaurant id so we have it on sub instantiation:
const restaurantId = "a50ae53a-cae8-4391-8df5-ab9f7fb5902b";

// region: https://github.com/aws-amplify/amplify-js/issues/11594
const start = "2023-07-13T01:21:54.908Z";
const end = "2023-07-15T01:21:54.908Z";
// endregion

function App() {
  const [orders, setOrders] = useState<Order[]>([]);

  //region testing helpers
  async function createNewRestaurant() {
    const restaurant = await DataStore.save(
      new Restaurant({
        name: "Restaurant 1",
      })
    );
    console.log("Created Restaurant:", restaurant.id);
  }

  async function queryAll() {
    // region: https://github.com/aws-amplify/amplify-js/issues/11594
    console.log("start", start);
    console.log("end", end);
    // endregion

    const orders = await DataStore.query(Order);
    console.log("Orders", orders);
    setOrders(orders);

    const orderDishes = await DataStore.query(OrderDish);
    console.log("OrderDishes", orderDishes);

    const orderItems = await DataStore.query(OrderItem);
    console.log("OrderItems", orderItems);
  }

  async function populateData() {
    const order = await DataStore.save(
      new Order({
        name: "Order 1",
        status: OrderStatus.NEW,
        restaurantOrdersId: restaurantId,
      })
    );

    const orderItem1 = await DataStore.save(
      new OrderItem({
        name: "OrderItem 1",
      })
    );

    await DataStore.save(
      new OrderDish({
        name: "OrderDish 1",
        dish: orderItem1,
        orderOrderDishesId: order.id,
      })
    );

    const orderItem2 = await DataStore.save(
      new OrderItem({
        name: "OrderItem 2",
      })
    );

    await DataStore.save(
      new OrderDish({
        name: "OrderDish 2",
        dish: orderItem2,
        orderOrderDishesId: order.id,
      })
    );

    await queryAll();
  }

  function clearLocalState() {
    setOrders([]);
  }

  async function deleteAll() {
    await DataStore.delete(Order, Predicates.ALL);
    await DataStore.delete(OrderDish, Predicates.ALL);
    await DataStore.delete(OrderItem, Predicates.ALL);
    clearLocalState();
  }
  //endregion

  // Original sub test:
  // useEffect(() => {
  //   if (!restaurantId) {
  //     return;
  //   }

  //   /**
  //    * Observe Model Order
  //    * ACCEPTED, NEW, COOKING AND READY_FOR_PICKUP ORDERS
  //    */
  //   const subscription = DataStore.observeQuery(Order, (order) =>
  //     order.and((order) => [
  //       order.restaurantOrdersId.eq(restaurantId),
  //       order.or((o) => [
  //         o.status.eq(OrderStatus.ACCEPTED),
  //         o.status.eq(OrderStatus.COOKING),
  //         o.status.eq(OrderStatus.NEW),
  //         o.status.eq(OrderStatus.READY_FOR_PICKUP),
  //       ]),
  //     ])
  //   ).subscribe((snapshot) => {
  //     const { items, isSynced } = snapshot;
  //     console.log(
  //       `[Snapshot] Orders fetched: ${items.length}, isSynced: ${isSynced}`
  //     );

  //     setOrders(items);
  //   });

  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, []);

  useEffect(() => {
    if (!restaurantId) {
      return;
    }

    const subscription = DataStore.observeQuery(Order, (order) =>
      order.and((order) => [
        order.createdAt.between(start, end), // breaks the observer
        order.restaurantOrdersId.eq(restaurantId),
        order.or((o) => [
          o.status.eq(OrderStatus.ACCEPTED),
          o.status.eq(OrderStatus.COOKING),
          o.status.eq(OrderStatus.NEW),
          o.status.eq(OrderStatus.READY_FOR_PICKUP),
        ]),
      ])
    ).subscribe((snapshot) => {
      const { items, isSynced } = snapshot;
      console.log(
        `[Snapshot] Orders fetched: ${items.length}, isSynced: ${isSynced}`
      );

      setOrders(items);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  function OrderCardItem({ order }: { order: Order }) {
    return (
      <Card>
        <h4>{`Order: ${order.name}`}</h4>
        <OrderDishList order={order} />
      </Card>
    );
  }

  // https://github.com/aws-amplify/amplify-js/issues/11552
  async function checkStaleDeletedData() {
    // Add children to parent:
    await DataStore.save(
      new Order({
        name: "Order 1",
        status: OrderStatus.NEW,
        restaurantOrdersId: restaurantId,
      })
    );
    await DataStore.save(
      new Order({
        name: "Order 2",
        status: OrderStatus.NEW,
        restaurantOrdersId: restaurantId,
      })
    );
    await DataStore.save(
      new Order({
        name: "Order 3",
        status: OrderStatus.NEW,
        restaurantOrdersId: restaurantId,
      })
    );

    // Query parent:
    const queriedParent = await DataStore.query(Restaurant, restaurantId);

    // Retrieve children:
    const children: Order[] | undefined = await queriedParent?.orders.toArray();

    // Delete children if they exist:
    if (!children) {
      return;
    }

    await Promise.all(children?.map(async (o) => await DataStore.delete(o)));

    // Retrieve children again:
    const reQueredChildren = await queriedParent?.orders.toArray();

    // Children are still present locally, even though they are deleted:
    console.log("Re-queried children:", reQueredChildren);

    /**
     * Lazy loaded properties are memoized to align more with the immutable
     * nature of our model instances. I.e., once you look at an instances
     * properties, they will not change.
     *
     */

    // Re-query parent:
    const reQueriedParent = await DataStore.query(Restaurant, restaurantId);

    // Retrieve children from re-queried parent:
    const ordersFromRequeriedParent = await reQueriedParent?.orders.toArray();

    // Children are no longer present locally:
    console.log("Re-queried children:", ordersFromRequeriedParent);
  }

  return (
    <div className="App">
      <header className="App-header">
        <DataStoreOperations deleteAll={deleteAll} />
        <button onClick={createNewRestaurant}>createNewRestaurant</button>
        <button onClick={populateData}>Populate data</button>
        <button onClick={queryAll}>Query All</button>
        <h3>{`Restaurant: ${restaurantId}`}</h3>
        <h3>{orders && `Number of orders: ${orders.length}`}</h3>
        <List>
          {orders.map((order) => (
            <Box key={order.id}>
              <OrderCardItem order={order} />
              <Divider />
            </Box>
          ))}
        </List>
        <h3>Issue 11552</h3>
        <button onClick={checkStaleDeletedData}>checkStaleDeletedData</button>
      </header>
    </div>
  );
}

export default App;
