/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateHabitInput = {
  id?: string | null,
  name: string,
  count: number,
  _version?: number | null,
};

export type ModelHabitConditionInput = {
  name?: ModelStringInput | null,
  count?: ModelIntInput | null,
  and?: Array< ModelHabitConditionInput | null > | null,
  or?: Array< ModelHabitConditionInput | null > | null,
  not?: ModelHabitConditionInput | null,
  _deleted?: ModelBooleanInput | null,
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

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Habit = {
  __typename: "Habit",
  id: string,
  name: string,
  count: number,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export type UpdateHabitInput = {
  id: string,
  name?: string | null,
  count?: number | null,
  _version?: number | null,
};

export type DeleteHabitInput = {
  id: string,
  _version?: number | null,
};

export type ModelHabitFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  count?: ModelIntInput | null,
  and?: Array< ModelHabitFilterInput | null > | null,
  or?: Array< ModelHabitFilterInput | null > | null,
  not?: ModelHabitFilterInput | null,
  _deleted?: ModelBooleanInput | null,
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

export type ModelHabitConnection = {
  __typename: "ModelHabitConnection",
  items:  Array<Habit | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelSubscriptionHabitFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  count?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionHabitFilterInput | null > | null,
  or?: Array< ModelSubscriptionHabitFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
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

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type CreateHabitMutationVariables = {
  input: CreateHabitInput,
  condition?: ModelHabitConditionInput | null,
};

export type CreateHabitMutation = {
  createHabit?:  {
    __typename: "Habit",
    id: string,
    name: string,
    count: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type UpdateHabitMutationVariables = {
  input: UpdateHabitInput,
  condition?: ModelHabitConditionInput | null,
};

export type UpdateHabitMutation = {
  updateHabit?:  {
    __typename: "Habit",
    id: string,
    name: string,
    count: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type DeleteHabitMutationVariables = {
  input: DeleteHabitInput,
  condition?: ModelHabitConditionInput | null,
};

export type DeleteHabitMutation = {
  deleteHabit?:  {
    __typename: "Habit",
    id: string,
    name: string,
    count: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type GetHabitQueryVariables = {
  id: string,
};

export type GetHabitQuery = {
  getHabit?:  {
    __typename: "Habit",
    id: string,
    name: string,
    count: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type ListHabitsQueryVariables = {
  filter?: ModelHabitFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListHabitsQuery = {
  listHabits?:  {
    __typename: "ModelHabitConnection",
    items:  Array< {
      __typename: "Habit",
      id: string,
      name: string,
      count: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncHabitsQueryVariables = {
  filter?: ModelHabitFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncHabitsQuery = {
  syncHabits?:  {
    __typename: "ModelHabitConnection",
    items:  Array< {
      __typename: "Habit",
      id: string,
      name: string,
      count: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateHabitSubscriptionVariables = {
  filter?: ModelSubscriptionHabitFilterInput | null,
  owner?: string | null,
};

export type OnCreateHabitSubscription = {
  onCreateHabit?:  {
    __typename: "Habit",
    id: string,
    name: string,
    count: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateHabitSubscriptionVariables = {
  filter?: ModelSubscriptionHabitFilterInput | null,
  owner?: string | null,
};

export type OnUpdateHabitSubscription = {
  onUpdateHabit?:  {
    __typename: "Habit",
    id: string,
    name: string,
    count: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteHabitSubscriptionVariables = {
  filter?: ModelSubscriptionHabitFilterInput | null,
  owner?: string | null,
};

export type OnDeleteHabitSubscription = {
  onDeleteHabit?:  {
    __typename: "Habit",
    id: string,
    name: string,
    count: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};
