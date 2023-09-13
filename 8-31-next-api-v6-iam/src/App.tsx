import { useEffect, useState } from "react";
import { ZenObservable } from "zen-observable-ts";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
import * as subscription from "./graphql/subscriptions";
import { parseAWSExports } from "@aws-amplify/core";

import awsConfig from "./aws-exports";

const config = parseAWSExports(awsConfig);
console.log("config", config);

Amplify.configure(config);

// Tempo workaround
// Amplify.configure({
//   API: {
//     AppSync: {
//       endpoint: awsConfig.aws_appsync_graphqlEndpoint,
//       defaultAuthMode: {
//         type: "iam",
//       },
//       region: awsConfig.aws_appsync_region,
//     },
//   },
//   Auth: {
//     Cognito: {
//       identityPoolId: awsConfig.aws_cognito_identity_pool_id,
//       allowGuestAccess: true,
//     },
//   },
// });

const client = generateClient();

const subs: ZenObservable.Subscription[] = [];

function App() {
  // const [todos, setTodos] = useState<any[]>([]);
  const [currentTodo, setCurrentTodo] = useState<any>();
  const [subMessages, setSubMessages] = useState<any[]>([]);

  useEffect(() => {
    subs.push(
      client
        .graphql({
          query: subscription.onCreateTodo,
        })
        .subscribe({
          next: (payload) => {
            console.log("onCreate payload", payload);
            // setSubMessages((prev) => [...prev, todo]);
          },
          error: (error) => console.warn(error),
        })
    );

    subs.push(
      client.graphql({ query: subscription.onDeleteTodo }).subscribe({
        next: (payload) => {
          console.log("onDelete payload", payload);
        },
        error: (error) => console.warn(error),
      })
    );

    subs.push(
      client.graphql({ query: subscription.onUpdateTodo }).subscribe({
        next: (payload) => {
          console.log("onUpdate payload", payload);
        },
        error: (error) => console.warn(error),
      })
    );

    return () => subs.forEach((sub) => sub.unsubscribe());
  }, []);

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

    console.log("mutationResult", mutationResult);
    // // @ts-ignore
    // const createdTodo = mutationResult.data?.data?.createTodo!;
    // console.log("createdTodo", createdTodo);
    // setCurrentTodo(createdTodo);
    // return createdTodo;
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

    console.log("listResult", listResult);
  };

  const getTodo = async () => {
    if (!currentTodo) return;
    const queryResult = await client.graphql({
      query: queries.getTodo,
      variables: {
        id: currentTodo.id,
      },
    });

    console.log("queryResult", queryResult);
    // const fetchedTodo = queryResult.data?.getTodo!;

    // setCurrentTodo(fetchedTodo);
    // console.log("fetchedTodo", fetchedTodo);
    // return fetchedTodo;
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

    console.log("deleteResult", deleteResult);
    // const deletedTodo = deleteResult.data?.deleteTodo;

    // console.log("deletedTodo", deletedTodo);
    // setCurrentTodo(undefined);
    // return deletedTodo;
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

  // async function deleteAll(): Promise<boolean> {
  //   const response = await getTodos();

  //   console.log("first query:", response);

  //   // Delete all records:
  //   if (response) {
  //     await Promise.all(
  //       response?.map(async (todo: any) => {
  //         const deleteResponse = await client.graphql({
  //           query: mutations.deleteTodo,
  //           variables: {
  //             input: { id: todo.id },
  //           },
  //         });

  //         console.log("deletedTodo", deleteResponse.data?.deleteTodo);
  //       })
  //     );
  //   }

  //   // Verify all records have been deleted:
  //   const secondResponse = await getTodos();

  //   console.log("second query:", secondResponse);

  //   // @ts-ignore
  //   const allDeleted = secondResponse?.length === 0;

  //   console.log("allDeleted", allDeleted);

  //   setCurrentTodo(undefined);
  //   return allDeleted;
  // }

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
      {/* <button onClick={deleteAll} style={{ margin: ".5rem" }}>
        Delete All
      </button> */}
      <button onClick={() => setSubMessages([])} style={{ margin: ".5rem" }}>
        Clear subs
      </button>
      <pre style={{ border: "1px solid black", margin: ".5rem" }}>
        currentTodo: {JSON.stringify(currentTodo, null, 2)}
      </pre>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {/* <pre>todos: {JSON.stringify(todos, null, 2)}</pre> */}
        <pre>sub payloads: {JSON.stringify(subMessages, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
