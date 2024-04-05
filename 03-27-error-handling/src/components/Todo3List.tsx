import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

export default function Todo3List() {
  const client = generateClient<Schema>();

  const [todoId, setTodoId] = useState<string>('');

  async function getTodo() {
    const response = await client.models.Todo3.get({ id: todoId }, { 
      selectionSet: ["id", "content", "additionalInfo.*"],
    });
    console.log('response', response);
  }

  async function listTodos() {
    const response = await client.models.Todo3.list({ 
      selectionSet: ["id", "content", "additionalInfo.*"],
    });
    console.log('response', response);
  }

  return (
    <div>
      <h1>Todo3s</h1>
      <button onClick={async () => {
        const { data: note } = await client.models.Note.create({
          content: 'note content',
        });

        if (!note) {
          console.error('note is not created');
          return;
        }

        // create a new Todo3 with the following attributes
        const {data: todo} = await client.models.Todo3.create({
          // prompt the user to enter the title
          content: `${Date.now()}`,
          additionalInfo: note
        })

        console.log('todo', todo);
        console.log('note', note);

        if (!todo) {
          console.error('todo is not created');
          return;
        }

        setTodoId(todo.id);
      }}>Create</button>
      <button onClick={getTodo}>get todo and note</button>
      <button onClick={listTodos}>list todos and notes</button>
    </div>
  );
}