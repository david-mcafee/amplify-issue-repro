import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

export default function Todo2List() {
  // generate your data client using the Schema from your backend
  const client = generateClient<Schema>();
  // Intentional error:
  // const client = generateClient<Schema>({ authMode: "iam" });

  const [todo2s, setTodo2s] = useState<Schema["Todo2"][]>([]);

  async function listTodo2s() {
    // fetch all todo2s
    const response = await client.models.Todo2.list();
    console.log('response.data', response.data)
    console.log('response.errors', response.errors)
    // // @ts-expect-error - test
    setTodo2s(response?.data);
  }

  useEffect(() => {
    listTodo2s();
  }, []);
    
//   useEffect(() => {
//     listTodo2s()
//     const sub = client.models.Todo2.observeQuery().subscribe(({ items }) =>
//     setTodo2s([...items])
//     );

//     return () => sub.unsubscribe();
//   }, []);

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
        // console.log('response.data', response.data)
        // console.log('response.errors', response.errors)
        console.log(response)
      }}>Create</button>
      <button onClick={listTodo2s}>fetch todo2s</button>
      <ul>
        {todo2s && todo2s.length && todo2s.map((todo2) => (
          <li key={todo2.id}>{todo2.content}</li>
        ))}
      </ul>
    </div>
  );
}