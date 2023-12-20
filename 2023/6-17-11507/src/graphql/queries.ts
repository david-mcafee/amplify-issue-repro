/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUpload = /* GraphQL */ `
  query GetUpload($id: ID!) {
    getUpload(id: $id) {
      id
      datetime
      name
      status
      type
      uploadCount
      processCount
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listUploads = /* GraphQL */ `
  query ListUploads(
    $filter: ModelUploadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUploads(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        datetime
        name
        status
        type
        uploadCount
        processCount
        userID
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
export const syncUploads = /* GraphQL */ `
  query SyncUploads(
    $filter: ModelUploadFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUploads(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        datetime
        name
        status
        type
        uploadCount
        processCount
        userID
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
export const uploadsByUserID = /* GraphQL */ `
  query UploadsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUploadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    uploadsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        datetime
        name
        status
        type
        uploadCount
        processCount
        userID
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
