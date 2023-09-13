import React from "react";
import "./App.css";
import { Amplify } from "aws-amplify";
// import { post, cancel } from "@aws-amplify/api-rest";
// import { fetchAuthSession } from "aws-amplify/auth";

Amplify.configure({
  Auth: {
    Cognito: {
      identityPoolId: "us-east-1:4c9aa262-0efa-4014-adc8-d376a3f46a8b",
      allowGuestAccess: true,
    },
  },
});

function App() {
  let apiPromise;
  return (
    <div className="App">
      <button onClick={invokeAPI}>post method</button>
      <button onClick={cancelAPI}>cancel request</button>
      <button
        onClick={() => {
          //   fetchAuthSession();
        }}
      >
        FetchSession
      </button>
    </div>
  );

  async function invokeAPI() {
    // apiPromise = post(
    //   "https://j4ajguxwki.execute-api.us-east-1.amazonaws.com/dev/items",
    //   {
    //     body: { test: 1 },
    //     headers: {},
    //   }
    // );

    const result = await apiPromise;

    alert(JSON.stringify(result, null, 2));
  }

  async function cancelAPI() {
    if (apiPromise) {
      //   const isCancelled = await cancel(apiPromise, "stop this please");
      //   console.log(`isCancelled: ${isCancelled}`);
    }
  }
}

export default App;
