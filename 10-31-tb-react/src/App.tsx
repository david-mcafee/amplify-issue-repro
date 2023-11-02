// import React, { useState } from "react";
import React, { useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import { Schema } from "../amplify/data/resource";
import { withAuthenticator } from "./LoginForm";

let client: any;

function App() {
  // const [todos, setTodos] = useState([]);

  useEffect(() => {
    client = generateClient<Schema>();
  }, []);

  async function createTodo() {
    const result = await client.models.Todo.create({
      name: `name ${Date.now()}`,
      description: `description ${Date.now()}`,
    });
    console.log("result from create", result);
  }

  async function listTodos() {
    const {
      data: { listTodos },
    } = await client.models.Todo.list();
    console.log("result from list", listTodos);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={createTodo}>create todo</button>
        <button onClick={listTodos}>list todos</button>
        {/* {todos.map((todo: any) => (
          <li key={todo.id}>{todo.content}</li>
        ))} */}
      </header>
    </div>
  );
}

export default withAuthenticator(App);
