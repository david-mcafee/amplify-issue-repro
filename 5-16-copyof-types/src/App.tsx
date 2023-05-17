import { useEffect, useState } from "react";
import "./App.css";

import { Amplify, DataStore, Predicates } from "aws-amplify";
import { MutableModel } from "@aws-amplify/datastore";
// import { schema } from "./models/schema";
import { Todo } from "./models";

import awsconfig from "./aws-exports";
import DataStoreOperations from "./Components/DataStoreOperations";
Amplify.configure(awsconfig);

// Amplify.Logger.LOG_LEVEL = "DEBUG";

function App() {
  const [todos, setTodos] = useState([]);
  // const [snapshots, setSnapshots] = useState([]);
  const [counter, setCounter] = useState(0);
  const [currentTodo, setCurrentTodo] = useState();

  useEffect(() => {
    const subscription = DataStore.observe(Todo).subscribe((msg) => {
      const { opType, element } = msg;
      //@ts-ignore
      // console.log("SUB DESCRIPTION:", [element.description, element._version]);
      // console.log(opType);
      console.log(msg);
    });

    return () => subscription.unsubscribe();
  }, []);

  // useEffect(() => {
  //   const subscription = DataStore.observeQuery(
  //     Todo,
  //     (q) =>
  //       q.or((q) => [
  //         q.name.contains("should not match this"),
  //         q.description.contains("updated"),
  //       ]),
  //     {
  //       sort: (q) => q.createdAt(SortDirection.DESCENDING),
  //     }
  //   ).subscribe((snapshot) => {
  //     const { items } = snapshot;
  //     console.log("snapshot", snapshot);
  //     //@ts-ignore
  //     setSnapshots((prev) => [...prev, ...items]);
  //   });
  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, []);

  async function onCreate() {
    const result = await DataStore.save(
      new Todo({
        name: `name ${Date.now()}`,
        description: `description ${Date.now()}`,
      })
    );
    //@ts-ignore
    setCurrentTodo(result);
  }

  async function updateLastTodo() {
    const [originalRow2] = await DataStore.query(Todo);
    const [copyUpdatedRow] = await DataStore.query(Todo);
    setCounter((prev) => prev + 1);
    await DataStore.save(
      Todo.copyOf(originalRow2 as Todo, (original) => {
        Object.assign(original, copyUpdatedRow);
      })
    );
  }

  async function test() {
    type QuoteInfo = Todo;
    const [copyUpdatedRow] = await DataStore.query(Todo);
    const [originalRow2] = await DataStore.query(Todo);

    const updatedRow: QuoteInfo = await DataStore.save(
      Todo.copyOf(originalRow2, (original) => {
        Object.assign(original, copyUpdatedRow);
      })
    );
  }

  function pause(ms: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, ms);
    });
  }

  async function updateManyTimes() {
    for (let i = 0; i < 3; i++) {
      // Pause on slow network:
      /**
       * pause(200) - results in title being 0
       * middle ranges - differing version results, all with failures (but different )
       * pause(500) - succeeds
       */
      // await pause(100);
      console.log(`UPDATE-------------------- ${i}`);
      console.log(`UPDATE-------------------- ${i}`);
      /**
       * Version here will be `undefined` each time, as will the
       * responses from `observe`, and will result in breaking behavior.
       * `const [retrieved] = await DataStore.query(Todo);`, however,
       * will retrieve a version, as will `observe`, and it will
       * always update as expected.
       */
      if (!currentTodo) return;
      // @ts-ignore
      const retrieved = await DataStore.query(Todo, currentTodo.id);

      console.log("RETRIEVED DESC / VERSION:", [
        retrieved?.description,
        //@ts-ignore
        retrieved?._version,
      ]);

      await DataStore.save(
        //@ts-ignore
        Todo.copyOf(retrieved, (updated) => {
          updated.description = `updated ${i}`;
        })
      );
    }

    // @ts-ignore
    // const final = await DataStore.query(Todo, original.id);
    //@ts-ignore
    // setTodos([final]);
  }

  function deleteAll() {
    DataStore.delete(Todo, Predicates.ALL);
  }

  async function getCurrentTodo() {
    //@ts-ignore
    const _todo = await DataStore.query(Todo, currentTodo.id);
    console.log(_todo);
    // @ts-ignore
    console.log("get current todo version", _todo._version);
    //@ts-ignore
    setCurrentTodo(_todo);
    return _todo;
  }

  async function getTodos() {
    const _todos = await DataStore.query(Todo);
    //@ts-ignore
    setTodos(_todos);
    console.log("Todos", _todos);
  }

  // async function initSchemaTest() {
  //   const models = initSchema(schema);
  //   const selectedModel = Object.keys(models)[0];
  //   const test = models[selectedModel];
  //   await DataStore.clear();
  //   await DataStore.start();
  //   //@ts-ignore
  //   DataStore.observeQuery(test).subscribe((snapshot) => {
  //     console.log("snapshot", snapshot);
  //   });
  // }

  function clearLocalState() {
    setTodos([]);
    // setSnapshots([]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Basic Amplify DataStore Demo</h1>
          <DataStoreOperations deleteAll={deleteAll} />
          <hr />
          <h2>Todo operations:</h2>
          <h3>Current Todo Version:</h3>
          <p>{JSON.stringify(currentTodo, null, 2)}</p>
          <button onClick={getTodos}>Query all</button>
          <button onClick={onCreate}>1 NEW</button>
          <button onClick={getCurrentTodo}>2 Get current Todo</button>
          <button onClick={updateManyTimes}>
            3 Update one record many times
          </button>
          <button onClick={updateLastTodo}>UPDATE</button>
          <button onClick={clearLocalState}>Clear Local State</button>
          {/* <button onClick={initSchemaTest}>Init schema</button> */}
          <pre>todos: {JSON.stringify(todos, null, 2)}</pre>
          {/* <h3>Only returns snapshots for matching updates:</h3> */}
          {/* <pre>observeQuery: {JSON.stringify(snapshots, null, 2)}</pre> */}
        </div>
      </header>
    </div>
  );
}

export default App;
