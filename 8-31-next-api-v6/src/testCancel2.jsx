function App() {
  let apiPromise;
  return (
    <div className="App">
      <button onClick={invokeAPI}>post method</button>
      <button onClick={subscribeAPI}>Subscribe</button>
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

  function subscribeAPI() {
    GraphQLAPI.graphql({ query: onCreateTodo }).subscribe((data) => {
      console.log(JSON.stringify(data, null, 2));
    });
  }

  async function invokeAPI() {
    apiPromise = post(
      "https://j4ajguxwki.execute-api.us-east-1.amazonaws.com/dev/items",
      {
        body: { test: 1 },
        headers: {},
      }
    );
    try {
      const result = await apiPromise;
      alert(JSON.stringify(result, null, 2));
    } catch (err) {
      const isCancelled = isCancel(err);
      console.log(`from invokeAPI isCancelled: ${isCancelled}`);
    }
  }

  async function cancelAPI() {
    if (apiPromise) {
      const isCancelled = await cancel(apiPromise, "stop this please");
      console.log(`from cancelAPI isCancelled: ${isCancelled}`);
    }
  }
}

export default App;
