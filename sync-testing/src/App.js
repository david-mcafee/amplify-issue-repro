import { useState } from "react";
import "./App.css";

import DataStoreOperations from "./Components/DataStoreOperations";
import { Amplify, DataStore, Predicates, syncExpression } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
// import "@aws-amplify/ui-react/styles.css";
import { Note } from "./models";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

let syncValue = 2;

DataStore.configure({
  syncExpressions: [
    syncExpression(Note, () => {
      return (note) => note.userd.lt(syncValue);
    }),
  ],
});

// Amplify.Logger.LOG_LEVEL = "DEBUG";

function App() {
  const [notes, setNotes] = useState([]);

  async function onCreate() {
    const result = await DataStore.save(
      new Note({
        userd: "1",
        sequence: Math.floor(Math.random() * 10000),
        noteType: "noteType",
      })
    );
    console.log(result);
  }

  async function createNonSyncRecords() {
    for (let i = 0; i < 5; i++) {
      await DataStore.save(
        new Note({
          userd: "2",
          sequence: Math.floor(Math.random() * 10000),
          noteType: "noteType",
        })
      );
    }
  }

  function deleteAll() {
    DataStore.delete(Note, Predicates.ALL);
  }

  async function getNotes() {
    const _notes = await DataStore.query(Note);
    setNotes(_notes);
    console.log("Notes", _notes);
  }

  function clearLocalState() {
    setNotes([]);
  }

  // Update docs: we should include `clear` here, as well.
  async function changeSyncAll() {
    syncValue = 3;
    await DataStore.clear();
    await DataStore.stop();
    await DataStore.start();
  }

  async function changeSyncLimited() {
    syncValue = 2;
    await DataStore.clear();
    await DataStore.stop();
    await DataStore.start();
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="App">
          <header className="App-header">
            <div>
              <h1>Hello {user.username}</h1>
              <button onClick={signOut}>Sign out</button>
              <h1>Bug bash</h1>
              <DataStoreOperations deleteAll={deleteAll} />
              <hr />
              <h2>Note operations:</h2>
              <button onClick={getNotes}>Query all</button>
              <button onClick={createNonSyncRecords}>
                Create unsyncable records
              </button>
              <button onClick={onCreate}>Create syncable record</button>
              <button onClick={changeSyncAll}>Change Sync All</button>
              <button onClick={changeSyncLimited}>Change Sync Limited</button>
              <button onClick={clearLocalState}>Clear Local State</button>
              <pre>notes: {JSON.stringify(notes, null, 2)}</pre>
            </div>
          </header>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
