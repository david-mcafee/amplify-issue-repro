import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

export default function Todo3List() {
  // generate your data client using the Schema from your backend
  const client = generateClient<Schema>();
  // Intentional error:
  // const client = generateClient<Schema>({ authMode: "iam" });

  // const [todo3s, setTodo3s] = useState<Schema["Todo3"][]>([]);
  const [todoId, setTodoId] = useState<string>('');

  async function getTodo() {
    // fetch all todo3s
    const response = await client.models.Todo3.get({ id: todoId }, { 
      selectionSet: ["id", "content", "additionalInfo.*"],
    });
    console.log('response', response);
  }

  // useEffect(() => {
  //   listTodo3s();
  // }, []);
    
//   useEffect(() => {
//     listTodo3s()
//     const sub = client.models.Todo3.observeQuery().subscribe(({ items }) =>
//     setTodo3s([...items])
//     );

//     return () => sub.unsubscribe();
//   }, []);

  return (
    <div>
      <h1>Todo3s</h1>
      <button onClick={async () => {
        const { data: note } = await client.models.Note.create({
          content: 'note content',
        });

        // create a new Todo3 with the following attributes
        const {data: todo} = await client.models.Todo3.create({
          // prompt the user to enter the title
          content: `${Date.now()}`,
          additionalInfo: note
        })
        // console.log('response.data', response.data)
        // console.log('response.errors', response.errors)

        console.log('todo', todo);
        console.log('note', note);

        setTodoId(todo.id);
      }}>Create</button>
      <button onClick={getTodo}>get todo and note</button>
      {/* <ul>
        {todo3s && todo3s.length && todo3s.map((todo3) => (
          <li key={todo3.id}>{todo3.content}</li>
        ))}
      </ul> */}
    </div>
  );
}