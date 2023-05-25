import { useState } from "react";
import { API, Storage } from "aws-amplify";
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
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

function App() {
  const [currentSong, setCurrentSong] = useState<any>();
  const [currentImageUrl, setCurrentImageUrl] = useState<
    string | null | undefined
  >("");

  async function createSong() {
    const songDetails: CreateSongInput = {
      name: "My first song",
    };

    try {
      const response = await API.graphql<GraphQLQuery<CreateSongMutation>>({
        query: mutations.createSong,
        variables: { input: songDetails },
      });
      setCurrentSong(response?.data?.createSong);
    } catch (error) {
      console.error("Error creating song: ", error);
    }
  }

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const file = e.target.files[0];

    try {
      const result = await Storage.put(file.name, file, {
        contentType: "image/png", // contentType is optional
      });

      return result?.key;
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  }

  // Upload image, add to song, retrieve signed URL and retrieve the image.
  // Also updates image if one already exists.
  async function addImageToSong(e: React.ChangeEvent<HTMLInputElement>) {
    if (!currentSong) return;

    // Upload the image to S3:
    const key = await uploadImage(e);

    const songDetails: UpdateSongInput = {
      id: currentSong.id,
      coverArtKey: key,
    };

    // Add the image to the current song:
    try {
      const updatedSong = await API.graphql<GraphQLQuery<UpdateSongMutation>>({
        query: mutations.updateSong,
        variables: { input: songDetails },
      });
      setCurrentSong(updatedSong?.data?.updateSong);

      // Retrieve the image for the current song:
      await getImageForCurrentSong();
    } catch (error) {
      console.error("Error adding image to song: ", error);
    }
  }

  async function getSong() {
    if (!currentSong) return;

    try {
      const oneSong = await API.graphql<GraphQLQuery<GetSongQuery>>({
        query: queries.getSong,
        variables: { id: currentSong.id },
      });

      return oneSong.data?.getSong;
    } catch (error) {
      console.error("Error retrieving song: ", error);
    }
  }

  async function getImageForCurrentSong() {
    // Query the record to get the file key:
    const _song = await getSong();
    // Check that the record has an associated image:
    if (!_song?.coverArtKey) return;
    // Retrieve the signed URL:
    const signedURL = await Storage.get(_song?.coverArtKey);
    setCurrentImageUrl(signedURL);
  }

  // Removes the image from the song, but does not delete from Storage:
  async function removeImageFromSong() {
    if (!currentSong) return;

    const songDetails: UpdateSongInput = {
      id: currentSong.id,
      coverArtKey: null,
    };

    try {
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

  // Removes image from song, then deletes image from storage:
  async function deleteImageForCurrentSong() {
    if (!currentSong) return;

    const _song = await getSong();

    if (!_song?.coverArtKey) return;

    await removeImageFromSong();

    try {
      // Delete the file from S3:
      const deletedImage = await Storage.remove(_song?.coverArtKey);
    } catch (error) {
      console.error("Error deleting image: ", error);
    }
  }

  // Deletes current song. If song has an image, deletes image from Storage:
  async function deleteCurrentSong() {
    if (!currentSong) return;

    const _song = await getSong();

    // Save the file key for deleting the file after the record is deleted:
    const currentSongImageKey = _song?.coverArtKey;

    const songDetails: DeleteSongInput = {
      id: currentSong.id,
    };

    try {
      const deletedSong = await API.graphql<GraphQLQuery<DeleteSongMutation>>({
        query: mutations.deleteSong,
        variables: { input: songDetails },
      });

      setCurrentSong(null);

      if (!currentSongImageKey) return;

      try {
        const deletedImage = await Storage.remove(currentSongImageKey);
        clearLocalState();
      } catch (error) {
        console.error("Error deleting image: ", error);
      }
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
          <button onClick={createSong}>Create Song</button>
          <label>
            Add / Update current song image:
            <input
              id="name"
              type="file"
              onChange={addImageToSong}
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
          <button onClick={deleteCurrentSong} disabled={!currentSong}>
            Delete current song
          </button>
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
