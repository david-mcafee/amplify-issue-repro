import { useState, useEffect, useCallback } from "react";
import { Amplify, DataStore, Predicates } from "aws-amplify";
import { Todo } from "./models";
import DataStoreOperations from "./DataStoreOperations";
import { Reachability } from "@aws-amplify/core";

// @ts-ignore
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

let subscriptions: any[] = [];

function App() {
  const [todos, setTodos] = useState<any>([]);

  const initSubs = useCallback(() => {
    if (subscriptions.length) {
      unsubSubs();
    }

    subscriptions.push(
      DataStore.observe(Todo).subscribe((msg: any) => {
        console.log("observe", msg);
        getTodos();
      })
    );
  }, []);

  useEffect(() => {
    initSubs();

    return () => {
      unsubSubs();
    };
  }, [initSubs]);

  function unsubSubs() {
    subscriptions &&
      subscriptions.length &&
      subscriptions.forEach((sub) => sub.unsubscribe());
  }

  //#region Todo
  // Query
  async function getTodos() {
    const _todos = await DataStore.query(Todo);
    setTodos(_todos);
    console.log("Todos", _todos);
  }

  // Create
  async function createTodo() {
    try {
      const todo = await DataStore.save(
        new Todo({
          name: `Todo ${Date.now()}`,
        })
      );

      setTodos([todo]);
      console.log("Todo created:", todo);
    } catch (error) {
      console.error("Save failed:", error);
    }
  }

  // Update
  async function updateTodo() {
    const [originalTodo] = await DataStore.query(Todo);
    console.log("Original Todo:", originalTodo);

    try {
      const todo = await DataStore.save(
        Todo.copyOf(originalTodo, (updated) => {
          updated.name = `name ${Date.now()}`;
        })
      );

      console.log("Todo updated:", todo);
    } catch (error) {
      console.error("Save failed:", error);
    }
  }

  // Delete
  async function deleteTodo() {
    const [todo] = await DataStore.query(Todo);
    if (!todo) return;
    await DataStore.delete(todo);
  }

  //#endregion

  function deleteAll() {
    DataStore.delete(Todo, Predicates.ALL);
  }

  return (
    <div className="App">
      <header className="App-header">
        <DataStoreOperations initSubs={initSubs} deleteAll={deleteAll} />
        <h1>Todo</h1>
        <div className="buttons">
          <button data-test="datastore-query-1" onClick={getTodos}>
            Query
          </button>
          <button data-test="datastore-create-1" onClick={createTodo}>
            Create
          </button>
          <button data-test="datastore-update-1" onClick={updateTodo}>
            Update Last
          </button>
          <button data-test="datastore-delete-1" onClick={deleteTodo}>
            Delete Last
          </button>
        </div>
        <pre>
          <span>todos:</span>
          <pre data-test="datastore-output-1">
            {JSON.stringify(todos, null, 2)}
          </pre>
        </pre>
      </header>
    </div>
  );
}

export default App;
