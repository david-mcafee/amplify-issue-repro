/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRestaurant = /* GraphQL */ `
  query GetRestaurant($id: ID!) {
    getRestaurant(id: $id) {
      id
      name
      description
      orders {
        items {
          id
          name
          status
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          restaurantOrdersId
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listRestaurants = /* GraphQL */ `
  query ListRestaurants(
    $filter: ModelRestaurantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRestaurants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        orders {
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncRestaurants = /* GraphQL */ `
  query SyncRestaurants(
    $filter: ModelRestaurantFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRestaurants(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        description
        orders {
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      name
      status
      orderDishes {
        items {
          id
          name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          orderOrderDishesId
          orderDishDishId
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      restaurant {
        id
        name
        description
        orders {
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      restaurantOrdersId
      __typename
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        status
        orderDishes {
          nextToken
          startedAt
          __typename
        }
        restaurant {
          id
          name
          description
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        restaurantOrdersId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncOrders = /* GraphQL */ `
  query SyncOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncOrders(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        status
        orderDishes {
          nextToken
          startedAt
          __typename
        }
        restaurant {
          id
          name
          description
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        restaurantOrdersId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getOrderDish = /* GraphQL */ `
  query GetOrderDish($id: ID!) {
    getOrderDish(id: $id) {
      id
      name
      dish {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      orderOrderDishesId
      orderDishDishId
      __typename
    }
  }
`;
export const listOrderDishes = /* GraphQL */ `
  query ListOrderDishes(
    $filter: ModelOrderDishFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrderDishes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        dish {
          id
          name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        orderOrderDishesId
        orderDishDishId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncOrderDishes = /* GraphQL */ `
  query SyncOrderDishes(
    $filter: ModelOrderDishFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncOrderDishes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        dish {
          id
          name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        orderOrderDishesId
        orderDishDishId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getOrderItem = /* GraphQL */ `
  query GetOrderItem($id: ID!) {
    getOrderItem(id: $id) {
      id
      name
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listOrderItems = /* GraphQL */ `
  query ListOrderItems(
    $filter: ModelOrderItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrderItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncOrderItems = /* GraphQL */ `
  query SyncOrderItems(
    $filter: ModelOrderItemFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncOrderItems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
