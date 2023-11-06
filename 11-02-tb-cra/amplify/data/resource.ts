import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Todo: a
    .model({
      name: a.string(),
      description: a.string(),
    })
    .authorization([a.allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({ schema });
