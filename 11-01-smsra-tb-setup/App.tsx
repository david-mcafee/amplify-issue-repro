import React, { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { Schema } from "../amplify/data/resource";
import { withAuthenticator } from "../10-31-tb-react/src/LoginForm";
import { signOut } from "aws-amplify/auth";

let client: any;

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    client = generateClient<Schema>();
    console.log("client", client);
  }, []);

  async function createTodo() {
    const test = await client.models;
    console.log("test", test);
    // const result = await client.models.Todo.create({
    //   name: `name ${Date.now()}`,
    //   description: `description ${Date.now()}`,
    // });
    // console.log("result from create", result);
  }

  async function listTodos() {
    const {
      data: { listTodos },
    } = await client.models.Todo.list();
    console.log("result from list", listTodos);
    // setTodos(listTodos);
  }

  async function listTodosOwnerSelectionSet1() {
    const {
      data: { listTodos },
    } = await client.models.Todo.list({
      selectionSet: `
        items {
          id
          name
          owner
        }
      `,
    });
    console.log("result from list", listTodos);
  }

  async function listTodosOwnerSelectionSet2() {
    const {
      data: { listTodos },
    } = await client.models.Todo.list({
      selectionSet: ["id", "name", "owner"],
    });
    console.log("result from list", listTodos);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => signOut()}>sign out</button>
        <button onClick={createTodo}>create todo</button>
        <button onClick={listTodos}>list todos</button>
        <button onClick={listTodosOwnerSelectionSet1}>
          list todos owner selection set 1
        </button>
        <button onClick={listTodosOwnerSelectionSet2}>
          list todos owner selection set 2
        </button>
        {todos.map((todo: any) => (
          <li key={todo.id}>
            {todo.name} {todo.owner}
          </li>
        ))}
      </header>
    </div>
  );
}

export default withAuthenticator(App);
