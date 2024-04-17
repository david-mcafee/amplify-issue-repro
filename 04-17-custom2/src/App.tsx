// App.tsx

import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

export default function CustomList() {
  const invokeCustomQueryEcho = async () => {
    const { data, errors } = await client.queries.echo({
      content: "hey",
    });

    console.log("data:", data);
    console.log("errors:", errors);
  };

  return (
    <div>
      {/* <button onClick={refreshGroups}>Add new custom</button> */}
      <button onClick={invokeCustomQueryEcho}>invoke custom query</button>
    </div>
  );
}
