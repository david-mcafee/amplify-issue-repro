// import { useEffect, useState } from "react";
import { useState } from "react";
import "./App.css";
import { API, graphqlOperation } from "aws-amplify";
// import { GraphQLQuery, GraphQLSubscription } from "@aws-amplify/api";
import { GraphQLQuery } from "@aws-amplify/api";
import {
  CreateTodoInput,
  CreateTodoMutation,
  DeleteTodoInput,
  DeleteTodoMutation,
  ListTodosQuery,
  // OnCreateTodoSubscription,
} from "./API";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
// import * as subscriptions from "./graphql/subscriptions";

function App() {
  const [todos, setTodos] = useState<any[]>([]);

  // useEffect(() => {
  //   // Subscribe to creation of Todo
  //   const sub = API.graphql<GraphQLSubscription<OnCreateTodoSubscription>>(
  //     graphqlOperation(subscriptions.onCreateTodo)
  //   ).subscribe({
  //     next: (payload) => {
  //       const createdTodo = payload.value.data?.onCreateTodo;
  //       console.log(createdTodo);
  //     },
  //   });

  //   // Stop receiving data updates from the subscription
  //   return () => sub.unsubscribe();
  // }, []);

  const createTodo = async () => {
    const todoDetails: CreateTodoInput = {
      name: "Todo 1",
      description: "Learn AWS AppSync",
    };

    const newTodo = await API.graphql<GraphQLQuery<CreateTodoMutation>>({
      query: mutations.createTodo,
      variables: { input: todoDetails },
    });

    console.log("newTodo", newTodo);
    return newTodo;
  };

  const getTodos = async () => {
    const response = await API.graphql<GraphQLQuery<ListTodosQuery>>(
      graphqlOperation(queries.listTodos)
    );

    const todos = response.data?.listTodos?.items;

    if (todos) {
      setTodos(todos);
      console.log("todos", todos);
      return todos;
    }
  };

  async function deleteAll(): Promise<boolean> {
    // Retrieve all records:
    const response = await API.graphql<GraphQLQuery<ListTodosQuery>>({
      query: queries.listTodos,
    });

    console.log("first query:", response);

    const todos = response?.data?.listTodos?.items;

    // Delete all records:
    if (todos) {
      todos.forEach(async (todo) => {
        if (todo) {
          const todoDetails: DeleteTodoInput = {
            id: todo.id,
          };

          const deleteResponse = await API.graphql<
            GraphQLQuery<DeleteTodoMutation>
          >({
            query: mutations.deleteTodo,
            variables: { input: todoDetails },
          });

          console.log("deleteResponse", deleteResponse);
        }
      });
    }

    // Verify all records have been deleted:
    const secondResponse = await API.graphql<GraphQLQuery<ListTodosQuery>>({
      query: queries.listTodos,
    });

    console.log("second query:", secondResponse);

    const allDeleted = secondResponse?.data?.listTodos?.items.length === 0;

    console.log("allDeleted", allDeleted);

    return allDeleted;
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={createTodo}>Create Todo</button>
        <button onClick={getTodos}>Get Todos</button>
        <button onClick={deleteAll}>Delete All</button>
        <pre>todos: {JSON.stringify(todos, null, 2)}</pre>
      </header>
    </div>
  );
}

export default App;
