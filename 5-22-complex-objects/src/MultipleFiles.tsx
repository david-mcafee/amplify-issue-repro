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

  // Used to display image for current photoAlbum:
  // const [currentImages, setCurrentImages] = useState<
  //   (string | null | undefined)[]
  // >([]);
  const [currentImages, setCurrentImages] = useState<any>([]);

  async function createPhotoAlbumWithFirstImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!e.target.files) return;

    const file = e.target.files[0];

    try {
      const result = await Storage.put(file.name, file, {
        contentType: "image/png", // contentType is optional
      });

      const photoAlbumDetails: CreatePhotoAlbumInput = {
        name: `My first photoAlbum`,
        imageKeys: [result?.key],
      };

      const response = await API.graphql<
        GraphQLQuery<CreatePhotoAlbumMutation>
      >({
        query: mutations.createPhotoAlbum,
        variables: { input: photoAlbumDetails },
      });

      const _photoAlbum = response?.data?.createPhotoAlbum;
      setCurrentPhotoAlbum(_photoAlbum);

      // @ts-ignore
      const signedURL = await Storage.get(_photoAlbum?.imageKeys[0]);
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
      // Upload all files to Storage:
      const imageKeys = await Promise.all(
        Array.from(e.target.files).map(async (file) => {
          const result = await Storage.put(file.name, file, {
            contentType: "image/png", // contentType is optional
          });

          return result?.key;
        })
      );

      const photoAlbumDetails: CreatePhotoAlbumInput = {
        name: `My first photoAlbum`,
        imageKeys,
      };

      // Create album with associated files:
      const response = await API.graphql<
        GraphQLQuery<CreatePhotoAlbumMutation>
      >({
        query: mutations.createPhotoAlbum,
        variables: { input: photoAlbumDetails },
      });

      const _photoAlbum = response?.data?.createPhotoAlbum;
      setCurrentPhotoAlbum(_photoAlbum);

      if (!_photoAlbum?.imageKeys) return;

      // Retrieve signed urls for all files:
      // @ts-ignore
      const signedUrls = await Promise.all(
        _photoAlbum?.imageKeys.map(async (key) => await Storage.get(key!))
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

    const file = e.target.files[0];

    try {
      // Upload all files to Storage:
      const newImageKeys = await Promise.all(
        Array.from(e.target.files).map(async (file) => {
          const result = await Storage.put(file.name, file, {
            contentType: "image/png", // contentType is optional
          });

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

      const _photoAlbum = queriedResponse.data?.getPhotoAlbum;

      if (!_photoAlbum?.imageKeys) return;

      // Merge existing and new file keys:
      const updatedImageKeys = [...newImageKeys, ..._photoAlbum.imageKeys];

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

      // Check that the record has an associated image:
      if (!updatedPhotoAlbum?.imageKeys) return;

      // Retrieve signed urls for merged image keys:
      // @ts-ignore
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
      const _photoAlbum = response.data?.getPhotoAlbum;

      // Check that the record has associated images:
      if (!_photoAlbum?.imageKeys) return;

      // Retrieve the signed URLs for the associated images:
      const signedUrls = await Promise.all(
        _photoAlbum.imageKeys.map(async (imageKey) => {
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

      const _photoAlbum = response?.data?.getPhotoAlbum;

      // Check that the record has an associated image:
      if (!_photoAlbum?.imageKeys) return;

      const photoAlbumDetails: UpdatePhotoAlbumInput = {
        id: _photoAlbum.id,
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

      const _photoAlbum = response?.data?.getPhotoAlbum;

      // Check that the record has an associated image:
      if (!_photoAlbum?.imageKeys) return;

      const photoAlbumDetails: UpdatePhotoAlbumInput = {
        id: _photoAlbum.id,
        imageKeys: null, // Set the file association to `null`
      };

      // Remove associated file from record
      const updatedPhotoAlbum = await API.graphql<
        GraphQLQuery<UpdatePhotoAlbumMutation>
      >({
        query: mutations.updatePhotoAlbum,
        variables: { input: photoAlbumDetails },
      });

      // Delete the file from S3:
      await Storage.remove(_photoAlbum?.imageKeys);

      // If successful, the response here will be `null`:
      setCurrentPhotoAlbum(updatedPhotoAlbum?.data?.updatePhotoAlbum);
      setCurrentImages(updatedPhotoAlbum?.data?.updatePhotoAlbum?.imageKeys);
    } catch (error) {
      console.error("Error deleting image: ", error);
    }
  }

  // Delete both file and record
  async function deleteCurrentPhotoAlbumAndImages() {
    if (!currentPhotoAlbum) return;

    try {
      const response = await API.graphql<GraphQLQuery<GetPhotoAlbumQuery>>({
        query: queries.getPhotoAlbum,
        variables: { id: currentPhotoAlbum.id },
      });

      const _photoAlbum = response?.data?.getPhotoAlbum;

      // Check that the record has an associated image:
      if (!_photoAlbum?.imageKeys) return;

      await Storage.remove(_photoAlbum?.imageKeys);

      const photoAlbumDetails: DeletePhotoAlbumInput = {
        id: _photoAlbum.id,
      };

      // const deletedPhotoAlbum = await API.graphql<GraphQLQuery<DeletePhotoAlbumMutation>>({
      await API.graphql<GraphQLQuery<DeletePhotoAlbumMutation>>({
        query: mutations.deletePhotoAlbum,
        variables: { input: photoAlbumDetails },
      });

      clearLocalState();
    } catch (error) {
      console.error("Error deleting photoAlbum: ", error);
    }
  }

  function clearLocalState() {
    setCurrentPhotoAlbum(null);
    setCurrentImages("");
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

      const todoDetails: DeletePhotoAlbumInput = {
        id: photoAlbum?.id,
      };

      const deletedTodo = await API.graphql<
        GraphQLQuery<DeletePhotoAlbumMutation>
      >({
        query: mutations.deletePhotoAlbum,
        variables: { input: todoDetails },
      });

      console.log("PhotoAlbum deleted: ", deletedTodo);
    });
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
              id="name"
              type="file"
              accept="image/*"
              onChange={createPhotoAlbumWithFirstImage}
            />
          </label>
          <label>
            Create photoAlbum with multiple files:
            <input
              id="name"
              type="file"
              accept="image/*"
              onChange={createPhotoAlbumWithMultipleImages}
              multiple
            />
          </label>
          <label>
            Add multiple images to current photoAlbum:
            <input
              id="name"
              type="file"
              accept="image/*"
              onChange={addNewImagesToPhotoAlbum}
              multiple
            />
          </label>
          <button onClick={getImagesForPhotoAlbum}>
            Get Images for Current Photo Album
          </button>
          <button onClick={removeImagesFromPhotoAlbum}>
            Remove Images for Current Photo Album (does not delete images)
          </button>
          <button onClick={deleteAll}>Delete all</button>
          <button onClick={signOut}>Sign out</button>
          {}
          {currentImages &&
            currentImages.map((url: string) => (
              <img src={url} alt="Image for current photoAlbum"></img>
            ))}
        </main>
      )}
    </Authenticator>
  );
}

export default App;
