import {
  a,
  defineData,
  type ClientSchema,
  defineFunction,
} from "@aws-amplify/backend";

// 2. define a function
const echoHandler = defineFunction({
  entry: "./echo-handler/handler.ts",
});

const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
      isDone: a.boolean(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  // 1. Define your return type as a custom type
  EchoResponse: a.customType({
    content: a.string(),
    executionDuration: a.float(),
  }),

  // 2. Define your query with the return type and, optionally, arguments
  echo: a
    .query()
    // arguments that this query accepts
    .arguments({
      content: a.string(),
    })
    // return type of the query
    .returns(a.ref("EchoResponse"))
    // only allow signed-in users to call this API
    .authorization((allow) => [allow.publicApiKey()])
    // 3. set the function has the handler
    .handler(a.handler.function(echoHandler)),
});

// Used for code completion / highlighting when making requests from frontend
export type Schema = ClientSchema<typeof schema>;

// defines the data resource to be deployed
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: { expiresInDays: 30 },
  },
});
