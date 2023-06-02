/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSong = /* GraphQL */ `
  query GetSong($id: ID!) {
    getSong(id: $id) {
      id
      name
      coverArtKey
      createdAt
      updatedAt
    }
  }
`;
export const listSongs = /* GraphQL */ `
  query ListSongs(
    $filter: ModelSongFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSongs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        coverArtKey
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserProfile = /* GraphQL */ `
  query GetUserProfile($id: ID!) {
    getUserProfile(id: $id) {
      id
      name
      imageKeys
      createdAt
      updatedAt
    }
  }
`;
export const listUserProfiles = /* GraphQL */ `
  query ListUserProfiles(
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        imageKeys
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPhotoAlbum = /* GraphQL */ `
  query GetPhotoAlbum($id: ID!) {
    getPhotoAlbum(id: $id) {
      id
      name
      imageKeys
      createdAt
      updatedAt
    }
  }
`;
export const listPhotoAlbums = /* GraphQL */ `
  query ListPhotoAlbums(
    $filter: ModelPhotoAlbumFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPhotoAlbums(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        imageKeys
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
