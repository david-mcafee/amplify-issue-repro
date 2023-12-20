/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateSongInput = {
  id?: string | null,
  name: string,
  coverArtKey?: string | null,
};

export type ModelSongConditionInput = {
  name?: ModelStringInput | null,
  coverArtKey?: ModelStringInput | null,
  and?: Array< ModelSongConditionInput | null > | null,
  or?: Array< ModelSongConditionInput | null > | null,
  not?: ModelSongConditionInput | null,
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

export type Song = {
  __typename: "Song",
  id: string,
  name: string,
  coverArtKey?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateSongInput = {
  id: string,
  name?: string | null,
  coverArtKey?: string | null,
};

export type DeleteSongInput = {
  id: string,
};

export type CreateUserProfileInput = {
  id?: string | null,
  name: string,
  imageKeys?: Array< string | null > | null,
};

export type ModelUserProfileConditionInput = {
  name?: ModelStringInput | null,
  imageKeys?: ModelStringInput | null,
  and?: Array< ModelUserProfileConditionInput | null > | null,
  or?: Array< ModelUserProfileConditionInput | null > | null,
  not?: ModelUserProfileConditionInput | null,
};

export type UserProfile = {
  __typename: "UserProfile",
  id: string,
  name: string,
  imageKeys?: Array< string | null > | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateUserProfileInput = {
  id: string,
  name?: string | null,
  imageKeys?: Array< string | null > | null,
};

export type DeleteUserProfileInput = {
  id: string,
};

export type CreatePhotoAlbumInput = {
  id?: string | null,
  name: string,
  imageKeys?: Array< string | null > | null,
};

export type ModelPhotoAlbumConditionInput = {
  name?: ModelStringInput | null,
  imageKeys?: ModelStringInput | null,
  and?: Array< ModelPhotoAlbumConditionInput | null > | null,
  or?: Array< ModelPhotoAlbumConditionInput | null > | null,
  not?: ModelPhotoAlbumConditionInput | null,
};

export type PhotoAlbum = {
  __typename: "PhotoAlbum",
  id: string,
  name: string,
  imageKeys?: Array< string | null > | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdatePhotoAlbumInput = {
  id: string,
  name?: string | null,
  imageKeys?: Array< string | null > | null,
};

export type DeletePhotoAlbumInput = {
  id: string,
};

export type ModelSongFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  coverArtKey?: ModelStringInput | null,
  and?: Array< ModelSongFilterInput | null > | null,
  or?: Array< ModelSongFilterInput | null > | null,
  not?: ModelSongFilterInput | null,
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

export type ModelSongConnection = {
  __typename: "ModelSongConnection",
  items:  Array<Song | null >,
  nextToken?: string | null,
};

export type ModelUserProfileFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  imageKeys?: ModelStringInput | null,
  and?: Array< ModelUserProfileFilterInput | null > | null,
  or?: Array< ModelUserProfileFilterInput | null > | null,
  not?: ModelUserProfileFilterInput | null,
};

export type ModelUserProfileConnection = {
  __typename: "ModelUserProfileConnection",
  items:  Array<UserProfile | null >,
  nextToken?: string | null,
};

export type ModelPhotoAlbumFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  imageKeys?: ModelStringInput | null,
  and?: Array< ModelPhotoAlbumFilterInput | null > | null,
  or?: Array< ModelPhotoAlbumFilterInput | null > | null,
  not?: ModelPhotoAlbumFilterInput | null,
};

export type ModelPhotoAlbumConnection = {
  __typename: "ModelPhotoAlbumConnection",
  items:  Array<PhotoAlbum | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionSongFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  coverArtKey?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSongFilterInput | null > | null,
  or?: Array< ModelSubscriptionSongFilterInput | null > | null,
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

export type ModelSubscriptionUserProfileFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  imageKeys?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserProfileFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserProfileFilterInput | null > | null,
};

export type ModelSubscriptionPhotoAlbumFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  imageKeys?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPhotoAlbumFilterInput | null > | null,
  or?: Array< ModelSubscriptionPhotoAlbumFilterInput | null > | null,
};

export type CreateSongMutationVariables = {
  input: CreateSongInput,
  condition?: ModelSongConditionInput | null,
};

export type CreateSongMutation = {
  createSong?:  {
    __typename: "Song",
    id: string,
    name: string,
    coverArtKey?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSongMutationVariables = {
  input: UpdateSongInput,
  condition?: ModelSongConditionInput | null,
};

export type UpdateSongMutation = {
  updateSong?:  {
    __typename: "Song",
    id: string,
    name: string,
    coverArtKey?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSongMutationVariables = {
  input: DeleteSongInput,
  condition?: ModelSongConditionInput | null,
};

export type DeleteSongMutation = {
  deleteSong?:  {
    __typename: "Song",
    id: string,
    name: string,
    coverArtKey?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserProfileMutationVariables = {
  input: CreateUserProfileInput,
  condition?: ModelUserProfileConditionInput | null,
};

export type CreateUserProfileMutation = {
  createUserProfile?:  {
    __typename: "UserProfile",
    id: string,
    name: string,
    imageKeys?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserProfileMutationVariables = {
  input: UpdateUserProfileInput,
  condition?: ModelUserProfileConditionInput | null,
};

export type UpdateUserProfileMutation = {
  updateUserProfile?:  {
    __typename: "UserProfile",
    id: string,
    name: string,
    imageKeys?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserProfileMutationVariables = {
  input: DeleteUserProfileInput,
  condition?: ModelUserProfileConditionInput | null,
};

export type DeleteUserProfileMutation = {
  deleteUserProfile?:  {
    __typename: "UserProfile",
    id: string,
    name: string,
    imageKeys?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePhotoAlbumMutationVariables = {
  input: CreatePhotoAlbumInput,
  condition?: ModelPhotoAlbumConditionInput | null,
};

export type CreatePhotoAlbumMutation = {
  createPhotoAlbum?:  {
    __typename: "PhotoAlbum",
    id: string,
    name: string,
    imageKeys?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePhotoAlbumMutationVariables = {
  input: UpdatePhotoAlbumInput,
  condition?: ModelPhotoAlbumConditionInput | null,
};

export type UpdatePhotoAlbumMutation = {
  updatePhotoAlbum?:  {
    __typename: "PhotoAlbum",
    id: string,
    name: string,
    imageKeys?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePhotoAlbumMutationVariables = {
  input: DeletePhotoAlbumInput,
  condition?: ModelPhotoAlbumConditionInput | null,
};

export type DeletePhotoAlbumMutation = {
  deletePhotoAlbum?:  {
    __typename: "PhotoAlbum",
    id: string,
    name: string,
    imageKeys?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetSongQueryVariables = {
  id: string,
};

export type GetSongQuery = {
  getSong?:  {
    __typename: "Song",
    id: string,
    name: string,
    coverArtKey?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSongsQueryVariables = {
  filter?: ModelSongFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSongsQuery = {
  listSongs?:  {
    __typename: "ModelSongConnection",
    items:  Array< {
      __typename: "Song",
      id: string,
      name: string,
      coverArtKey?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserProfileQueryVariables = {
  id: string,
};

export type GetUserProfileQuery = {
  getUserProfile?:  {
    __typename: "UserProfile",
    id: string,
    name: string,
    imageKeys?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUserProfilesQueryVariables = {
  filter?: ModelUserProfileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserProfilesQuery = {
  listUserProfiles?:  {
    __typename: "ModelUserProfileConnection",
    items:  Array< {
      __typename: "UserProfile",
      id: string,
      name: string,
      imageKeys?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPhotoAlbumQueryVariables = {
  id: string,
};

export type GetPhotoAlbumQuery = {
  getPhotoAlbum?:  {
    __typename: "PhotoAlbum",
    id: string,
    name: string,
    imageKeys?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPhotoAlbumsQueryVariables = {
  filter?: ModelPhotoAlbumFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPhotoAlbumsQuery = {
  listPhotoAlbums?:  {
    __typename: "ModelPhotoAlbumConnection",
    items:  Array< {
      __typename: "PhotoAlbum",
      id: string,
      name: string,
      imageKeys?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateSongSubscriptionVariables = {
  filter?: ModelSubscriptionSongFilterInput | null,
};

export type OnCreateSongSubscription = {
  onCreateSong?:  {
    __typename: "Song",
    id: string,
    name: string,
    coverArtKey?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSongSubscriptionVariables = {
  filter?: ModelSubscriptionSongFilterInput | null,
};

export type OnUpdateSongSubscription = {
  onUpdateSong?:  {
    __typename: "Song",
    id: string,
    name: string,
    coverArtKey?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSongSubscriptionVariables = {
  filter?: ModelSubscriptionSongFilterInput | null,
};

export type OnDeleteSongSubscription = {
  onDeleteSong?:  {
    __typename: "Song",
    id: string,
    name: string,
    coverArtKey?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserProfileSubscriptionVariables = {
  filter?: ModelSubscriptionUserProfileFilterInput | null,
};

export type OnCreateUserProfileSubscription = {
  onCreateUserProfile?:  {
    __typename: "UserProfile",
    id: string,
    name: string,
    imageKeys?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserProfileSubscriptionVariables = {
  filter?: ModelSubscriptionUserProfileFilterInput | null,
};

export type OnUpdateUserProfileSubscription = {
  onUpdateUserProfile?:  {
    __typename: "UserProfile",
    id: string,
    name: string,
    imageKeys?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserProfileSubscriptionVariables = {
  filter?: ModelSubscriptionUserProfileFilterInput | null,
};

export type OnDeleteUserProfileSubscription = {
  onDeleteUserProfile?:  {
    __typename: "UserProfile",
    id: string,
    name: string,
    imageKeys?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePhotoAlbumSubscriptionVariables = {
  filter?: ModelSubscriptionPhotoAlbumFilterInput | null,
};

export type OnCreatePhotoAlbumSubscription = {
  onCreatePhotoAlbum?:  {
    __typename: "PhotoAlbum",
    id: string,
    name: string,
    imageKeys?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePhotoAlbumSubscriptionVariables = {
  filter?: ModelSubscriptionPhotoAlbumFilterInput | null,
};

export type OnUpdatePhotoAlbumSubscription = {
  onUpdatePhotoAlbum?:  {
    __typename: "PhotoAlbum",
    id: string,
    name: string,
    imageKeys?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePhotoAlbumSubscriptionVariables = {
  filter?: ModelSubscriptionPhotoAlbumFilterInput | null,
};

export type OnDeletePhotoAlbumSubscription = {
  onDeletePhotoAlbum?:  {
    __typename: "PhotoAlbum",
    id: string,
    name: string,
    imageKeys?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
