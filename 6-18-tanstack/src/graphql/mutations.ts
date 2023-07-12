/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRealEstateProperty = /* GraphQL */ `
  mutation CreateRealEstateProperty(
    $input: CreateRealEstatePropertyInput!
    $condition: ModelRealEstatePropertyConditionInput
  ) {
    createRealEstateProperty(input: $input, condition: $condition) {
      id
      name
      address
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateRealEstateProperty = /* GraphQL */ `
  mutation UpdateRealEstateProperty(
    $input: UpdateRealEstatePropertyInput!
    $condition: ModelRealEstatePropertyConditionInput
  ) {
    updateRealEstateProperty(input: $input, condition: $condition) {
      id
      name
      address
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteRealEstateProperty = /* GraphQL */ `
  mutation DeleteRealEstateProperty(
    $input: DeleteRealEstatePropertyInput!
    $condition: ModelRealEstatePropertyConditionInput
  ) {
    deleteRealEstateProperty(input: $input, condition: $condition) {
      id
      name
      address
      createdAt
      updatedAt
      __typename
    }
  }
`;
