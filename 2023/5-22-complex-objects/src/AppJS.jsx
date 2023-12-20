import { useState } from "react";
import { API, Storage } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";

function App() {
  const [currentSong, setCurrentSong] = useState();

  // Used to display image for current song:
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  // Private access level configuration on the Storage object:
  Storage.configure({ level: "private" });

  async function createSongWithImage(e) {
    if (!e.target.files) return;

    const file = e.target.files[0];

    try {
      const createSongDetails = {
        name: `My first song`,
      };

      // Create the API record:
      const response = await API.graphql({
        query: mutations.createSong,
        variables: { input: createSongDetails },
      });

      const song = response?.data?.createSong;

      if (!song) return;

      // Upload the Storage file:
      const result = await Storage.put(`${song.id}-${file.name}`, file, {
        contentType: "image/png", // contentType is optional
      });

      const updateSongDetails = {
        id: song.id,
        coverArtKey: result?.key,
      };

      // Add the file association to the record:
      const updateResponse = await API.graphql({
        query: mutations.updateSong,
        variables: { input: updateSongDetails },
      });

      const updatedSong = updateResponse?.data?.updateSong;

      setCurrentSong(updatedSong);

      // Ensure that the record has an associated image:
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
  async function addNewImageToSong(e) {
    if (!currentSong) return;

    if (!e.target.files) return;

    const file = e.target.files[0];

    try {
      // Upload the Storage file:
      const result = await Storage.put(`${currentSong.id}-${file.name}`, file, {
        contentType: "image/png", // contentType is optional
      });

      const updateSongDetails = {
        id: currentSong.id,
        coverArtKey: result?.key,
      };

      // Add the file association to the record:
      const response = await API.graphql({
        query: mutations.updateSong,
        variables: { input: updateSongDetails },
      });

      const updatedSong = response?.data?.updateSong;

      setCurrentSong(updatedSong);

      // Ensure that the record has an associated image:
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
      const response = await API.graphql({
        query: queries.getSong,
        variables: { id: currentSong.id },
      });
      const song = response.data?.getSong;

      // Ensure that the record has an associated image:
      if (!song?.coverArtKey) return;

      // Retrieve the signed URL:
      const signedURL = await Storage.get(song?.coverArtKey);

      setCurrentImageUrl(signedURL);
    } catch (error) {
      console.error("Error getting song / image:", error);
    }
  }

  // Remove the file association, continue to persist both file and record
  async function removeImageFromSong() {
    if (!currentSong) return;

    try {
      const response = await API.graphql({
        query: queries.getSong,
        variables: { id: currentSong.id },
      });

      const song = response?.data?.getSong;

      // Ensure that the record has an associated image:
      if (!song?.coverArtKey) return;

      const songDetails = {
        id: song.id,
        coverArtKey: null,
      };

      const updatedSong = await API.graphql({
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
      const response = await API.graphql({
        query: queries.getSong,
        variables: { id: currentSong.id },
      });

      const song = response?.data?.getSong;

      // Ensure that the record has an associated image:
      if (!song?.coverArtKey) return;

      const songDetails = {
        id: song.id,
        coverArtKey: null, // Set the file association to `null`
      };

      // Remove associated file from record
      const updatedSong = await API.graphql({
        query: mutations.updateSong,
        variables: { input: songDetails },
      });

      // Delete the file from S3:
      await Storage.remove(song?.coverArtKey);

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
      const response = await API.graphql({
        query: queries.getSong,
        variables: { id: currentSong.id },
      });

      const song = response?.data?.getSong;

      // Ensure that the record has an associated image:
      if (!song?.coverArtKey) return;

      await Storage.remove(song?.coverArtKey);

      const songDetails = {
        id: song.id,
      };

      await API.graphql({
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
          <button onClick={signOut}>Sign out</button>
          {currentImageUrl && (
            <img src={currentImageUrl} alt="Storage file"></img>
          )}
        </main>
      )}
    </Authenticator>
  );
}

export default App;
