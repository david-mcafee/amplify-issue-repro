import { useEffect, useState } from "react";
import { DataStore, Hub } from "aws-amplify";
import { Reachability } from "@aws-amplify/core";

//@ts-ignore
function DataStoreOperations({ deleteAll }) {
  const [ready, setReady] = useState(false);
  const [networkStatus, setNetworkStatus] = useState(false);

  useEffect(() => {
    const removeListener = Hub.listen(
      "datastore",
      async ({ payload: { event, data } }) => {
        if (event === "ready") {
          console.log("ready");
          setReady(true);
        }
        if (event === "networkStatus") {
          setNetworkStatus(data.active);
        }
      }
    );

    return () => {
      removeListener();
    };
  }, []);

  const goOnline = async () => {
    await Reachability._observerOverride({
      online: true,
    });
  };

  const goOffline = async () => {
    await Reachability._observerOverride({
      online: false,
    });
  };

  return (
    <div style={{ border: "1px dotted white", padding: "25px" }}>
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
        DataStore Ready: {ready ? "yes" : "no"}
        {networkStatus}
      </p>
      <p
        style={{
          display: "flex",
          justifyContent: "center",
          color: "white",
          backgroundColor: networkStatus ? "green" : "red",
          padding: 0,
          margin: 0,
        }}
      >
        {`User has a network connection: ${networkStatus}`}
      </p>
      <p>DataStore Operations:</p>
      <div className="buttons">
        <button
          onClick={async () => {
            await DataStore.start();
            // initSubs();
          }}
        >
          Start
        </button>
        <button onClick={async () => await DataStore.stop()}>Stop</button>
        <button onClick={async () => await DataStore.clear()}>Clear</button>
        <button
          onClick={deleteAll}
          data-test="datastore-delete-all"
          style={{ backgroundColor: "red" }}
        >
          Delete All Records
        </button>
        <button
          onClick={goOnline}
          data-test="datastore-go-online"
          style={{ backgroundColor: "green" }}
        >
          Go Online
        </button>
        <button
          onClick={goOffline}
          data-test="datastore-go-offline"
          style={{ backgroundColor: "red" }}
        >
          Go Offline
        </button>
      </div>
    </div>
  );
}

export default DataStoreOperations;
