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
  console.log("Songs should be empty:", secondResponse?.data?.listSongs?.items);

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
