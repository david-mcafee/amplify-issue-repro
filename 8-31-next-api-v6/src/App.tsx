import { useEffect, useState } from "react";
import "./App.css";
import { API, graphqlOperation } from "aws-amplify";
import { GraphQLQuery, GraphQLSubscription } from "@aws-amplify/api";
import {
  CreateTodoInput,
  CreateTodoMutation,
  DeleteTodoInput,
  DeleteTodoMutation,
  ListTodosQuery,
  OnCreateTodoSubscription,
} from "./API";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
import * as subscriptions from "./graphql/subscriptions";

function App() {
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    // Subscribe to creation of Todo
    const sub = API.graphql<GraphQLSubscription<OnCreateTodoSubscription>>(
      graphqlOperation(subscriptions.onCreateTodo)
    ).subscribe({
      next: (payload) => {
        const createdTodo = payload.value.data?.onCreateTodo;
        console.log(createdTodo);
      },
    });

    // Stop receiving data updates from the subscription
    return () => sub.unsubscribe();
  }, []);

  const createTodo = async () => {
    const todo: CreateTodoInput = {
      name: "My first todo",
      description: "Hello world!",
    };

    await API.graphql<GraphQLQuery<CreateTodoMutation>>(
      graphqlOperation(createTodo, { input: todo })
    );
  };

  const getTodos = async () => {
    const todos = await API.graphql<GraphQLQuery<ListTodosQuery>>(
      graphqlOperation(queries.listTodos)
    );

    if (todos.data?.listTodos?.items) {
      setTodos(todos.data?.listTodos?.items);
      return todos.data?.listTodos?.items;
    }
  };

  async function deleteAll(): Promise<boolean> {
    // Retrieve all records:
    const response = await API.graphql<GraphQLQuery<ListTodosQuery>>({
      query: queries.listTodos,
    });

    // Delete all records:
    if (response?.data?.listTodos) {
      response.data.listTodos.items.forEach(async (todo) => {
        if (todo) {
          const todoDetails: DeleteTodoInput = {
            id: todo.id,
          };

          await API.graphql<GraphQLQuery<DeleteTodoMutation>>({
            query: mutations.deleteTodo,
            variables: { input: todoDetails },
          });
        }
      });
    }

    // Verify all records have been deleted:
    const secondResponse = await API.graphql<GraphQLQuery<ListTodosQuery>>({
      query: queries.listTodos,
    });

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
