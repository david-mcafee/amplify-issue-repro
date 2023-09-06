import { useState } from "react";
import { Amplify, API as _API } from "aws-amplify";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
// import * as subscription from "./graphql/subscriptions";

// import { schema as modelIntrospectionSchema } from "./models/schema.js";

// `next` branch testing:
// import { fetchAuthSession } from "aws-amplify/auth";
// import { post, cancel, isCancel } from "@aws-amplify/api-rest";

//region test utils
// TODO
//endregion

import awsConfig from "./aws-exports";

Amplify.configure({
  ...awsConfig,

  // for `generateClient()`:
  modelIntrospection: {
    models: {},
  },
  // API: {
  //   modelIntrospectionSchema,
  // },
});

// V6:
const client = _API.generateClient();

// ?
// function withoutNulls<T>(items: T[]): Exclude<T, null | undefined>[] {
//   return items.filter((x) => x) as any;
// }

function App() {
  const [todos, setTodos] = useState<any[]>([]);
  const [currentTodo, setCurrentTodo] = useState<any>();

  // useEffect(() => {
  //   // V5
  //   const sub = API.graphql<GraphQLSubscription<OnCreateTodoSubscription>>(
  //     graphqlOperation(subscriptions.onCreateTodo)
  //   ).subscribe({
  //     next: (payload) => {
  //       const createdTodo = payload.value.data?.onCreateTodo;
  //       console.log(createdTodo);
  //     },
  //   });

  // V6
  // const sub = client.graphql({ query: subscription.onCreateTodo }).subscribe({
  //   next(message: any) {
  //     const todo = message.value.data.onCreateTodo;
  //     console.log("onCreate", todo);
  //   },
  // });

  //   // Stop receiving data updates from the subscription
  //   return () => sub.unsubscribe();
  // }, []);

  const createTodo = async () => {
    const mutationResult = await client.graphql({
      query: mutations.createTodo,
      variables: {
        input: {
          name: `Name ${Date.now()}`,
          description: `Description ${Date.now()}`,
        },
      },
    });

    // @ts-ignore
    const createdTodo = mutationResult.data?.createTodo!;
    setCurrentTodo(createdTodo);
    console.log("createdTodo", createdTodo);
    return createdTodo;
  };

  const getTodos = async () => {
    const listResult = await client.graphql({
      query: queries.listTodos,
      variables: {
        filter: {
          name: { notContains: "naughty words" },
        },
      },
    });

    // @ts-ignore
    const fetchedTodos = listResult.data?.listTodos?.items!;

    if (fetchedTodos) {
      setTodos(fetchedTodos);
      console.log("fetchedTodos", fetchedTodos);
      return fetchedTodos;
    }
  };

  const getTodo = async () => {
    if (!currentTodo) return;
    const queryResult = await client.graphql({
      query: queries.getTodo,
      variables: {
        id: currentTodo.id,
      },
    });

    // @ts-ignore
    const fetchedTodo = queryResult.data?.getTodo!;

    setCurrentTodo(fetchedTodo);
    console.log("fetchedTodo", fetchedTodo);
    return fetchedTodo;
  };

  const deleteTodo = async () => {
    if (!currentTodo) return;

    const deleteResult = await client.graphql({
      query: mutations.deleteTodo,
      variables: {
        input: {
          id: currentTodo.id,
        },
      },
    });

    // @ts-ignore
    const deletedTodo = deleteResult.data?.deleteTodo;

    setCurrentTodo(undefined);
    console.log("deletedTodo", deletedTodo);
    return deletedTodo;
  };

  const customQuery = async () => {
    // const echoResult = await client.graphql({
    //   query: queries.postmanEcho,
    //   variables: {
    //     params: {
    //       // NOTE: uses @http under the hood, which does NOT appear to perform any
    //       // URL encoding on our behalf.
    //       value: "whatever",
    //     },
    //   },
    // });
    // const echoResultObject = echoResult.data?.postmanEcho;
    // console.log("custom result", echoResultObject);
  };
  const search = async () => {
    // create some things to find (and some *not* to)
    // const postIds = [] as string[];
    // for (const title of ["awesome things", "cool things", "whatever"]) {
    //   const r = await client.graphql({
    //     query: mutations.createPost,
    //     variables: {
    //       input: { title },
    //     },
    //   });
    //   postIds.push(r.data?.createPost?.id!);
    // }
    // // go find it
    // const searchResult = await client.graphql({
    //   query: queries.searchPosts,
    //   variables: {
    //     filter: {
    //       title: { match: "things" },
    //     },
    //   },
    // });
    // const searchResultItems = searchResult.data?.searchPosts?.items;
    // console.log("search result items", searchResultItems);
  };

  // To test cancelling requests:
  // const postThenCancel = async () => {
  //   const apiPromise: Promise<any> = post(
  //     "https://qqfcdfgrpfct3i6heac3celisa.appsync-api.ca-central-1.amazonaws.com/graphql/dev/items",
  //     {
  //       body: { test: 1 },
  //       headers: {},
  //     }
  //   );

  //   // TODO: use error to check `isCancel`:
  //   // try {
  //   //   const result = await apiPromise;
  //   //   alert(JSON.stringify(result, null, 2));
  //   // } catch (err) {
  //   //   const isCancelled = isCancel(err);
  //   //   console.log(`from invokeAPI isCancelled: ${isCancelled}`);
  //   // }

  //   try {
  //     const result = await apiPromise;
  //     alert(JSON.stringify(result, null, 2));
  //   } catch (err) {
  //     const isCancelled = isCancel(err);
  //     console.log(`from invokeAPI isCancelled: ${isCancelled}`);
  //   }

  //   // TODO:
  //   // const isCancelled = await cancel(apiPromise, "stop this please");
  //   // console.log(`from cancelAPI isCancelled: ${isCancelled}`);
  // };
  // const isCancelRequest = async (promise: Promise<any>) => {
  //   const isCancelled = await isCancel(promise);
  //   console.log(`isCancelled: ${isCancelled}`);
  // };

  // PRE V6:
  async function deleteAll(): Promise<boolean> {
    const response = await getTodos();

    console.log("first query:", response);

    // Delete all records:
    if (response) {
      await Promise.all(
        response?.map(async (todo: any) => {
          const deleteResponse = await client.graphql({
            query: mutations.deleteTodo,
            variables: {
              input: { id: todo.id },
            },
          });

          // @ts-ignore
          console.log("deletedPost", deleteResponse.data?.deletePost);
        })
      );
    }

    // Verify all records have been deleted:
    const secondResponse = await getTodos();

    console.log("second query:", secondResponse);

    const allDeleted = secondResponse?.length === 0;

    console.log("allDeleted", allDeleted);

    return allDeleted;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1 style={{ margin: ".5rem" }}>API V6 + Next Testing</h1>
      <button onClick={createTodo} style={{ margin: ".5rem" }}>
        Create Todo
      </button>
      <button onClick={getTodos} style={{ margin: ".5rem" }}>
        Get Todos
      </button>
      <button
        onClick={getTodo}
        disabled={!currentTodo}
        style={{ margin: ".5rem" }}
      >
        Get Todo
      </button>
      <button
        onClick={deleteTodo}
        disabled={!currentTodo}
        style={{ margin: ".5rem" }}
      >
        Delete Todo
      </button>
      <br />
      <button onClick={customQuery} style={{ margin: ".5rem" }}>
        Custom Query
      </button>
      <button onClick={search} style={{ margin: ".5rem" }}>
        Search
      </button>
      {/* <button onClick={postThenCancel} style={{ margin: ".5rem" }}>
        Post / Cancel request (currently using REST, not API)
      </button>
      <button onClick={isCancelRequest} style={{ margin: ".5rem" }}>
        Is Cancel Request
      </button> */}
      <br />
      <button onClick={deleteAll} style={{ margin: ".5rem" }}>
        Delete All
      </button>
      <pre>currentTodo: {JSON.stringify(currentTodo, null, 2)}</pre>
      <pre>todos: {JSON.stringify(todos, null, 2)}</pre>
    </div>
  );
}

export default App;
