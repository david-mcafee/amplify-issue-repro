import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

export default function Todo2List() {
  const client = generateClient<Schema>();

  const [todo2s, setTodo2s] = useState<Schema["Todo2"][]>([]);
  const [todoId, setTodoId] = useState<string>('');

  async function listTodo2s() {
    const response = await client.models.Todo2.list();

    console.log('response', response);
    setTodo2s(response?.data);
  }

  async function getTodo() {
    const response = await client.models.Todo3.get({ id: todoId });
    console.log('response', response);
  }

  return (
    <div>
      <h1>Todo2s</h1>
      <button onClick={async () => {
        // create a new Todo2 with the following attributes
        const response = await client.models.Todo2.create({
          // prompt the user to enter the title
          content: window.prompt("title"),
          done: false,
          priority: 'medium'
        })

        console.log(response)

        const { data: todo2 } = response;
        
        if (!todo2) {
          console.error('todo2 is not created');
          return;
        }

        setTodoId(todo2.id);
        
      }}>Create</button>
      <button onClick={listTodo2s}>fetch todo2s</button>
      <button onClick={getTodo}>get todo2</button>
      <ul>
        {todo2s && todo2s.length && todo2s.map((todo2) => (
          <li key={todo2.id}>{todo2.content}</li>
        ))}
      </ul>
    </div>
  );
}