// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrderStatus = {
  "ACCEPTED": "ACCEPTED",
  "COOKING": "COOKING",
  "NEW": "NEW",
  "READY_FOR_PICKUP": "READY_FOR_PICKUP"
};

const { Restaurant, Order, OrderDish, OrderItem } = initSchema(schema);

export {
  Restaurant,
  Order,
  OrderDish,
  OrderItem,
  OrderStatus
};