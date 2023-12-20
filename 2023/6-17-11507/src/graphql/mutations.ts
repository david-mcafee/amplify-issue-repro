/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUpload = /* GraphQL */ `
  mutation CreateUpload(
    $input: CreateUploadInput!
    $condition: ModelUploadConditionInput
  ) {
    createUpload(input: $input, condition: $condition) {
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
export const updateUpload = /* GraphQL */ `
  mutation UpdateUpload(
    $input: UpdateUploadInput!
    $condition: ModelUploadConditionInput
  ) {
    updateUpload(input: $input, condition: $condition) {
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
export const deleteUpload = /* GraphQL */ `
  mutation DeleteUpload(
    $input: DeleteUploadInput!
    $condition: ModelUploadConditionInput
  ) {
    deleteUpload(input: $input, condition: $condition) {
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
