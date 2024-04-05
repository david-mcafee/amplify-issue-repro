import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

export default function TodoList() {
  // Intentional error:
  const client = generateClient<Schema>({ authMode: "iam" });

  const [todos, setTodos] = useState<Schema["Todo"][]>([]);
  const [todoId, setTodoId] = useState<string>('');

  async function getTodo() {
    const response = await client.models.Todo3.get({ id: todoId });
    console.log('response', response);
  }

  async function listTodos() {
    // fetch all todos
    const response = await client.models.Todo.list();
    console.log('response', response);
    setTodos(response?.data);
  }

  return (
    <div>
      <h1>Todos</h1>
      <button onClick={async () => {
        // create a new Todo with the following attributes
        const response = await client.models.Todo.create({
          // prompt the user to enter the title
          content: `${Date.now()}`,
          done: false,
          priority: 'medium'
        })

        console.log(response)

        const {data: todo} = response;

        if (!todo) {
          console.error('todo is not created');
          return;
        }

        setTodoId(todo.id);
      }}>Create</button>
      <button onClick={listTodos}>list todos</button>
      <button onClick={getTodo}>get todos</button>
      <ul>
        {todos && todos.length && todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
    </div>
  );
}