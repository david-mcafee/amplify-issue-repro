/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const postmanEcho = /* GraphQL */ `
  query PostmanEcho($params: QueryPostmanEchoParamsInput!) {
    postmanEcho(params: $params) {
      args {
        key
        __typename
      }
      headers
      url
      __typename
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
