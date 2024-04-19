import {
  type ClientSchema,
  a,
  defineData,
  defineFunction, // 1.Import "defineFunction" to create new functions
} from "@aws-amplify/backend";

// 2. define a function
const echoHandler = defineFunction({
  entry: "./echo-handler/handler.ts",
});

const schema = a.schema({
  EchoResponse: a.customType({
    content: a.string(),
    executionDuration: a.float(),
  }),

  echo: a
    .query()
    .arguments({ content: a.string(), whatever: a.string() })
    .returns(a.ref("EchoResponse"))
    .authorization([a.allow.public()])
    // 3. set the function has the handler
    .handler(a.handler.function(echoHandler)),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
