import { useEffect, useState } from "react";
import "./App.css";

import { Amplify, DataStore, Predicates, SortDirection } from "aws-amplify";
import { Todo } from "./models";

import awsconfig from "./aws-exports";
import DataStoreOperations from "./Components/DataStoreOperations";
Amplify.configure(awsconfig);

// Amplify.Logger.LOG_LEVEL = "DEBUG";

function App() {
  const [todos, setTodos] = useState([]);

  // useEffect(() => {
  //   const subscription = DataStore.observeQuery(Todo, Predicates.ALL, {
  //     sort: (s) => s.title(SortDirection.ASCENDING),
  //   }).subscribe((snapshot) => {
  //     const { items, isSynced } = snapshot;
  //     console.log(
  //       `[Snapshot] item count: ${items.length}, isSynced: ${isSynced}`
  //     );
  //     // if (items.length > 0) {
  //     //   SetCheckParentList(items);
  //     // } else {
  //     //   SetCheckParentList([]);
  //     // }
  //   });
  //   // console.log("parentResponses: " + JSON.stringify(parentResponses));

  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, []);

  async function onCreate() {
    const result = await DataStore.save(
      new Todo({
        title: `name ${Date.now()}`,
      })
    );
    //@ts-ignore
    setCurrentTodo(result);
  }

  async function create1000() {
    for (let i = 0; i < 1000; i++) {
      await DataStore.save(
        new Todo({
          title: `name ${Date.now()}`,
        })
      );
      console.log(i);
    }
  }

  async function create10000() {
    for (let i = 0; i < 10000; i++) {
      await DataStore.save(
        new Todo({
          title: `name ${Date.now()}`,
        })
      );
      console.log(i);
    }
  }

  async function create40000() {
    for (let i = 0; i < 40000; i++) {
      await DataStore.save(
        new Todo({
          title: `name ${Date.now()}`,
        })
      );
      console.log(i);
    }
  }

  function deleteAll() {
    DataStore.delete(Todo, Predicates.ALL);
  }

  async function getTodos() {
    const _todos = await DataStore.query(Todo);
    //@ts-ignore
    setTodos(_todos);
    console.log("Todos", _todos);
  }

  function clearLocalState() {
    setTodos([]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Basic Amplify DataStore Demo</h1>
          <DataStoreOperations deleteAll={deleteAll} />
          <hr />
          <h2>Todo operations:</h2>
          <button onClick={getTodos}>Query all</button>
          <button onClick={onCreate}>Create one Todo</button>
          <button onClick={create1000}>Create 1000 Todos</button>
          <button onClick={create10000}>Create 10000 Todos</button>
          <button onClick={create10000}>Create 40000 Todos</button>
          <button onClick={clearLocalState}>Clear Local State</button>
          <pre>todos: {JSON.stringify(todos, null, 2)}</pre>
        </div>
      </header>
    </div>
  );
}

export default App;
