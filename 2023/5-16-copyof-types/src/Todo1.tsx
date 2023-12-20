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
  const [snapshots, setSnapshots] = useState([]);

  useEffect(() => {
    const subscription = DataStore.observe(Todo).subscribe(() => {
      getTodos();
      DataStore.start();
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = DataStore.observeQuery(
      Todo,
      (q) =>
        q.or((q) => [
          q.name.contains("should not match this"),
          q.description.contains("updated"),
        ]),
      {
        sort: (q) => q.createdAt(SortDirection.DESCENDING),
      }
    ).subscribe((snapshot) => {
      const { items } = snapshot;
      console.log("snapshot", snapshot);
      //@ts-ignore
      setSnapshots((prev) => [...prev, ...items]);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function onCreate() {
    await DataStore.save(
      new Todo({
        name: `name ${Date.now()}`,
        description: `description ${Date.now()}`,
      })
    );
  }

  async function updateLastTodo() {
    const [_todo] = await DataStore.query(Todo);
    await DataStore.save(
      Todo.copyOf(_todo, (updated) => {
        updated.description = "updated";
      })
    );
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
    setSnapshots([]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Basic Amplify DataStore Demo</h1>
          <DataStoreOperations deleteAll={deleteAll} />
          <hr />
          <h2>Todo operations:</h2>
          <button onClick={getTodos}>Query</button>
          <button onClick={onCreate}>NEW</button>
          <button onClick={updateLastTodo}>UPDATE</button>
          <button onClick={clearLocalState}>Clear Local State</button>
          <pre>todos: {JSON.stringify(todos, null, 2)}</pre>
          <h3>Only returns snapshots for matching updates:</h3>
          <pre>observeQuery: {JSON.stringify(snapshots, null, 2)}</pre>
        </div>
      </header>
    </div>
  );
}

export default App;
