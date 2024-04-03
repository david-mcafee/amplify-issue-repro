import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

export default function TodoList() {
  // const client = generateClient<Schema>();

  // Intentional error:
  const client = generateClient<Schema>({ authMode: "iam" });

  const [todos, setTodos] = useState<Schema["Todo"][]>([]);

  async function listTodos() {
    // fetch all todos
    const response = await client.models.Todo.list();
    console.log('response.data', response.data)
    console.log('response.errors', response.errors)
    // // @ts-expect-error - test
    setTodos(response?.data);
  }

  useEffect(() => {
    listTodos();
  }, []);
    
//   useEffect(() => {
//     listTodos()
//     const sub = client.models.Todo.observeQuery().subscribe(({ items }) =>
//     setTodos([...items])
//     );

//     return () => sub.unsubscribe();
//   }, []);

  return (
    <div>
      <h1>Todos</h1>
      <button onClick={async () => {
        // create a new Todo with the following attributes
        const response = await client.models.Todo.create({
          // prompt the user to enter the title
          content: window.prompt("title"),
          done: false,
          priority: 'medium'
        })
        // console.log('response.data', response.data)
        // console.log('response.errors', response.errors)
        console.log(response)
      }}>Create</button>
      <button onClick={listTodos}>fetch todos</button>
      <ul>
        {todos && todos.length && todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
    </div>
  );
}