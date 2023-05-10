import { useEffect, useState } from "react";
import "./App.css";

import { Amplify, DataStore, Predicates, syncExpression } from "aws-amplify";
import { Note } from "./models";

import awsconfig from "./aws-exports";
import DataStoreOperations from "./Components/DataStoreOperations";
Amplify.configure(awsconfig);

DataStore.configure({
  syncExpressions: [
    syncExpression(Note, () => {
      return (note) => note.userd.eq(1);
    }),
  ],
});

// Amplify.Logger.LOG_LEVEL = "DEBUG";

function App() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState();

  async function onCreate() {
    const result = await DataStore.save(
      new Note({
        userd: "1",
        sequence: $Date.now(),
        noteType: "noteType",
      })
    );
    //@ts-ignore
    setCurrentNote(result);
  }

  async function createNonSyncRecords() {
    for (let i = 0; i < 5; i++) {
      await DataStore.save(
        new Note({
          userd: "2",
          sequence: $Date.now(),
          noteType: "noteType",
        })
      );
    }
  }

  function deleteAll() {
    DataStore.delete(Note, Predicates.ALL);
  }

  async function getCurrentNote() {
    const _note = await DataStore.query(Note, currentNote.id);
    console.log(_note);
    setCurrentNote(_note);
    return _note;
  }

  async function getNotes() {
    const _notes = await DataStore.query(Note);
    //@ts-ignore
    setNotes(_notes);
    console.log("Notes", _notes);
  }

  function clearLocalState() {
    setNotes([]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Bug bash</h1>
          <DataStoreOperations deleteAll={deleteAll} />
          <hr />
          <h2>Note operations:</h2>
          <button onClick={getNotes}>Query all</button>
          <button onClick={createNonSyncRecords}>
            Create unsyncable records
          </button>
          <button onClick={onCreate}>Create syncable record</button>
          <button onClick={clearLocalState}>Clear Local State</button>
          <pre>notes: {JSON.stringify(notes, null, 2)}</pre>
        </div>
      </header>
    </div>
  );
}

export default App;
