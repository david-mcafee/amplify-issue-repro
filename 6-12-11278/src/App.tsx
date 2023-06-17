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

  useEffect(() => {
    if (!restaurantId) {
      return;
    }

    /**
     * Observe Model Order
     * ACCEPTED, NEW, COOKING AND READY_FOR_PICKUP ORDERS
     */
    const subscription = DataStore.observeQuery(Order, (order) =>
      order.and((order) => [
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
      </header>
    </div>
  );
}

export default App;
