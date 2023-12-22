/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getHabit = /* GraphQL */ `query GetHabit($id: ID!) {
  getHabit(id: $id) {
    id
    name
    count
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetHabitQueryVariables, APITypes.GetHabitQuery>;
export const listHabits = /* GraphQL */ `query ListHabits(
  $filter: ModelHabitFilterInput
  $limit: Int
  $nextToken: String
) {
  listHabits(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      count
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListHabitsQueryVariables,
  APITypes.ListHabitsQuery
>;
export const syncHabits = /* GraphQL */ `query SyncHabits(
  $filter: ModelHabitFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncHabits(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      name
      count
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncHabitsQueryVariables,
  APITypes.SyncHabitsQuery
>;
