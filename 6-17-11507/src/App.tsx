import { useState } from "react";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import DataStoreOperations from "./Components/DataStoreOperations";
import { Upload } from "./models";

function App() {
  const [upload, setUpload] = useState<Upload | null>(null);

  function clearLocalState() {
    setUpload(null);
  }

  async function deleteAll() {
    await DataStore.delete(Upload, Predicates.ALL);
    clearLocalState();
  }

  // TODO: need customer implementation:
  async function saveModelAPI(model: Upload) {
    try {
      const savedModel = await DataStore.save(model);
      console.log("savedModel: ", savedModel);
      setUpload(savedModel);
      return savedModel;
    } catch (error) {
      console.error("saveModelAPI error: ", error);
    }
  }

  async function createUpload({
    name,
    status,
    type,
    uploadCount,
    userID,
  }: {
    name: string;
    status: number;
    type: number[];
    uploadCount: number;
    userID: string;
  }) {
    try {
      const newUpload = new Upload({
        datetime: new Date().toISOString(),
        name: name,
        status: status,
        type: type,
        uploadCount: uploadCount,
        processCount: 0,
        userID: userID,
      });

      console.log("newUpload: ", newUpload);
      return await saveModelAPI(newUpload);
    } catch (error) {
      throw error as Error;
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <DataStoreOperations deleteAll={deleteAll} />
        <button
          onClick={() =>
            createUpload({
              name: `Upload ${new Date().toISOString()}`,
              status: 1,
              type: [1, 2],
              uploadCount: 1,
              userID: `${Date.now()}`,
            })
          }
        >
          Create Upload
        </button>
        <pre>Current Upload: {JSON.stringify(upload, null, 2)}</pre>
      </header>
    </div>
  );
}

export default App;
