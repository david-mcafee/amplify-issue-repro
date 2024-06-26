import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rules below
specify that owners, authenticated via your Auth resource can "create",
"read", "update", and "delete" their own records. Public users,
authenticated via an API key, can only "read" records.
=========================================================================*/
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
      done: a.boolean(),
      priority: a.enum(['low', 'medium', 'high']),
    })
    .authorization([a.allow.public()]),
  Todo2: a
    .model({
      content: a.string(),
      done: a.boolean(),
      priority: a.enum(['low', 'medium', 'high']),
    })
    .authorization([a.allow.private('iam')]),
  Todo3: a
    .model({
      content: a.string(),
      description: a.string(),
      additionalInfo: a.hasOne('Note'),
    })
    .authorization([a.allow.public()]),
  Note: a
    .model({
      content: a.string(),
    })
    .authorization([a.allow.public().to(['create']), a.allow.owner()]),
  Todo4: a
    .model({
      content: a.string(),
      description: a.string(),
      additionalInfo: a.hasOne('Note4'),
    })
    .authorization([a.allow.public()]),
  Note4: a
    .model({
      content: a.string(),
    })
    .authorization([a.allow.private('iam')]),
  Customer: a.model({
    name: a.string(),
    phoneNumber: a.phone(),
    accountRepresentativeId: a.id().required()
  }).secondaryIndexes(index => [
    index('accountRepresentativeId')
  ])
   .authorization([a.allow.public()]),
  Customer2: a.model({
    name: a.string(),
    phoneNumber: a.phone(),
    accountRepresentative2Id: a.id().required()
  }).secondaryIndexes(index => [
    index('accountRepresentative2Id')
  ])
    .authorization([a.allow.private('iam')]),
  Customer4: a.model({
    name: a.string(),
    phoneNumber: a.phone(),
    accountRepresentative4Id: a.id().required(),
    additionalInfo: a.hasOne('Note4'),
  }).secondaryIndexes(index => [
    index('accountRepresentative4Id')
  ]).authorization([a.allow.public()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
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
