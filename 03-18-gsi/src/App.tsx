// TodoList.tsx

import { useState, useEffect } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
// import { v4 as uuid } from "uuid";

const client = generateClient<Schema>();

export default function GSIListSort() {
  const [todos, setTodos] = useState<Schema["Todo"][]>([]);
  const [todo3s, setTodo3s] = useState<Schema["Todo3"][]>([]);
  const [anotherOnes, setAnotherOnes] = useState<Schema["AnotherOne"][]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  //region Todo
  const fetchTodos = async () => {
    const { data: items } = await client.models.Todo.list();
    setTodos(items);
    return items;
  };

  const fetchTodosSort = async () => {
    const { data: items } = await client.models.Todo.list({
      //@ts-expect-error - test
      sortDirection: "DESC",
    });
    setTodos(items);
  };

  const listTodosQuery = /* GraphQL */ `
    query ListTodos(
      $filter: ModelTodoFilterInput
      $sortDirection: ModelSortDirection
      $todoId: ID
      $limit: Int
      $nextToken: String
    ) {
      listTodos(
        filter: $filter
        sortDirection: $sortDirection
        todoId: $todoId
        limit: $limit
        nextToken: $nextToken
      ) {
        items {
          todoId
          status
          content
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
    }
  `;

  const fetchTodosGQLAsc = async () => {
    //@ts-expect-error - test
    const { data: items } = await client.graphql({
      query: listTodosQuery,
      variables: {
        sortDirection: "ASC",
        todoId: "1", // Provide a default value for todoId
      },
    });
    console.log("fetchTodosGQL", items.listTodos.items);
    setTodos(items.listTodos.items);
  };

  const fetchTodosGQLDesc = async () => {
    //@ts-expect-error - test
    const { data: items } = await client.graphql({
      query: listTodosQuery,
      variables: {
        sortDirection: "DESC",
        todoId: "1", // Provide a default value for todoId
      },
    });
    console.log("fetchTodosGQL", items.listTodos.items);
    setTodos(items.listTodos.items);
  };

  const createTodos = async () => {
    await client.models.Todo.create({
      todoId: "1",
      content: `Todo ${Date.now()}`,
      status: "a",
    });

    await client.models.Todo.create({
      todoId: "1",
      content: `Todo ${Date.now()}`,
      status: "b",
    });

    await client.models.Todo.create({
      todoId: "1",
      content: `Todo ${Date.now()}`,
      status: "c",
    });

    fetchTodos();
  };

  async function deleteAllTodos() {
    const res = await fetchTodos();

    if (!res) {
      return false;
    }

    const toDeleteKeys = res
      .map((todo) => {
        return { pk: todo?.todoId, sk: todo?.status };
      })
      .filter((todoId) => todoId);

    console.log("toDeleteKeys", toDeleteKeys);

    const deletePromises = toDeleteKeys?.map(async (keys) => {
      await client.models.Todo.delete({ todoId: keys.pk, status: keys.sk });
    });

    await Promise.all(deletePromises);

    const checkRes = await fetchTodos();

    if (checkRes.length === 0) {
      console.log("All todos deleted");
    } else {
      console.log("Failed to delete all todos");
    }
  }
  //endregion

  //region Todo3
  const fetchTodo3s = async () => {
    const { data: items } = await client.models.Todo3.list();
    setTodo3s(items);
    return items;
  };

  const fetchTodo3sSort = async () => {
    const { data: items } = await client.models.Todo3.list({
      //@ts-expect-error - test
      sortDirection: "DESC",
    });
    setTodo3s(items);
  };

  const createTodo3s = async () => {
    await client.models.Todo3.create({
      content: `Todo3 ${Date.now()}`,
      status: "a",
    });

    await client.models.Todo3.create({
      content: `Todo3 ${Date.now()}`,
      status: "b",
    });

    await client.models.Todo3.create({
      content: `Todo3 ${Date.now()}`,
      status: "c",
    });

    fetchTodo3s();
  };

  async function deleteAllTodo3s() {
    const res = await fetchTodo3s();

    if (!res) {
      return false;
    }

    const toDeleteKeys = res.map((todo3) => {
      return { pk: todo3?.id };
    });
    // .filter((id) => id);

    console.log("toDeleteKeys", toDeleteKeys);

    const deletePromises = toDeleteKeys?.map(async (keys) => {
      await client.models.Todo3.delete({ id: keys.pk });
    });

    await Promise.all(deletePromises);

    const checkRes = await fetchTodo3s();

    if (checkRes.length === 0) {
      console.log("All todo3s deleted");
    } else {
      console.log("Failed to delete all todo3s");
    }
  }
  //endregion

  //region AnotherOne
  const fetchAnotherOnes = async () => {
    const { data: items } = await client.models.AnotherOne.list();
    setAnotherOnes(items);
    return items;
  };

  const fetchAnotherOnesSort = async () => {
    const { data: items } = await client.models.AnotherOne.list({
      //@ts-expect-error - test
      sortDirection: "ASC",
    });
    setTodo3s(items);
  };

  const createAnotherOnes = async () => {
    await client.models.AnotherOne.create({
      content: `Todo3 ${Date.now()}`,
      status: "a",
    });

    await client.models.AnotherOne.create({
      content: `Todo3 ${Date.now()}`,
      status: "b",
    });

    await client.models.AnotherOne.create({
      content: `Todo3 ${Date.now()}`,
      status: "c",
    });

    fetchAnotherOnes();
  };

  async function deleteAllAnotherOnes() {
    const res = await fetchAnotherOnes();

    if (!res) {
      return false;
    }

    const toDeleteKeys = res.map((todo3) => {
      return { pk: todo3?.id };
    });
    // .filter((id) => id);

    console.log("toDeleteKeys", toDeleteKeys);

    const deletePromises = toDeleteKeys?.map(async (keys) => {
      await client.models.AnotherOne.delete({ id: keys.pk });
    });

    await Promise.all(deletePromises);

    const checkRes = await fetchAnotherOnes();

    if (checkRes.length === 0) {
      console.log("All AnotherOnes deleted");
    } else {
      console.log("Failed to delete all AnotherOnes");
    }
  }
  //endregion

  async function deleteAll() {
    await deleteAllTodos();
    await deleteAllTodo3s();
    await deleteAllAnotherOnes();
  }

  async function fetchAll() {
    await fetchTodos();
    await fetchTodo3s();
    await fetchAnotherOnes();
  }

  return (
    <div>
      <h2>Todo</h2>
      <button onClick={createTodos}>Add new todos</button>
      <button onClick={fetchTodos}>List todos</button>
      <button onClick={fetchTodosSort}>List todos (sort)</button>
      <button onClick={fetchTodosGQLDesc}>fetchTodosGQLDesc</button>
      <button onClick={fetchTodosGQLAsc}>fetchTodosGQLAsc</button>
      <ul>
        {todos.length > 0 &&
          todos.map(({ todoId, content, status }) => (
            <div style={{ border: `1px solid black` }}>
              <li key={`${todoId}-content`}>{content}</li>
              <li key={`${todoId}-status`}>SK: {status}</li>
            </div>
          ))}
      </ul>
      <h2>Todo3</h2>
      <button onClick={createTodo3s}>Add new todo3s</button>
      <button onClick={fetchTodo3s}>List todo3s</button>
      <button onClick={fetchTodo3sSort}>List todo3s (sort)</button>
      <ul>
        {todo3s.map(({ id, content }) => (
          <li key={id}>{content}</li>
        ))}
      </ul>
      <h2>AnotherOne</h2>
      <button onClick={createAnotherOnes}>Add new AnotherOnes</button>
      <button onClick={fetchAnotherOnes}>List AnotherOnes</button>
      <button onClick={fetchAnotherOnesSort}>List AnotherOnes (sort)</button>
      <ul>
        {anotherOnes.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
      <h2>All</h2>
      <button onClick={deleteAll}>Delete All</button>
      <button onClick={fetchAll}>fetch All</button>
    </div>
  );
}
