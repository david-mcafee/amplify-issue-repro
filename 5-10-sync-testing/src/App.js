import { useEffect, useState } from "react";
import "./App.css";

import DataStoreOperations from "./Components/DataStoreOperations";
import {
  Auth,
  Amplify,
  DataStore,
  Predicates,
  syncExpression,
} from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
// import "@aws-amplify/ui-react/styles.css";
import { Note } from "./models";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

// Amplify.Logger.LOG_LEVEL = "DEBUG";

function App() {
  const [notes, setNotes] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    Auth.currentUserCredentials().then((creds) => {
      console.log(creds.identityId);
      DataStore.configure({
        syncExpressions: [
          syncExpression(Note, () => {
            return (note) => note.userd.eq(creds.identityId);
          }),
        ],
      });
      setUserId(creds.identityId);
    });
  }, []);

  async function onCreate() {
    const result = await DataStore.save(
      new Note({
        userd: userId,
        sequence: Math.floor(Math.random() * 10000),
        noteType: "noteType",
      })
    );
    console.log(result);
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
              <button onClick={onCreate}>Create syncable record</button>
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
