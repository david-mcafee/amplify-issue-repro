/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUploadInput = {
  id?: string | null,
  datetime: string,
  name: string,
  status: number,
  type: Array< number >,
  uploadCount: number,
  processCount: number,
  userID: string,
  _version?: number | null,
};

export type ModelUploadConditionInput = {
  datetime?: ModelStringInput | null,
  name?: ModelStringInput | null,
  status?: ModelIntInput | null,
  type?: ModelIntInput | null,
  uploadCount?: ModelIntInput | null,
  processCount?: ModelIntInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelUploadConditionInput | null > | null,
  or?: Array< ModelUploadConditionInput | null > | null,
  not?: ModelUploadConditionInput | null,
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

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Upload = {
  __typename: "Upload",
  id: string,
  datetime: string,
  name: string,
  status: number,
  type: Array< number >,
  uploadCount: number,
  processCount: number,
  userID: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateUploadInput = {
  id: string,
  datetime?: string | null,
  name?: string | null,
  status?: number | null,
  type?: Array< number > | null,
  uploadCount?: number | null,
  processCount?: number | null,
  userID?: string | null,
  _version?: number | null,
};

export type DeleteUploadInput = {
  id: string,
  _version?: number | null,
};

export type ModelUploadFilterInput = {
  id?: ModelIDInput | null,
  datetime?: ModelStringInput | null,
  name?: ModelStringInput | null,
  status?: ModelIntInput | null,
  type?: ModelIntInput | null,
  uploadCount?: ModelIntInput | null,
  processCount?: ModelIntInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelUploadFilterInput | null > | null,
  or?: Array< ModelUploadFilterInput | null > | null,
  not?: ModelUploadFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelUploadConnection = {
  __typename: "ModelUploadConnection",
  items:  Array<Upload | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelSubscriptionUploadFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  datetime?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionIntInput | null,
  type?: ModelSubscriptionIntInput | null,
  uploadCount?: ModelSubscriptionIntInput | null,
  processCount?: ModelSubscriptionIntInput | null,
  userID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionUploadFilterInput | null > | null,
  or?: Array< ModelSubscriptionUploadFilterInput | null > | null,
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

export type CreateUploadMutationVariables = {
  input: CreateUploadInput,
  condition?: ModelUploadConditionInput | null,
};

export type CreateUploadMutation = {
  createUpload?:  {
    __typename: "Upload",
    id: string,
    datetime: string,
    name: string,
    status: number,
    type: Array< number >,
    uploadCount: number,
    processCount: number,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateUploadMutationVariables = {
  input: UpdateUploadInput,
  condition?: ModelUploadConditionInput | null,
};

export type UpdateUploadMutation = {
  updateUpload?:  {
    __typename: "Upload",
    id: string,
    datetime: string,
    name: string,
    status: number,
    type: Array< number >,
    uploadCount: number,
    processCount: number,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteUploadMutationVariables = {
  input: DeleteUploadInput,
  condition?: ModelUploadConditionInput | null,
};

export type DeleteUploadMutation = {
  deleteUpload?:  {
    __typename: "Upload",
    id: string,
    datetime: string,
    name: string,
    status: number,
    type: Array< number >,
    uploadCount: number,
    processCount: number,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetUploadQueryVariables = {
  id: string,
};

export type GetUploadQuery = {
  getUpload?:  {
    __typename: "Upload",
    id: string,
    datetime: string,
    name: string,
    status: number,
    type: Array< number >,
    uploadCount: number,
    processCount: number,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListUploadsQueryVariables = {
  filter?: ModelUploadFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUploadsQuery = {
  listUploads?:  {
    __typename: "ModelUploadConnection",
    items:  Array< {
      __typename: "Upload",
      id: string,
      datetime: string,
      name: string,
      status: number,
      type: Array< number >,
      uploadCount: number,
      processCount: number,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncUploadsQueryVariables = {
  filter?: ModelUploadFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUploadsQuery = {
  syncUploads?:  {
    __typename: "ModelUploadConnection",
    items:  Array< {
      __typename: "Upload",
      id: string,
      datetime: string,
      name: string,
      status: number,
      type: Array< number >,
      uploadCount: number,
      processCount: number,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type UploadsByUserIDQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUploadFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UploadsByUserIDQuery = {
  uploadsByUserID?:  {
    __typename: "ModelUploadConnection",
    items:  Array< {
      __typename: "Upload",
      id: string,
      datetime: string,
      name: string,
      status: number,
      type: Array< number >,
      uploadCount: number,
      processCount: number,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateUploadSubscriptionVariables = {
  filter?: ModelSubscriptionUploadFilterInput | null,
};

export type OnCreateUploadSubscription = {
  onCreateUpload?:  {
    __typename: "Upload",
    id: string,
    datetime: string,
    name: string,
    status: number,
    type: Array< number >,
    uploadCount: number,
    processCount: number,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateUploadSubscriptionVariables = {
  filter?: ModelSubscriptionUploadFilterInput | null,
};

export type OnUpdateUploadSubscription = {
  onUpdateUpload?:  {
    __typename: "Upload",
    id: string,
    datetime: string,
    name: string,
    status: number,
    type: Array< number >,
    uploadCount: number,
    processCount: number,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteUploadSubscriptionVariables = {
  filter?: ModelSubscriptionUploadFilterInput | null,
};

export type OnDeleteUploadSubscription = {
  onDeleteUpload?:  {
    __typename: "Upload",
    id: string,
    datetime: string,
    name: string,
    status: number,
    type: Array< number >,
    uploadCount: number,
    processCount: number,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
