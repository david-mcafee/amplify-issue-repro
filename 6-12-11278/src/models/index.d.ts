import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum OrderStatus {
  ACCEPTED = "ACCEPTED",
  COOKING = "COOKING",
  NEW = "NEW",
  READY_FOR_PICKUP = "READY_FOR_PICKUP"
}



type EagerRestaurant = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Restaurant, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly orders?: (Order | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRestaurant = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Restaurant, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly orders: AsyncCollection<Order>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Restaurant = LazyLoading extends LazyLoadingDisabled ? EagerRestaurant : LazyRestaurant

export declare const Restaurant: (new (init: ModelInit<Restaurant>) => Restaurant) & {
  copyOf(source: Restaurant, mutator: (draft: MutableModel<Restaurant>) => MutableModel<Restaurant> | void): Restaurant;
}

type EagerOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly status?: OrderStatus | keyof typeof OrderStatus | null;
  readonly orderDishes?: (OrderDish | null)[] | null;
  readonly restaurant?: Restaurant | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly restaurantOrdersId?: string | null;
}

type LazyOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly status?: OrderStatus | keyof typeof OrderStatus | null;
  readonly orderDishes: AsyncCollection<OrderDish>;
  readonly restaurant: AsyncItem<Restaurant | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly restaurantOrdersId?: string | null;
}

export declare type Order = LazyLoading extends LazyLoadingDisabled ? EagerOrder : LazyOrder

export declare const Order: (new (init: ModelInit<Order>) => Order) & {
  copyOf(source: Order, mutator: (draft: MutableModel<Order>) => MutableModel<Order> | void): Order;
}

type EagerOrderDish = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrderDish, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly dish?: OrderItem | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderOrderDishesId?: string | null;
  readonly orderDishDishId?: string | null;
}

type LazyOrderDish = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrderDish, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly dish: AsyncItem<OrderItem | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderOrderDishesId?: string | null;
  readonly orderDishDishId?: string | null;
}

export declare type OrderDish = LazyLoading extends LazyLoadingDisabled ? EagerOrderDish : LazyOrderDish

export declare const OrderDish: (new (init: ModelInit<OrderDish>) => OrderDish) & {
  copyOf(source: OrderDish, mutator: (draft: MutableModel<OrderDish>) => MutableModel<OrderDish> | void): OrderDish;
}

type EagerOrderItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrderItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOrderItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrderItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type OrderItem = LazyLoading extends LazyLoadingDisabled ? EagerOrderItem : LazyOrderItem

export declare const OrderItem: (new (init: ModelInit<OrderItem>) => OrderItem) & {
  copyOf(source: OrderItem, mutator: (draft: MutableModel<OrderItem>) => MutableModel<OrderItem> | void): OrderItem;
}