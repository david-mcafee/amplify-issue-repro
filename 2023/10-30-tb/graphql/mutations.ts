/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $condition: ModelCommentConditionInput
    $input: CreateCommentInput!
  ) {
    createComment(condition: $condition, input: $input) {
      content
      createdAt
      id
      owner
      post {
        body
        createdAt
        id
        link
        owner
        title
        updatedAt
        __typename
      }
      postCommentsId
      updatedAt
      __typename
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $condition: ModelPostConditionInput
    $input: CreatePostInput!
  ) {
    createPost(condition: $condition, input: $input) {
      body
      comments {
        nextToken
        __typename
      }
      createdAt
      id
      link
      owner
      title
      updatedAt
      __typename
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $condition: ModelCommentConditionInput
    $input: DeleteCommentInput!
  ) {
    deleteComment(condition: $condition, input: $input) {
      content
      createdAt
      id
      owner
      post {
        body
        createdAt
        id
        link
        owner
        title
        updatedAt
        __typename
      }
      postCommentsId
      updatedAt
      __typename
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $condition: ModelPostConditionInput
    $input: DeletePostInput!
  ) {
    deletePost(condition: $condition, input: $input) {
      body
      comments {
        nextToken
        __typename
      }
      createdAt
      id
      link
      owner
      title
      updatedAt
      __typename
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $condition: ModelCommentConditionInput
    $input: UpdateCommentInput!
  ) {
    updateComment(condition: $condition, input: $input) {
      content
      createdAt
      id
      owner
      post {
        body
        createdAt
        id
        link
        owner
        title
        updatedAt
        __typename
      }
      postCommentsId
      updatedAt
      __typename
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $condition: ModelPostConditionInput
    $input: UpdatePostInput!
  ) {
    updatePost(condition: $condition, input: $input) {
      body
      comments {
        nextToken
        __typename
      }
      createdAt
      id
      link
      owner
      title
      updatedAt
      __typename
    }
  }
`;
