// TodoList.tsx

import { useState, useEffect } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { v4 as uuid } from "uuid";

const client = generateClient<Schema>();

export default function TodoList() {
  const [todos, setTodos] = useState<Schema["Todo"][]>([]);

  const fetchTodos = async () => {
    const { data: items } = await client.models.Todo.list();
    setTodos(items);
  };

  const fetchTodosSort = async () => {
    const { data: items } = await client.models.Todo.list({});
    setTodos(items);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const createTodo = async () => {
    await client.models.Todo.create({
      todoId: uuid(),
      content: `${Date.now()}`,
      status: "active",
    });

    fetchTodos();
  };

  return (
    <div>
      <button onClick={createTodo}>Add new todo</button>
      <button onClick={fetchTodos}>List todos</button>
      <button onClick={fetchTodosSort}>List todos (sort)</button>
      <ul>
        {todos.map(({ todoId, content }) => (
          <li key={todoId}>{content}</li>
        ))}
      </ul>
    </div>
  );
}
