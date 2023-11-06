import React, { useEffect } from "react";
import "./App.css";
import { withAuthenticator } from "./withAuthenticator";
import { Amplify } from "aws-amplify";
import config from "./amplifyconfiguration.json";
import { generateClient } from "aws-amplify/api";
import type { Schema } from "../amplify/data/resource";

// @ts-ignore
Amplify.configure(config);

const client = generateClient<Schema>();

function TodosOwnerSelectionSet() {
  useEffect(() => {
    client.models.Todo.list({
      // TODO: test after implicit fields are added to model intro schema:
      // selectionSet: ["id", "name", "owner"],
      selectionSet: ["id", "name"],
    }).then((t) => {
      console.log(t);
    });
  }, []);

  const createTodo = () => {
    client.models.Todo.create({
      name: `New Todo ${Math.random()}`,
      description: `New Todo ${Math.random()}`,
    });
  };

  return <button onClick={createTodo}>Create Todo</button>;
}

function App() {
  useEffect(() => {
    client.models.Todo.observeQuery().subscribe((r) => {
      console.log('items:', r.items);
      console.log('isSynced', r.isSynced);
    }
    );
  }, []);
  return (
    <div className="App">
      <TodosOwnerSelectionSet />
    </div>
  );
}

export default withAuthenticator(App);
