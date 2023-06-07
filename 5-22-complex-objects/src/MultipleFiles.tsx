import { useState } from "react";
import { API, Storage } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { GraphQLQuery } from "@aws-amplify/api";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
import {
  CreatePhotoAlbumInput,
  CreatePhotoAlbumMutation,
  DeletePhotoAlbumInput,
  DeletePhotoAlbumMutation,
  GetPhotoAlbumQuery,
  ListPhotoAlbumsQuery,
  UpdatePhotoAlbumInput,
  UpdatePhotoAlbumMutation,
} from "./API";

function App() {
  const [currentPhotoAlbum, setCurrentPhotoAlbum] = useState<any>();

  // Used to display images for current photoAlbum:
  const [currentImages, setCurrentImages] = useState<
    (string | null | undefined)[] | null | undefined
  >([]);

  async function createPhotoAlbumWithFirstImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!e.target.files) return;

    const file = e.target.files[0];

    try {
      const photoAlbumDetails: CreatePhotoAlbumInput = {
        name: `My first photoAlbum`,
      };

      // Create the API record:
      const response = await API.graphql<
        GraphQLQuery<CreatePhotoAlbumMutation>
      >({
        query: mutations.createPhotoAlbum,
        variables: { input: photoAlbumDetails },
      });

      const photoAlbum = response?.data?.createPhotoAlbum;

      if (!photoAlbum) return;

      // Upload the Storage file:
      const result = await Storage.put(`${photoAlbum.id}-${file.name}`, file, {
        contentType: "image/png", // contentType is optional
      });

      const updatePhotoAlbumDetails: UpdatePhotoAlbumInput = {
        id: photoAlbum.id,
        imageKeys: [result?.key],
      };

      // Add the file association to the record:
      const updateResponse = await API.graphql<
        GraphQLQuery<UpdatePhotoAlbumMutation>
      >({
        query: mutations.updatePhotoAlbum,
        variables: { input: updatePhotoAlbumDetails },
      });

      const updatedPhotoAlbum = updateResponse?.data?.updatePhotoAlbum;

      setCurrentPhotoAlbum(updatedPhotoAlbum);

      // Ensure that the record has an associated image:
      if (!updatedPhotoAlbum?.imageKeys?.length) return;

      // Retrieve the file's signed URL:
      const signedURL = await Storage.get(updatedPhotoAlbum.imageKeys[0]!);
      setCurrentImages([signedURL]);
    } catch (error) {
      console.error("Error create photoAlbum / file:", error);
    }
  }

  async function createPhotoAlbumWithMultipleImages(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!e.target.files) return;

    try {
      const photoAlbumDetails: CreatePhotoAlbumInput = {
        name: `My first photoAlbum`,
      };

      // Create the API record:
      const response = await API.graphql<
        GraphQLQuery<CreatePhotoAlbumMutation>
      >({
        query: mutations.createPhotoAlbum,
        variables: { input: photoAlbumDetails },
      });

      const photoAlbum = response?.data?.createPhotoAlbum;

      if (!photoAlbum) return;

      // Upload all files to Storage:
      const imageKeys = await Promise.all(
        Array.from(e.target.files).map(async (file) => {
          const result = await Storage.put(
            `${photoAlbum.id}-${file.name}`,
            file,
            {
              contentType: "image/png", // contentType is optional
            }
          );

          return result?.key;
        })
      );

      const updatePhotoAlbumDetails: UpdatePhotoAlbumInput = {
        id: photoAlbum.id,
        imageKeys: imageKeys,
      };

      // Add the file association to the record:
      const updateResponse = await API.graphql<
        GraphQLQuery<UpdatePhotoAlbumMutation>
      >({
        query: mutations.updatePhotoAlbum,
        variables: { input: updatePhotoAlbumDetails },
      });

      const updatedPhotoAlbum = updateResponse?.data?.updatePhotoAlbum;

      setCurrentPhotoAlbum(updatedPhotoAlbum);

      // Ensure that the record has an associated image:
      if (!updatedPhotoAlbum?.imageKeys?.length) return;

      // Retrieve signed urls for all files:
      const signedUrls = await Promise.all(
        updatedPhotoAlbum.imageKeys.map(async (key) => await Storage.get(key!))
      );

      if (!signedUrls) return;
      setCurrentImages(signedUrls);
    } catch (error) {
      console.error("Error create photoAlbum / file:", error);
    }
  }

  async function addNewImagesToPhotoAlbum(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!currentPhotoAlbum) return;

    if (!e.target.files) return;

    try {
      // Upload all files to Storage:
      const newImageKeys = await Promise.all(
        Array.from(e.target.files).map(async (file) => {
          const result = await Storage.put(
            `${currentPhotoAlbum.id}-${file.name}`,
            file,
            {
              contentType: "image/png", // contentType is optional
            }
          );

          return result?.key;
        })
      );

      // Query existing record to retrieve currently associated files:
      const queriedResponse = await API.graphql<
        GraphQLQuery<GetPhotoAlbumQuery>
      >({
        query: queries.getPhotoAlbum,
        variables: { id: currentPhotoAlbum.id },
      });

      const photoAlbum = queriedResponse.data?.getPhotoAlbum;

      if (!photoAlbum?.imageKeys) return;

      // Merge existing and new file keys:
      const updatedImageKeys = [...newImageKeys, ...photoAlbum.imageKeys];

      const photoAlbumDetails: UpdatePhotoAlbumInput = {
        id: currentPhotoAlbum.id,
        imageKeys: updatedImageKeys,
      };

      // Update record with merged file associations:
      const response = await API.graphql<
        GraphQLQuery<UpdatePhotoAlbumMutation>
      >({
        query: mutations.updatePhotoAlbum,
        variables: { input: photoAlbumDetails },
      });

      const updatedPhotoAlbum = response?.data?.updatePhotoAlbum;
      setCurrentPhotoAlbum(updatedPhotoAlbum);

      // Ensure that the record has an associated image:
      if (!updatedPhotoAlbum?.imageKeys) return;

      // Retrieve signed urls for merged image keys:
      const signedUrls = await Promise.all(
        updatedPhotoAlbum?.imageKeys.map(async (key) => await Storage.get(key!))
      );

      if (!signedUrls) return;

      setCurrentImages(signedUrls);
    } catch (error) {
      console.error(
        "Error uploading image / adding image to photoAlbum: ",
        error
      );
    }
  }

  // Replace last image associated with current photoAlbum:
  async function updateLastImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (!currentPhotoAlbum) return;

    if (!e.target.files) return;

    const file = e.target.files[0];

    try {
      // Upload new file to Storage:
      const result = await Storage.put(
        `${currentPhotoAlbum.id}-${file.name}`,
        file,
        {
          contentType: "image/png", // contentType is optional
        }
      );

      const newFileKey = result?.key;

      // Query existing record to retrieve currently associated files:
      const queriedResponse = await API.graphql<
        GraphQLQuery<GetPhotoAlbumQuery>
      >({
        query: queries.getPhotoAlbum,
        variables: { id: currentPhotoAlbum.id },
      });

      const photoAlbum = queriedResponse.data?.getPhotoAlbum;

      if (!photoAlbum?.imageKeys?.length) return;

      // Retrieve last image key:
      const [lastImageKey] = photoAlbum.imageKeys.slice(-1);

      // Remove last file association by key
      const updatedImageKeys = [
        ...photoAlbum.imageKeys.filter((key) => key !== lastImageKey),
        newFileKey,
      ];

      const photoAlbumDetails: UpdatePhotoAlbumInput = {
        id: currentPhotoAlbum.id,
        // @ts-ignore
        imageKeys: updatedImageKeys,
      };

      // Update record with updated file associations:
      const response = await API.graphql<
        GraphQLQuery<UpdatePhotoAlbumMutation>
      >({
        query: mutations.updatePhotoAlbum,
        variables: { input: photoAlbumDetails },
      });

      const updatedPhotoAlbum = response?.data?.updatePhotoAlbum;
      setCurrentPhotoAlbum(updatedPhotoAlbum);

      // Ensure that the record has an associated image:
      if (!updatedPhotoAlbum?.imageKeys) return;

      // Retrieve signed urls for merged image keys:
      const signedUrls = await Promise.all(
        updatedPhotoAlbum?.imageKeys.map(async (key) => await Storage.get(key!))
      );

      if (!signedUrls) return;

      setCurrentImages(signedUrls);
    } catch (error) {
      console.error(
        "Error uploading image / adding image to photoAlbum: ",
        error
      );
    }
  }

  async function getImagesForPhotoAlbum() {
    try {
      // Query the record to get the file keys:
      const response = await API.graphql<GraphQLQuery<GetPhotoAlbumQuery>>({
        query: queries.getPhotoAlbum,
        variables: { id: currentPhotoAlbum.id },
      });
      const photoAlbum = response.data?.getPhotoAlbum;

      // Ensure that the record has associated images:
      if (!photoAlbum?.imageKeys) return;

      // Retrieve the signed URLs for the associated images:
      const signedUrls = await Promise.all(
        photoAlbum.imageKeys.map(async (imageKey) => {
          if (!imageKey) return;
          return await Storage.get(imageKey);
        })
      );

      setCurrentImages(signedUrls);
    } catch (error) {
      console.error("Error getting photoAlbum / image:", error);
    }
  }

  // Remove the file associations, continue to persist both files and record
  async function removeImagesFromPhotoAlbum() {
    if (!currentPhotoAlbum) return;

    try {
      const response = await API.graphql<GraphQLQuery<GetPhotoAlbumQuery>>({
        query: queries.getPhotoAlbum,
        variables: { id: currentPhotoAlbum.id },
      });

      const photoAlbum = response?.data?.getPhotoAlbum;

      // Ensure that the record has an associated image:
      if (!photoAlbum?.imageKeys) return;

      const photoAlbumDetails: UpdatePhotoAlbumInput = {
        id: photoAlbum.id,
        imageKeys: null,
      };

      const updatedPhotoAlbum = await API.graphql<
        GraphQLQuery<UpdatePhotoAlbumMutation>
      >({
        query: mutations.updatePhotoAlbum,
        variables: { input: photoAlbumDetails },
      });

      // If successful, the response here will be `null`:
      setCurrentPhotoAlbum(updatedPhotoAlbum?.data?.updatePhotoAlbum);
      setCurrentImages(updatedPhotoAlbum?.data?.updatePhotoAlbum?.imageKeys);
    } catch (error) {
      console.error("Error removing image from photoAlbum: ", error);
    }
  }

  // Remove the record association and delete the file
  async function deleteImagesForCurrentPhotoAlbum() {
    if (!currentPhotoAlbum) return;

    try {
      const response = await API.graphql<GraphQLQuery<GetPhotoAlbumQuery>>({
        query: queries.getPhotoAlbum,
        variables: { id: currentPhotoAlbum.id },
      });

      const photoAlbum = response?.data?.getPhotoAlbum;

      // Ensure that the record has an associated images:
      if (!photoAlbum?.imageKeys) return;

      const photoAlbumDetails: UpdatePhotoAlbumInput = {
        id: photoAlbum.id,
        imageKeys: null, // Set the file association to `null`
      };

      // Remove associated files from record
      const updateResponse = await API.graphql<
        GraphQLQuery<UpdatePhotoAlbumMutation>
      >({
        query: mutations.updatePhotoAlbum,
        variables: { input: photoAlbumDetails },
      });

      const updatedPhotoAlbum = updateResponse?.data?.updatePhotoAlbum;

      // Delete the files from S3:
      await Promise.all(
        photoAlbum?.imageKeys.map(async (imageKey) => {
          if (!imageKey) return;
          await Storage.remove(imageKey);
        })
      );

      // If successful, the response here will be `null`:
      setCurrentPhotoAlbum(updatedPhotoAlbum);
      setCurrentImages(null);
    } catch (error) {
      console.error("Error deleting image: ", error);
    }
  }

  // Delete both files and record
  async function deleteCurrentPhotoAlbumAndImages() {
    if (!currentPhotoAlbum) return;

    try {
      const response = await API.graphql<GraphQLQuery<GetPhotoAlbumQuery>>({
        query: queries.getPhotoAlbum,
        variables: { id: currentPhotoAlbum.id },
      });

      const photoAlbum = response?.data?.getPhotoAlbum;

      if (!photoAlbum) return;

      const photoAlbumDetails: DeletePhotoAlbumInput = {
        id: photoAlbum.id,
      };

      await API.graphql<GraphQLQuery<DeletePhotoAlbumMutation>>({
        query: mutations.deletePhotoAlbum,
        variables: { input: photoAlbumDetails },
      });

      setCurrentPhotoAlbum(null);

      // Ensure that the record has an associated image:
      if (!photoAlbum?.imageKeys) return;

      await Promise.all(
        photoAlbum?.imageKeys.map(async (imageKey) => {
          if (!imageKey) return;
          await Storage.remove(imageKey);
        })
      );

      clearLocalState();
    } catch (error) {
      console.error("Error deleting photoAlbum: ", error);
    }
  }

  function clearLocalState() {
    setCurrentPhotoAlbum(null);
    setCurrentImages([]);
  }

  // NOTE: For test / sample cleanup purposes only (not for docs example)
  async function deleteAll() {
    //region: delete photoAlbums:
    const response = await API.graphql<GraphQLQuery<ListPhotoAlbumsQuery>>({
      query: queries.listPhotoAlbums,
    });

    console.log(
      "PhotoAlbums to delete",
      response?.data?.listPhotoAlbums?.items
    );

    await response?.data?.listPhotoAlbums?.items.forEach(async (photoAlbum) => {
      if (!photoAlbum?.id) return;

      const PhotoAlbumDetails: DeletePhotoAlbumInput = {
        id: photoAlbum?.id,
      };

      const deletedPhotoAlbum = await API.graphql<
        GraphQLQuery<DeletePhotoAlbumMutation>
      >({
        query: mutations.deletePhotoAlbum,
        variables: { input: PhotoAlbumDetails },
      });

      console.log("PhotoAlbum deleted: ", deletedPhotoAlbum);
    });
    //endregion

    // Delete all images:
    await Storage.list("", { pageSize: "ALL" })
      .then(({ results }) => {
        console.log("Images to delete:", results);
        results.forEach(async (result) => {
          if (!result?.key) return;
          try {
            const deletedImage = await Storage.remove(result.key);
            console.log("Image deleted:", deletedImage);
          } catch (error) {
            console.log("Error deleting image: ", error);
          }
        });
      })
      .catch((err) => console.log(err));

    //region verify all deletes were successful:
    const secondResponse = await API.graphql<
      GraphQLQuery<ListPhotoAlbumsQuery>
    >({
      query: queries.listPhotoAlbums,
    });
    console.log(
      "PhotoAlbums should be empty:",
      secondResponse?.data?.listPhotoAlbums?.items
    );

    const storageResponse = await Storage.list("", { pageSize: "ALL" });
    console.log("Images should be empty:", storageResponse?.results);

    if (
      secondResponse?.data?.listPhotoAlbums?.items?.length === 0 &&
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
          <h2>{`Current PhotoAlbum: ${currentPhotoAlbum?.id}`}</h2>
          <label>
            Create photoAlbum with one file:
            <input
              type="file"
              accept="image/*"
              onChange={createPhotoAlbumWithFirstImage}
            />
          </label>
          <label>
            Create photoAlbum with multiple files:
            <input
              type="file"
              accept="image/*"
              onChange={createPhotoAlbumWithMultipleImages}
              multiple
            />
          </label>
          <label>
            Add multiple images to current photoAlbum:
            <input
              type="file"
              accept="image/*"
              onChange={addNewImagesToPhotoAlbum}
              disabled={!currentPhotoAlbum}
              multiple
            />
          </label>
          <label>
            Replace last image:
            <input
              type="file"
              accept="image/*"
              onChange={updateLastImage}
              disabled={!currentPhotoAlbum || !currentImages}
            />
          </label>
          <button
            onClick={getImagesForPhotoAlbum}
            disabled={!currentPhotoAlbum || !currentImages}
          >
            Get Images for Current Photo Album
          </button>
          <button
            onClick={removeImagesFromPhotoAlbum}
            disabled={!currentPhotoAlbum || !currentImages}
          >
            Remove images from current PhotoAlbum (does not delete images)
          </button>
          <button
            onClick={deleteImagesForCurrentPhotoAlbum}
            disabled={!currentPhotoAlbum || !currentImages}
          >
            Remove images from current PhotoAlbum, then delete images
          </button>
          <button
            onClick={deleteCurrentPhotoAlbumAndImages}
            disabled={!currentPhotoAlbum}
          >
            Delete current PhotoAlbum (and images, if they exist)
          </button>
          <button onClick={deleteAll}>Delete all</button>
          <button onClick={signOut}>Sign out</button>
          {currentImages &&
            currentImages.map((url, idx) => {
              if (!url) return undefined;
              return <img src={url} key={idx} alt="Storage file"></img>;
            })}
        </main>
      )}
    </Authenticator>
  );
}

export default App;
