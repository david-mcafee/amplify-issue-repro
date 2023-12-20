import { useEffect, useState } from "react";
import { ZenObservable } from "zen-observable-ts";
import { Amplify, API } from "aws-amplify";
// import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
import * as subscription from "./graphql/subscriptions";

import awsConfig from "./aws-exports";

Amplify.configure(awsConfig);

const subs: ZenObservable.Subscription[] = [];

function App() {
  const [subMessages, setSubMessages] = useState<any[]>([]);

  useEffect(() => {
    subs.push(
      API.graphql({
        query: subscription.onCreateTodo,
        // @ts-ignore
      }).subscribe({
        // @ts-ignore
        next: (payload) => {
          console.log("onCreate payload", payload);
        },
        // @ts-ignore
        error: (error) => console.warn(error),
      })
    );
    return () => subs.forEach((sub) => sub.unsubscribe());
  }, []);

  const createTodo = async () => {
    const mutationResult = await API.graphql({
      query: mutations.createTodo,
      variables: {
        input: {
          name: `Name ${Date.now()}`,
          description: `Description ${Date.now()}`,
        },
      },
    });

    console.log("mutationResult", mutationResult);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1 style={{ margin: ".5rem" }}>API V6 + Next Testing</h1>
      <button onClick={createTodo} style={{ margin: ".5rem" }}>
        Create Todo
      </button>
      <button onClick={() => setSubMessages([])} style={{ margin: ".5rem" }}>
        Clear subs
      </button>
      {/* <pre style={{ border: "1px solid black", margin: ".5rem" }}>
        currentTodo: {JSON.stringify(currentTodo, null, 2)}
      </pre> */}
      <div style={{ display: "flex", flexDirection: "row" }}>
        {/* <pre>todos: {JSON.stringify(todos, null, 2)}</pre> */}
        <pre>sub payloads: {JSON.stringify(subMessages, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
