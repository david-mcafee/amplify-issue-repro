/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateHabit = /* GraphQL */ `subscription OnCreateHabit(
  $filter: ModelSubscriptionHabitFilterInput
  $owner: String
) {
  onCreateHabit(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateHabitSubscriptionVariables,
  APITypes.OnCreateHabitSubscription
>;
export const onUpdateHabit = /* GraphQL */ `subscription OnUpdateHabit(
  $filter: ModelSubscriptionHabitFilterInput
  $owner: String
) {
  onUpdateHabit(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateHabitSubscriptionVariables,
  APITypes.OnUpdateHabitSubscription
>;
export const onDeleteHabit = /* GraphQL */ `subscription OnDeleteHabit(
  $filter: ModelSubscriptionHabitFilterInput
  $owner: String
) {
  onDeleteHabit(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteHabitSubscriptionVariables,
  APITypes.OnDeleteHabitSubscription
>;
