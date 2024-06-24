import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  async function listTodo2s() {
    const { data } = await client.models.Todo2.list();
    console.log("listTodo2s", data);
  }

  async function newTodo2() {
    const { data: newTodo2 } = await client.models.Todo2.create({
      name: `${Date.now()}`,
    });

    console.log(newTodo2);
  }

  const handleTest = async () => {
    const { data: newCategory } = await client.models.Category.create({
      name: `${Date.now()}`,
    });

    console.log(newCategory);
  };

  async function deleteAll() {
    const { data } = await client.models.Todo2.list();

    for (const d of data) {
      await client.models.Todo2.delete(d);
    }
  }

  return (
    <div>
      <h1>Todo2s</h1>
      <button onClick={newTodo2}>Create</button>
      <button onClick={handleTest}>Create Category</button>
      <button onClick={listTodo2s}>list</button>
      <button onClick={deleteAll}>delete all</button>
    </div>
  );
}

export default App;
