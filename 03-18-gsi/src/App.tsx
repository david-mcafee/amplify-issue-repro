// TodoList.tsx

import { useState, useEffect } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
// import { v4 as uuid } from "uuid";

const client = generateClient<Schema>();

export default function GSIListSort() {
  const [todos, setTodos] = useState<Schema["Todo"][]>([]);
  const [customers, setCustomers] = useState<Schema["Customer"][]>([]);

  useEffect(() => {
    fetchAll();
  }, []);

  // #region Todo
  const fetchTodos = async () => {
    const { data: items } = await client.models.Todo.list();
    setTodos(items);
    return items;
  };

  const fetchTodosSortASC = async () => {
    const { data: items } = await client.models.Todo.list({
      todoId: "1",
      sortDirection: "ASC",
    });
    setTodos(items);
  };

  const fetchTodosSortDESC = async () => {
    const { data: items } = await client.models.Todo.list({
      todoId: "1",
      sortDirection: "DESC",
    });
    setTodos(items);
  };

  // const listTodosQuery = /* GraphQL */ `
  //   query ListTodos(
  //     $filter: ModelTodoFilterInput
  //     $sortDirection: ModelSortDirection
  //     $todoId: ID
  //     $limit: Int
  //     $nextToken: String
  //   ) {
  //     listTodos(
  //       filter: $filter
  //       sortDirection: $sortDirection
  //       todoId: $todoId
  //       limit: $limit
  //       nextToken: $nextToken
  //     ) {
  //       items {
  //         todoId
  //         status
  //         content
  //         createdAt
  //         updatedAt
  //         __typename
  //       }
  //       nextToken
  //       __typename
  //     }
  //   }
  // `;

  // const fetchTodosGQLAsc = async () => {
  //   //@ts-expect-error - test
  //   const { data: items } = await client.graphql({
  //     query: listTodosQuery,
  //     variables: {
  //       sortDirection: "ASC",
  //       todoId: "1",
  //     },
  //   });
  //   console.log("fetchTodosGQL", items.listTodos.items);
  //   setTodos(items.listTodos.items);
  // };

  // const fetchTodosGQLDesc = async () => {
  //   //@ts-expect-error - test
  //   const { data: items } = await client.graphql({
  //     query: listTodosQuery,
  //     variables: {
  //       sortDirection: "DESC",
  //       todoId: "1", // Provide a default value for todoId
  //     },
  //   });
  //   console.log("fetchTodosGQL", items.listTodos.items);
  //   setTodos(items.listTodos.items);
  // };

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
  // #endregion

  // #region Customer
  const customersIndexQuerySortASC = async () => {
    const { data: items } =
      await client.models.Customer.listByAccountRepresentativeIdAndName(
        {
          accountRepresentativeId: "1",
          name: { beginsWith: "a" },
        },
        {
          sortDirection: "ASC",
        }
      );
    setCustomers(items);
    return items;
  };

  const customersIndexQuerySortDESC = async () => {
    const { data: items } =
      await client.models.Customer.listByAccountRepresentativeIdAndName(
        {
          accountRepresentativeId: "1",
          name: { beginsWith: "a" },
        },
        {
          sortDirection: "DESC",
        }
      );
    setCustomers(items);
    return items;
  };

  const createCustomers = async () => {
    await client.models.Customer.create({
      name: `aa`,
      accountRepresentativeId: "1",
    });

    await client.models.Customer.create({
      name: `ab`,
      accountRepresentativeId: "1",
    });

    await client.models.Customer.create({
      name: `ac`,
      accountRepresentativeId: "1",
    });

    customersIndexQuerySortASC();
  };

  async function deleteAllCustomers() {
    const res = await customersIndexQuerySortASC();

    if (!res) {
      return false;
    }

    const toDeleteKeys = res
      .map((customer) => {
        return { pk: customer?.id };
      })
      .filter((customerId) => customerId);

    console.log("toDeleteKeys", toDeleteKeys);

    const deletePromises = toDeleteKeys?.map(async (keys) => {
      await client.models.Customer.delete({
        id: keys.pk,
      });
    });

    await Promise.all(deletePromises);

    const checkRes = await customersIndexQuerySortASC();

    if (checkRes.length === 0) {
      console.log("All customers deleted");
    } else {
      console.log("Failed to delete all customers");
    }
  }
  // #endregion

  async function deleteAll() {
    await deleteAllTodos();
    await deleteAllCustomers();
  }

  async function fetchAll() {
    await fetchTodos();
    await customersIndexQuerySortASC();
  }

  return (
    <div>
      <h2>Todo</h2>
      <button onClick={createTodos}>Add new todos</button>
      <button onClick={fetchTodos}>List todos</button>
      <button onClick={fetchTodosSortASC}>List todos sort ASC</button>
      <button onClick={fetchTodosSortDESC}>List todos sort DESC</button>
      {/* <button onClick={fetchTodosPK}>List todos PK</button> */}
      {/* <button onClick={fetchTodosGQLDesc}>fetchTodosGQLDesc</button> */}
      {/* <button onClick={fetchTodosGQLAsc}>fetchTodosGQLAsc</button> */}
      <ul>
        {todos &&
          todos.length > 0 &&
          todos.map(({ todoId, content, status }) => (
            <div style={{ border: `1px solid black` }}>
              <li key={`${todoId}-content`}>{content}</li>
              <li key={`${todoId}-status`}>SK: {status}</li>
            </div>
          ))}
      </ul>
      <h2>Customer</h2>
      <button onClick={createCustomers}>Add new customers</button>
      <button onClick={customersIndexQuerySortASC}>
        customersIndexQuerySortASC
      </button>
      <button onClick={customersIndexQuerySortDESC}>
        customersIndexQuerySortDESC
      </button>
      <ul>
        {customers &&
          customers.length > 0 &&
          customers.map(({ id, name, accountRepresentativeId }) => (
            <div style={{ border: `1px solid black` }}>
              <li key={`${id}-name`}>{name}</li>
              <li key={`${id}-accountRepresentativeId`}>
                {accountRepresentativeId}
              </li>
            </div>
          ))}
      </ul>
      <h2>All</h2>
      <button onClick={deleteAll}>Delete All</button>
      <button onClick={fetchAll}>fetch All</button>
    </div>
  );
}
