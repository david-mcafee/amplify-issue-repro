import { useState } from "react";
import { API, Storage } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { GraphQLQuery } from "@aws-amplify/api";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
import {
  CreateUserProfileInput,
  CreateUserProfileMutation,
  DeleteUserProfileInput,
  DeleteUserProfileMutation,
  GetUserProfileQuery,
  ListUserProfilesQuery,
  UpdateUserProfileInput,
  UpdateUserProfileMutation,
} from "./API";

function App() {
  const [currentUserProfile, setCurrentUserProfile] = useState<any>();

  // Used to display image for current userProfile:
  const [currentImageUrl, setCurrentImageUrl] = useState<
    string | null | undefined
  >("");

  async function createUserProfileWithFirstImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!e.target.files) return;

    const file = e.target.files[0];

    try {
      const result = await Storage.put(file.name, file, {
        contentType: "image/png", // contentType is optional
      });

      const userProfileDetails: CreateUserProfileInput = {
        name: `My first userProfile`,
        coverArtKey: result?.key,
      };

      const response = await API.graphql<
        GraphQLQuery<CreateUserProfileMutation>
      >({
        query: mutations.createUserProfile,
        variables: { input: userProfileDetails },
      });

      const _userProfile = response?.data?.createUserProfile;
      setCurrentUserProfile(_userProfile);

      if (!_userProfile?.coverArtKey) return;
      const signedURL = await Storage.get(_userProfile?.coverArtKey);
      setCurrentImageUrl(signedURL);
    } catch (error) {
      console.error("Error create userProfile / file:", error);
    }
  }

  // async function createUserProfileWithMultipleImages(
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) {
  //   if (!e.target.files) return;

  //   // Is this this correct?
  //   debugger;
  //   const files = e.target.files;

  //   try {
  //     files.forEach(file: any => {

  //     })
  //     const result = await Storage.put(file.name, file, {
  //       contentType: "image/png", // contentType is optional
  //     });

  //     const userProfileDetails: CreateUserProfileInput = {
  //       name: `My first userProfile`,
  //       coverArtKey: result?.key,
  //     };

  //     const response = await API.graphql<
  //       GraphQLQuery<CreateUserProfileMutation>
  //     >({
  //       query: mutations.createUserProfile,
  //       variables: { input: userProfileDetails },
  //     });

  //     const _userProfile = response?.data?.createUserProfile;
  //     setCurrentUserProfile(_userProfile);

  //     if (!_userProfile?.coverArtKey) return;
  //     const signedURL = await Storage.get(_userProfile?.coverArtKey);
  //     setCurrentImageUrl(signedURL);
  //   } catch (error) {
  //     console.error("Error create userProfile / file:", error);
  //   }
  // }

  // Upload image, add to userProfile, retrieve signed URL and retrieve the image.
  // Also updates image if one already exists.
  async function addNewImageToUserProfile(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!currentUserProfile) return;

    if (!e.target.files) return;

    const file = e.target.files[0];

    try {
      const result = await Storage.put(file.name, file, {
        contentType: "image/png", // contentType is optional
      });

      const userProfileDetails: UpdateUserProfileInput = {
        id: currentUserProfile.id,
        coverArtKey: result?.key,
      };

      const response = await API.graphql<
        GraphQLQuery<UpdateUserProfileMutation>
      >({
        query: mutations.updateUserProfile,
        variables: { input: userProfileDetails },
      });

      const updatedUserProfile = response?.data?.updateUserProfile;

      // Check that the record has an associated image:
      if (!updatedUserProfile?.coverArtKey) return;

      const signedURL = await Storage.get(updatedUserProfile?.coverArtKey);
      setCurrentImageUrl(signedURL);
    } catch (error) {
      console.error(
        "Error uploading image / adding image to userProfile: ",
        error
      );
    }
  }

  async function getImageForCurrentUserProfile() {
    try {
      // Query the record to get the file key:
      const response = await API.graphql<GraphQLQuery<GetUserProfileQuery>>({
        query: queries.getUserProfile,
        variables: { id: currentUserProfile.id },
      });
      const _userProfile = response.data?.getUserProfile;

      // Check that the record has an associated image:
      if (!_userProfile?.coverArtKey) return;

      // Retrieve the signed URL:
      const signedURL = await Storage.get(_userProfile?.coverArtKey);

      setCurrentImageUrl(signedURL);
    } catch (error) {
      console.error("Error getting userProfile / image:", error);
    }
  }

  // Remove the file association, continue to persist both file and record
  async function removeImageFromUserProfile() {
    if (!currentUserProfile) return;

    try {
      const response = await API.graphql<GraphQLQuery<GetUserProfileQuery>>({
        query: queries.getUserProfile,
        variables: { id: currentUserProfile.id },
      });

      const _userProfile = response?.data?.getUserProfile;

      if (!_userProfile?.coverArtKey) return;

      const userProfileDetails: UpdateUserProfileInput = {
        id: _userProfile.id,
        coverArtKey: null,
      };

      const updatedUserProfile = await API.graphql<
        GraphQLQuery<UpdateUserProfileMutation>
      >({
        query: mutations.updateUserProfile,
        variables: { input: userProfileDetails },
      });

      // If successful, the response here will be `null`:
      setCurrentUserProfile(updatedUserProfile?.data?.updateUserProfile);
      setCurrentImageUrl(
        updatedUserProfile?.data?.updateUserProfile?.coverArtKey
      );
    } catch (error) {
      console.error("Error removing image from userProfile: ", error);
    }
  }

  // Remove the record association and delete the file
  async function deleteImageForCurrentUserProfile() {
    if (!currentUserProfile) return;

    try {
      const response = await API.graphql<GraphQLQuery<GetUserProfileQuery>>({
        query: queries.getUserProfile,
        variables: { id: currentUserProfile.id },
      });

      const _userProfile = response?.data?.getUserProfile;

      if (!_userProfile?.coverArtKey) return;

      const userProfileDetails: UpdateUserProfileInput = {
        id: _userProfile.id,
        coverArtKey: null, // Set the file association to `null`
      };

      // Remove associated file from record
      const updatedUserProfile = await API.graphql<
        GraphQLQuery<UpdateUserProfileMutation>
      >({
        query: mutations.updateUserProfile,
        variables: { input: userProfileDetails },
      });

      // Delete the file from S3:
      await Storage.remove(_userProfile?.coverArtKey);

      // If successful, the response here will be `null`:
      setCurrentUserProfile(updatedUserProfile?.data?.updateUserProfile);
      setCurrentImageUrl(
        updatedUserProfile?.data?.updateUserProfile?.coverArtKey
      );
    } catch (error) {
      console.error("Error deleting image: ", error);
    }
  }

  // Delete both file and record
  async function deleteCurrentUserProfileAndImage() {
    if (!currentUserProfile) return;

    try {
      const response = await API.graphql<GraphQLQuery<GetUserProfileQuery>>({
        query: queries.getUserProfile,
        variables: { id: currentUserProfile.id },
      });

      const _userProfile = response?.data?.getUserProfile;

      if (!_userProfile?.coverArtKey) return;

      await Storage.remove(_userProfile?.coverArtKey);

      const userProfileDetails: DeleteUserProfileInput = {
        id: _userProfile.id,
      };

      await API.graphql<GraphQLQuery<DeleteUserProfileMutation>>({
        query: mutations.deleteUserProfile,
        variables: { input: userProfileDetails },
      });

      clearLocalState();
    } catch (error) {
      console.error("Error deleting userProfile: ", error);
    }
  }

  function clearLocalState() {
    setCurrentUserProfile(null);
    setCurrentImageUrl("");
  }

  // NOTE: For test / sample cleanup purposes only (not for docs example)
  async function deleteAll() {
    //region: delete userProfiles:
    const response = await API.graphql<GraphQLQuery<ListUserProfilesQuery>>({
      query: queries.listUserProfiles,
    });

    console.log(
      "UserProfiles to delete",
      response?.data?.listUserProfiles?.items
    );

    await response?.data?.listUserProfiles?.items.forEach(
      async (userProfile) => {
        if (!userProfile?.id) return;

        const todoDetails: DeleteUserProfileInput = {
          id: userProfile?.id,
        };

        const deletedTodo = await API.graphql<
          GraphQLQuery<DeleteUserProfileMutation>
        >({
          query: mutations.deleteUserProfile,
          variables: { input: todoDetails },
        });

        console.log("UserProfile deleted: ", deletedTodo);
      }
    );
    //endregion

    // Delete all images:
    await Storage.list("", { pageSize: "ALL" })
      .then(({ results }) => {
        results.forEach(async (result) => {
          if (!result?.key) return;
          try {
            const deletedImage = await Storage.remove(result?.key);
            console.log("Image deleted:", deletedImage);
          } catch (error) {
            console.log("Error deleting image: ", error);
          }
        });
      })
      .catch((err) => console.log(err));

    //region verify all deletes were successful:
    const secondResponse = await API.graphql<
      GraphQLQuery<ListUserProfilesQuery>
    >({
      query: queries.listUserProfiles,
    });
    console.log(
      "UserProfiles should be empty:",
      secondResponse?.data?.listUserProfiles?.items
    );

    const storageResponse = await Storage.list("", { pageSize: "ALL" });
    console.log("Images should be empty:", storageResponse?.results);

    if (
      secondResponse?.data?.listUserProfiles?.items?.length === 0 &&
      storageResponse?.results?.length === 0
    ) {
      console.log("All deletes successful!");
      clearLocalState();
    }
    //endregion
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1>Hello {user?.username}!</h1>
          <h2>{`Current UserProfile: ${currentUserProfile?.id}`}</h2>
          <label>
            Create userProfile with one file:
            <input
              id="name"
              type="file"
              accept="image/*"
              onChange={createUserProfileWithFirstImage}
            />
          </label>
          <label>
            Create userProfile with multiple files:
            <input
              id="name"
              type="file"
              accept="image/*"
              onChange={createUserProfileWithMultipleImages}
            />
          </label>
          <label>
            Add / update userProfile image:
            <input
              id="name"
              type="file"
              accept="image/*"
              onChange={addNewImageToUserProfile}
              disabled={!currentUserProfile}
              multiple
            />
          </label>
          <button
            onClick={getImageForCurrentUserProfile}
            disabled={!currentUserProfile || !currentImageUrl}
          >
            Get image for current userProfile
          </button>
          <button
            onClick={removeImageFromUserProfile}
            disabled={!currentUserProfile || !currentImageUrl}
          >
            Remove image from current userProfile (does not delete image)
          </button>
          <button
            onClick={deleteImageForCurrentUserProfile}
            disabled={!currentUserProfile || !currentImageUrl}
          >
            Remove image from current userProfile, then delete image
          </button>
          <button
            onClick={deleteCurrentUserProfileAndImage}
            disabled={!currentUserProfile}
          >
            Delete current userProfile (and image, if it exists)
          </button>
          <button onClick={deleteAll}>Delete all</button>
          <button onClick={signOut}>Sign out</button>
          {currentImageUrl && (
            <img
              src={currentImageUrl}
              alt="Image for current userProfile"
            ></img>
          )}
        </main>
      )}
    </Authenticator>
  );
}

export default App;
