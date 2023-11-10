import React, { useEffect, useState } from "react";
import "./App.css";
import { withAuthenticator } from "./withAuthenticator";
import { Amplify } from "aws-amplify";
import config from "./amplifyconfiguration.json";
import { generateClient } from "aws-amplify/api";
import type { Schema } from "../amplify/data/resource";

Amplify.configure(config);

// Client without headers:
// const client = generateClient<Schema>();

// Static client headers:
const client = generateClient<Schema>(
  {
    headers: {
      "lower-precedence": "12345",
    },
  }
);

// Programatic client headers:
// const client = generateClient<Schema>(
//   {
//     headers: () => {
//       return {
//         "lower-precedence": "12345",
//       };
//     },
//   }
// );

// function TodosOwnerSelectionSet() {
//   useEffect(() => {
//     client.models.Todo.list({
//       // TODO: test after implicit fields are added to model intro schema:
//       // selectionSet: ["id", "name", "owner"],
//       selectionSet: ["id", "name", "owner"],
//     }).then((t) => {
//       console.log(t);
//     });
//   }, []);

//   const createTodo = () => {
//     client.models.Todo.create({
//       name: `New Todo ${Math.random()}`,
//       description: `New Todo ${Math.random()}`,
//     });
//   };

//   return <button onClick={createTodo}>Create Todo</button>;
// }

// function DeleteAllTodos() {
//   useEffect(() => {
//     client.models.Todo.list().then((todos) => {
//       todos.forEach((todo) => {
//         client.models.Todo.delete(todo.id);
//       });
//     });
//   }, []);
//   return null;
// }

function App() {
  const [todos, setTodos] = useState([]);

  // Initial values:
  // useEffect(() => {
  //   client.models.Todo.observeQuery({
  //     initialValues: [
  //       {
  //         id: '12345',
  //         name: "initial value 1",
  //         description: "initial value 1",
  //         createdAt: '2021-01-01T00:00:00.000Z',
  //         updatedAt: '2021-01-01T00:00:00.000Z',
  //       },
  //     ],
  //   }).subscribe((r: any) => {
  //     console.log("observeQuery items:", r.items);
  //     // console.log("isSynced", r.isSynced);
  //     setTodos(r.items);
  //   });
  // }, []);

  useEffect(() => {
    client.models.Todo.observeQuery({
      headers: {
        'highest-precedence': 'my value'
      }
    }).subscribe((r: any) => {
      console.log("observeQuery items:", r.items);
      // console.log("isSynced", r.isSynced);
      setTodos(r.items);
    });
  }, []);

  const listTodos = () => {
    client.models.Todo.list({
      headers: {
        'highest-precedence': 'my value'
      }
    }).then(({ data }) => {
      console.log("list", data);
      //@ts-ignore
      setTodos(data);
    });
  };

  const listTodosGraphQL = () => {
    // TODO
  };

  const createTodo = () => {
    client.models.Todo.create({
      name: `New Todo ${Math.random()}`,
      description: `New Todo ${Math.random()}`,
    },
    {
      headers: {
        'highest-precedence': 'my value'
      }
    });
  };

  const createTodoGraphQL = () => {
    // TODO
  };

  const deleteAll = () => {
    client.models.Todo.list().then(({ data }) => {
      data.forEach((todo) => {
        client.models.Todo.delete({ id: todo.id });
      });
    });
  };

  const deleteAllGraphQL = () => {
  };

  return (
    <div className="App">
      <div>
        <button onClick={listTodos}>List Todos</button>
        <button onClick={createTodo}>Create Todo</button>
        <button onClick={deleteAll}>Delete All</button>
        <button onClick={listTodosGraphQL}>List Todos GraphQL</button>
        <button onClick={createTodoGraphQL}>Create Todo GraphQL</button>
        <button onClick={deleteAllGraphQL}>Delete All GraphQL</button>
      </div>
      {/* <TodosOwnerSelectionSet /> */}
      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </div>
  );
}

export default withAuthenticator(App);
