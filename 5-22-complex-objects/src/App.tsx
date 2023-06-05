import { useState } from "react";
import { API, Storage } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { GraphQLQuery } from "@aws-amplify/api";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
import {
  CreateSongInput,
  CreateSongMutation,
  DeleteSongInput,
  DeleteSongMutation,
  GetSongQuery,
  ListSongsQuery,
  UpdateSongInput,
  UpdateSongMutation,
} from "./API";

function App() {
  const [currentSong, setCurrentSong] = useState<any>();

  // Used to display image for current song:
  const [currentImageUrl, setCurrentImageUrl] = useState<
    string | null | undefined
  >("");

  async function createSongWithImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const file = e.target.files[0];

    try {
      const createSongDetails: CreateSongInput = {
        name: `My first song`,
      };

      // Create the API record:
      const response = await API.graphql<GraphQLQuery<CreateSongMutation>>({
        query: mutations.createSong,
        variables: { input: createSongDetails },
      });

      const _song = response?.data?.createSong;

      if (!_song) return;

      // Upload the Storage file:
      const result = await Storage.put(`${_song.id}-${file.name}`, file, {
        contentType: "image/png", // contentType is optional
      });

      const updateSongDetails: UpdateSongInput = {
        id: _song.id,
        coverArtKey: result?.key,
      };

      // Add the file association to the record:
      const updateResponse = await API.graphql<
        GraphQLQuery<UpdateSongMutation>
      >({
        query: mutations.updateSong,
        variables: { input: updateSongDetails },
      });

      const updatedSong = updateResponse?.data?.updateSong;

      setCurrentSong(updatedSong);

      // Check that the record has an associated image:
      if (!updatedSong?.coverArtKey) return;

      // Retrieve the file's signed URL:
      const signedURL = await Storage.get(updatedSong?.coverArtKey);
      setCurrentImageUrl(signedURL);
    } catch (error) {
      console.error("Error create song / file:", error);
    }
  }

  // Upload image, add to song, retrieve signed URL and retrieve the image.
  // Also updates image if one already exists.
  async function addNewImageToSong(e: React.ChangeEvent<HTMLInputElement>) {
    if (!currentSong) return;

    if (!e.target.files) return;

    const file = e.target.files[0];

    try {
      // Upload the Storage file:
      const result = await Storage.put(`${currentSong.id}-${file.name}`, file, {
        contentType: "image/png", // contentType is optional
      });

      const updateSongDetails: UpdateSongInput = {
        id: currentSong.id,
        coverArtKey: result?.key,
      };

      // Add the file association to the record:
      const response = await API.graphql<GraphQLQuery<UpdateSongMutation>>({
        query: mutations.updateSong,
        variables: { input: updateSongDetails },
      });

      const updatedSong = response?.data?.updateSong;

      setCurrentSong(updatedSong);

      // Check that the record has an associated image:
      if (!updatedSong?.coverArtKey) return;

      // Retrieve the file's signed URL:
      const signedURL = await Storage.get(updatedSong?.coverArtKey);
      setCurrentImageUrl(signedURL);
    } catch (error) {
      console.error("Error uploading image / adding image to song: ", error);
    }
  }

  async function getImageForCurrentSong() {
    try {
      // Query the record to get the file key:
      const response = await API.graphql<GraphQLQuery<GetSongQuery>>({
        query: queries.getSong,
        variables: { id: currentSong.id },
      });
      const _song = response.data?.getSong;

      // Check that the record has an associated image:
      if (!_song?.coverArtKey) return;

      // Retrieve the signed URL:
      const signedURL = await Storage.get(_song?.coverArtKey);

      setCurrentImageUrl(signedURL);
    } catch (error) {
      console.error("Error getting song / image:", error);
    }
  }

  // Remove the file association, continue to persist both file and record
  async function removeImageFromSong() {
    if (!currentSong) return;

    try {
      const response = await API.graphql<GraphQLQuery<GetSongQuery>>({
        query: queries.getSong,
        variables: { id: currentSong.id },
      });

      const _song = response?.data?.getSong;

      // Check that the record has an associated image:
      if (!_song?.coverArtKey) return;

      const songDetails: UpdateSongInput = {
        id: _song.id,
        coverArtKey: null,
      };

      const updatedSong = await API.graphql<GraphQLQuery<UpdateSongMutation>>({
        query: mutations.updateSong,
        variables: { input: songDetails },
      });

      // If successful, the response here will be `null`:
      setCurrentSong(updatedSong?.data?.updateSong);
      setCurrentImageUrl(updatedSong?.data?.updateSong?.coverArtKey);
    } catch (error) {
      console.error("Error removing image from song: ", error);
    }
  }

  // Remove the record association and delete the file
  async function deleteImageForCurrentSong() {
    if (!currentSong) return;

    try {
      const response = await API.graphql<GraphQLQuery<GetSongQuery>>({
        query: queries.getSong,
        variables: { id: currentSong.id },
      });

      const _song = response?.data?.getSong;

      // Check that the record has an associated image:
      if (!_song?.coverArtKey) return;

      const songDetails: UpdateSongInput = {
        id: _song.id,
        coverArtKey: null, // Set the file association to `null`
      };

      // Remove associated file from record
      const updatedSong = await API.graphql<GraphQLQuery<UpdateSongMutation>>({
        query: mutations.updateSong,
        variables: { input: songDetails },
      });

      // Delete the file from S3:
      await Storage.remove(_song?.coverArtKey);

      // If successful, the response here will be `null`:
      setCurrentSong(updatedSong?.data?.updateSong);
      setCurrentImageUrl(updatedSong?.data?.updateSong?.coverArtKey);
    } catch (error) {
      console.error("Error deleting image: ", error);
    }
  }

  // Delete both file and record
  async function deleteCurrentSongAndImage() {
    if (!currentSong) return;

    try {
      const response = await API.graphql<GraphQLQuery<GetSongQuery>>({
        query: queries.getSong,
        variables: { id: currentSong.id },
      });

      const _song = response?.data?.getSong;

      // Check that the record has an associated image:
      if (!_song?.coverArtKey) return;

      await Storage.remove(_song?.coverArtKey);

      const songDetails: DeleteSongInput = {
        id: _song.id,
      };

      // const deletedSong = await API.graphql<GraphQLQuery<DeleteSongMutation>>({
      await API.graphql<GraphQLQuery<DeleteSongMutation>>({
        query: mutations.deleteSong,
        variables: { input: songDetails },
      });

      clearLocalState();
    } catch (error) {
      console.error("Error deleting song: ", error);
    }
  }

  function clearLocalState() {
    setCurrentSong(null);
    setCurrentImageUrl("");
  }

  // NOTE: For test / sample cleanup purposes only (not for docs example)
  async function deleteAll() {
    //region: delete songs:
    const response = await API.graphql<GraphQLQuery<ListSongsQuery>>({
      query: queries.listSongs,
    });

    console.log("Songs to delete", response?.data?.listSongs?.items);

    await response?.data?.listSongs?.items.forEach(async (song) => {
      if (!song?.id) return;

      const todoDetails: DeleteSongInput = {
        id: song?.id,
      };

      const deletedTodo = await API.graphql<GraphQLQuery<DeleteSongMutation>>({
        query: mutations.deleteSong,
        variables: { input: todoDetails },
      });

      console.log("Song deleted: ", deletedTodo);
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
    const secondResponse = await API.graphql<GraphQLQuery<ListSongsQuery>>({
      query: queries.listSongs,
    });
    console.log(
      "Songs should be empty:",
      secondResponse?.data?.listSongs?.items
    );

    const storageResponse = await Storage.list("", { pageSize: "ALL" });
    console.log("Images should be empty:", storageResponse?.results);

    if (
      secondResponse?.data?.listSongs?.items?.length === 0 &&
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
          <h2>{`Current Song: ${currentSong?.id}`}</h2>
          <label>
            Create song with file:
            <input id="name" type="file" onChange={createSongWithImage} />
          </label>
          <label>
            Add / update song image:
            <input
              id="name"
              type="file"
              onChange={addNewImageToSong}
              disabled={!currentSong}
            />
          </label>
          <button
            onClick={getImageForCurrentSong}
            disabled={!currentSong || !currentImageUrl}
          >
            Get image for current song
          </button>
          <button
            onClick={removeImageFromSong}
            disabled={!currentSong || !currentImageUrl}
          >
            Remove image from current song (does not delete image)
          </button>
          <button
            onClick={deleteImageForCurrentSong}
            disabled={!currentSong || !currentImageUrl}
          >
            Remove image from current song, then delete image
          </button>
          <button onClick={deleteCurrentSongAndImage} disabled={!currentSong}>
            Delete current song (and image, if it exists)
          </button>
          <button onClick={deleteAll}>Delete All</button>
          <button onClick={signOut}>Sign out</button>
          {currentImageUrl && (
            <img src={currentImageUrl} alt="Image for current song"></img>
          )}
        </main>
      )}
    </Authenticator>
  );
}

export default App;
