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
    Todo: a
      .model({
        todoId: a.id().required(),
        status: a.string().required(),
        content: a.string(),
      })
      .identifier(["todoId", "status"]),
    Todo3: a
      .model({
        status: a.id().required(),
        content: a.string(),
      })
      .secondaryIndexes((index) => [index("status")]),
    // widget: a
    //   .model({
    //     title: a.string().required(),
    //     description: a.string().required(),
    //     timestamp: a.integer().required(),
    //   })
    //   .identifier(["title"])
    //   .secondaryIndexes((index) => [
    //     index("title")
    //       .name("myGSI")
    //       .sortKeys(["description", "timestamp"])
    //       .queryField("byTitleDescTs"),
    //   ]),
    AnotherOne: a
      .model({
        title: a.string().required(),
      })
      .secondaryIndexes((index) => [index("title")]),
    Post: a.model({
      title: a.string().required(),
      comments: a.hasMany("Comment"),
    }),
    Comment: a
      .model({
        content: a.string(),
        postID: a.id(),
      })
      .secondaryIndexes((index) => [
        index("postID")
          .name("byPost")
          .sortKeys(["content"])
          .queryField("commentsByPostIDByContent"),
      ]),
    Todo4: a
      .model({
        todoId: a.id().required(),
        status: a.string().required(),
        content: a.string(),
      })
      .identifier(["todoId", "status"]),
    Customer: a
      .model({
        name: a.string(),
        accountRepresentativeId: a.id().required(),
      })
      .secondaryIndexes((index) => [
        index("accountRepresentativeId").sortKeys(["name"]),
      ]),
  })
  .authorization([a.allow.public()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 365,
    },
  },
});

// Todo: a.model({
//   todoId: a.id().required(),
//   status: a.string().required(),
//   content: a.string(),
// }).identifier(["todoId", "status"]);

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
