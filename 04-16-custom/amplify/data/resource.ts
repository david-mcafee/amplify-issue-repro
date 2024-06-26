import {
  type ClientSchema,
  a,
  defineData,
  defineFunction,
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
  echo1: a
    .query()
    .arguments({ content: a.string().required() })
    .handler(a.handler.function(echoHandler))
    .authorization([a.allow.public()])
    .returns(a.ref("EchoResponse").required()),
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
