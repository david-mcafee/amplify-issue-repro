import { useCallback, useEffect, useState } from "react";
import "./App.css";

import { Amplify, DataStore, Predicates, SortDirection } from "aws-amplify";
import { Todo } from "./models";

import awsconfig from "./aws-exports";
import DataStoreOperations from "./Components/DataStoreOperations";
Amplify.configure(awsconfig);

// Amplify.Logger.LOG_LEVEL = "DEBUG";

let subscriptions: any[] = [];

function App() {
  const [todos, setTodos] = useState([]);

  const initSubs = useCallback(() => {
    if (subscriptions.length) {
      unsubSubs();
    }

    subscriptions.push(
      DataStore.observeQuery(Todo, Predicates.ALL, {
        sort: (s) => s.title(SortDirection.ASCENDING),
      }).subscribe((snapshot) => {
        const { items, isSynced } = snapshot;
        console.log(
          `[Snapshot] item count: ${items.length}, isSynced: ${isSynced}`
        );
      })
    );
  }, []);

  function unsubSubs() {
    subscriptions &&
      subscriptions.length &&
      subscriptions.forEach((sub) => sub.unsubscribe());
  }

  useEffect(() => {
    initSubs();

    return () => {
      unsubSubs();
    };
  }, [initSubs]);

  async function getTodos() {
    const _todos = await DataStore.query(Todo);
    //@ts-ignore
    setTodos(_todos);
    console.log("Todos", _todos);
    return _todos;
  }

  async function onCreate() {
    console.log("before create");
    const result = await DataStore.save(
      new Todo({
        title: `name ${Date.now()}`,
      })
    );
    console.log("after create", result);
  }

  async function deleteLast() {
    const [_todo] = await DataStore.query(Todo);
    await DataStore.delete(Todo, _todo.id);
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

  async function updateAll() {
    await getTodos().then(async (todos) => {
      todos.forEach(async (todo) => {
        console.log("updating", todo);
        await DataStore.save(
          Todo.copyOf(todo, (updated) => {
            updated.title = `updated at ${Date.now()}`;
          })
        );
      });
    });
  }

  function deleteAll() {
    DataStore.delete(Todo, Predicates.ALL);
  }

  function clearLocalState() {
    setTodos([]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Large data sets:</h1>
          <DataStoreOperations deleteAll={deleteAll} />
          <hr />
          <h2>Todo operations:</h2>
          <button onClick={getTodos}>Query all</button>
          <button onClick={onCreate}>Create one Todo</button>
          <button onClick={create1000}>Create 1000 Todos</button>
          <button onClick={create10000}>Create 10000 Todos</button>
          <button onClick={create40000}>Create 40000 Todos</button>
          <button onClick={deleteLast}>Delete Last</button>
          <button onClick={updateAll}>Update All</button>
          <button onClick={unsubSubs}>Unsubscribe</button>
          <button onClick={initSubs}>Resubscribe</button>
          <button onClick={clearLocalState}>Clear Local State</button>
          <pre>todo count: {todos.length}</pre>
        </div>
      </header>
    </div>
  );
}

export default App;
