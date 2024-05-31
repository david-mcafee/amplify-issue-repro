import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import type { SelectionSet } from "aws-amplify/data";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

// const selectionSet = ["id", "title", "content.*"] as const;
// const selectionSet2 = ["id", "title"] as const;

// type TodoModel = SelectionSet<Schema["Todo"]["type"], typeof selectionSet>;

function App() {
  // const [todos, setTodos] = useState<TodoModel[]>([]);

  async function listTodos() {
    // fetch all todos
    // const { data } = await client.models.Todo.list({
    //   selectionSet: selectionSet,
    // });
    const { data } = await client.models.Todo.list();
    // setTodos(data);

    console.log("listTodos", data);
  }

  useEffect(() => {
    listTodos();
  }, []);

  async function retrieveChildRecords(items: any) {
    debugger;
    let childRecords = [];
    for (const i of items) {
      const result = await i.content();
      childRecords.push(result);
    }

    console.log("child records:", childRecords);
  }

  async function getChildrenFromList() {
    const { data } = await client.models.Todo.list();
    console.log("list:", data);
    await retrieveChildRecords(data);
  }

  async function deleteAll() {
    const { data } = await client.models.Todo.list();

    for (const d of data) {
      await client.models.Todo.delete(d);
    }

    const { data: contentData } = await client.models.Content.list();

    for (const c of contentData) {
      await client.models.Content.delete(c);
    }
  }

  useEffect(() => {
    // const sub = client.models.Todo.observeQuery({
    //   // Cx selectionSet results in following error:
    //   // `The type is readonly and cannot be assigned to the mutable type:`
    //   // selectionSet: selectionSet,
    //   selectionSet: ["id", "title", "content.*"],
    // }).subscribe(({ items, isSynced }) => {
    const sub = client.models.Todo.observeQuery().subscribe(
      ({ items, isSynced }) => {
        console.log("observeQuery:", items);
        console.log("isSynced", isSynced);

        // for (const i of items) {
        //   if (typeof i.content === "function") {
        //     // debugger;
        //     // // @ts-ignore
        //     // const test = await i.content();
        //     // debugger;
        //     test2(i);
        //   }
        // }
        retrieveChildRecords(items);
      }
    );

    return () => sub.unsubscribe();
  }, []);

  return (
    <div>
      <h1>Todos</h1>
      <button
        onClick={async () => {
          const { data: newTodo } = await client.models.Todo.create({
            title: "Title",
          });

          await client.models.Content.create({
            text: "Content",
            todoId: newTodo?.id,
          });

          await listTodos();
        }}
      >
        Create
      </button>

      <button onClick={listTodos}>list</button>
      <button onClick={deleteAll}>delete all</button>
      <button onClick={getChildrenFromList}>
        list parent then retrieve children
      </button>
    </div>
  );
}

export default App;
