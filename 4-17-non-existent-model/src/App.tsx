import { useState } from "react";
import "./App.css";

import { Amplify, DataStore, Predicates } from "aws-amplify";
import { Todo } from "./models";

import awsconfig from "./aws-exports";
import DataStoreOperations from "./Components/DataStoreOperations";
Amplify.configure(awsconfig);

// Amplify.Logger.LOG_LEVEL = "DEBUG";

function App() {
  const [todos, setTodos] = useState([]);

  async function onCreate() {
    await DataStore.save(
      new Todo({
        name: `name ${Date.now()}`,
        description: `description ${Date.now()}`,
      })
    );
  }

  async function onCreateThenStop() {
    DataStore.save(
      new Todo({
        name: `name ${Date.now()}`,
        description: `description ${Date.now()}`,
      })
    );

    DataStore.stop();
  }

  async function onCreateThenClear() {
    DataStore.save(
      new Todo({
        name: `name ${Date.now()}`,
        description: `description ${Date.now()}`,
      })
    );

    DataStore.clear();
  }

  async function updateLastTodo() {
    const [_todo] = await DataStore.query(Todo);
    await DataStore.save(
      Todo.copyOf(_todo, (updated: any) => {
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
          <button onClick={onCreateThenStop}>Create then Stop</button>
          <button onClick={onCreateThenClear}>Create then Clear</button>
          <button onClick={updateLastTodo}>UPDATE</button>
          <button onClick={clearLocalState}>Clear Local State</button>
          <pre>todos: {JSON.stringify(todos, null, 2)}</pre>
        </div>
      </header>
    </div>
  );
}

export default App;
