/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateRealEstatePropertyInput = {
  id?: string | null,
  name: string,
  address?: string | null,
};

export type ModelRealEstatePropertyConditionInput = {
  name?: ModelStringInput | null,
  address?: ModelStringInput | null,
  and?: Array< ModelRealEstatePropertyConditionInput | null > | null,
  or?: Array< ModelRealEstatePropertyConditionInput | null > | null,
  not?: ModelRealEstatePropertyConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type RealEstateProperty = {
  __typename: "RealEstateProperty",
  id: string,
  name: string,
  address?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateRealEstatePropertyInput = {
  id: string,
  name?: string | null,
  address?: string | null,
};

export type DeleteRealEstatePropertyInput = {
  id: string,
};

export type ModelRealEstatePropertyFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  address?: ModelStringInput | null,
  and?: Array< ModelRealEstatePropertyFilterInput | null > | null,
  or?: Array< ModelRealEstatePropertyFilterInput | null > | null,
  not?: ModelRealEstatePropertyFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelRealEstatePropertyConnection = {
  __typename: "ModelRealEstatePropertyConnection",
  items:  Array<RealEstateProperty | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionRealEstatePropertyFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  address?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionRealEstatePropertyFilterInput | null > | null,
  or?: Array< ModelSubscriptionRealEstatePropertyFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type CreateRealEstatePropertyMutationVariables = {
  input: CreateRealEstatePropertyInput,
  condition?: ModelRealEstatePropertyConditionInput | null,
};

export type CreateRealEstatePropertyMutation = {
  createRealEstateProperty?:  {
    __typename: "RealEstateProperty",
    id: string,
    name: string,
    address?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRealEstatePropertyMutationVariables = {
  input: UpdateRealEstatePropertyInput,
  condition?: ModelRealEstatePropertyConditionInput | null,
};

export type UpdateRealEstatePropertyMutation = {
  updateRealEstateProperty?:  {
    __typename: "RealEstateProperty",
    id: string,
    name: string,
    address?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRealEstatePropertyMutationVariables = {
  input: DeleteRealEstatePropertyInput,
  condition?: ModelRealEstatePropertyConditionInput | null,
};

export type DeleteRealEstatePropertyMutation = {
  deleteRealEstateProperty?:  {
    __typename: "RealEstateProperty",
    id: string,
    name: string,
    address?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetRealEstatePropertyQueryVariables = {
  id: string,
};

export type GetRealEstatePropertyQuery = {
  getRealEstateProperty?:  {
    __typename: "RealEstateProperty",
    id: string,
    name: string,
    address?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRealEstatePropertiesQueryVariables = {
  filter?: ModelRealEstatePropertyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRealEstatePropertiesQuery = {
  listRealEstateProperties?:  {
    __typename: "ModelRealEstatePropertyConnection",
    items:  Array< {
      __typename: "RealEstateProperty",
      id: string,
      name: string,
      address?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateRealEstatePropertySubscriptionVariables = {
  filter?: ModelSubscriptionRealEstatePropertyFilterInput | null,
};

export type OnCreateRealEstatePropertySubscription = {
  onCreateRealEstateProperty?:  {
    __typename: "RealEstateProperty",
    id: string,
    name: string,
    address?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRealEstatePropertySubscriptionVariables = {
  filter?: ModelSubscriptionRealEstatePropertyFilterInput | null,
};

export type OnUpdateRealEstatePropertySubscription = {
  onUpdateRealEstateProperty?:  {
    __typename: "RealEstateProperty",
    id: string,
    name: string,
    address?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRealEstatePropertySubscriptionVariables = {
  filter?: ModelSubscriptionRealEstatePropertyFilterInput | null,
};

export type OnDeleteRealEstatePropertySubscription = {
  onDeleteRealEstateProperty?:  {
    __typename: "RealEstateProperty",
    id: string,
    name: string,
    address?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
