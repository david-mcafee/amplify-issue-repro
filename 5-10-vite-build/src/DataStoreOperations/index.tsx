import { useEffect, useState } from "react";
import { DataStore, Hub } from "aws-amplify";

//@ts-ignore
function DataStoreOperations({ initSubs, deleteAll }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const removeListener = Hub.listen(
      "datastore",
      async ({ payload: { event, data } }) => {
        if (event === "ready") {
          setReady(true);
        }
      }
    );
    return () => {
      removeListener();
    };
  }, []);

  return (
    <div>
      <p
        data-test="datastore-ready"
        style={{
          display: "flex",
          justifyContent: "center",
          color: "white",
          backgroundColor: ready ? "green" : "red",
          padding: 0,
          margin: 0,
        }}
      >
        DataStore Ready: {ready ? "Yes" : "No"}
      </p>
      <p>DS</p>
      <div className="buttons">
        <button
          data-test="datastore-start"
          onClick={async () => {
            await DataStore.start();
            initSubs();
          }}
        >
          Start
        </button>
        <button onClick={async () => await DataStore.stop()}>Stop</button>
        <button
          data-test="datastore-clear"
          onClick={async () => await DataStore.clear()}
        >
          Clear
        </button>
        <button
          onClick={deleteAll}
          data-test="datastore-delete-all"
          style={{ backgroundColor: "red" }}
        >
          Delete All Records
        </button>
      </div>
    </div>
  );
}

export default DataStoreOperations;
