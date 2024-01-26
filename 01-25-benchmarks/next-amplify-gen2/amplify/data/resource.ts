import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rules below
specify that owners, authenticated via your Auth resource can "create",
"read", "update", and "delete" their own records. Public users,
authenticated via an API key, can only "read" records.
=========================================================================*/
const schema = a
  .schema({
    Model1: a.model({
      field1: a.string(),
    }),
    Model2: a.model({
      field1: a.string(),
    }),
    Model3: a.model({
      field1: a.string(),
    }),
    Model4: a.model({
      field1: a.string(),
    }),
    Model5: a.model({
      field1: a.string(),
    }),
    Model6: a.model({
      field1: a.string(),
    }),
    Model7: a.model({
      field1: a.string(),
    }),
    Model8: a.model({
      field1: a.string(),
    }),
    Model9: a.model({
      field1: a.string(),
    }),
    Model10: a.model({
      field1: a.string(),
    }),
    Model11: a.model({
      field1: a.string(),
    }),
    Model12: a.model({
      field1: a.string(),
    }),
    Model13: a.model({
      field1: a.string(),
    }),
    Model14: a.model({
      field1: a.string(),
    }),
    Model15: a.model({
      field1: a.string(),
    }),
    Model16: a.model({
      field1: a.string(),
    }),
    Model17: a.model({
      field1: a.string(),
    }),
    Model18: a.model({
      field1: a.string(),
    }),
    Model19: a.model({
      field1: a.string(),
    }),
    Model20: a.model({
      field1: a.string(),
    }),
    Model21: a.model({
      field1: a.string(),
    }),
    Model22: a.model({
      field1: a.string(),
    }),
    Model23: a.model({
      field1: a.string(),
    }),
    Model24: a.model({
      field1: a.string(),
    }),
    Model25: a.model({
      field1: a.string(),
    }),
    Model26: a.model({
      field1: a.string(),
    }),
    Model27: a.model({
      field1: a.string(),
    }),
    Model28: a.model({
      field1: a.string(),
    }),
    Model29: a.model({
      field1: a.string(),
    }),
    Model30: a.model({
      field1: a.string(),
    }),
    Model31: a.model({
      field1: a.string(),
    }),
    Model32: a.model({
      field1: a.string(),
    }),
    Model33: a.model({
      field1: a.string(),
    }),
    Model34: a.model({
      field1: a.string(),
    }),
    Model35: a.model({
      field1: a.string(),
    }),
    Model36: a.model({
      field1: a.string(),
    }),
    Model37: a.model({
      field1: a.string(),
    }),
    Model38: a.model({
      field1: a.string(),
    }),
    Model39: a.model({
      field1: a.string(),
    }),
    Model40: a.model({
      field1: a.string(),
    }),
    Model41: a.model({
      field1: a.string(),
    }),
    Model42: a.model({
      field1: a.string(),
    }),
    Model43: a.model({
      field1: a.string(),
    }),
    Model44: a.model({
      field1: a.string(),
    }),
    Model45: a.model({
      field1: a.string(),
    }),
    Model46: a.model({
      field1: a.string(),
    }),
    Model47: a.model({
      field1: a.string(),
    }),
  })
  .authorization([a.allow.public()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
