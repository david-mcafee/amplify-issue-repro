/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRealEstateProperty = /* GraphQL */ `
  query GetRealEstateProperty($id: ID!) {
    getRealEstateProperty(id: $id) {
      id
      name
      address
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listRealEstateProperties = /* GraphQL */ `
  query ListRealEstateProperties(
    $filter: ModelRealEstatePropertyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRealEstateProperties(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        address
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
