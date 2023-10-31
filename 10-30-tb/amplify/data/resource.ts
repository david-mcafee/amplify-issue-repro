// import { defineData } from "@aws-amplify/backend-graphql";
// import { type ClientSchema, a } from "@aws-amplify/amplify-api-next-alpha";

// const schema = a.schema({
//   Todo: a.model({
//     name: a.string(),
//     description: a.string(),
//     test: a.string(),
//   }),
// });

// export type Schema = ClientSchema<typeof schema>;

// export const data = defineData({ schema });

import { defineData } from "@aws-amplify/backend-graphql";
import { type ClientSchema, a } from "@aws-amplify/amplify-api-next-alpha";
import { Duration } from "aws-cdk-lib";
import { AuthorizationModes } from "@aws-amplify/graphql-api-construct";

const schema = a.schema({
  Post: a
    .model({
      title: a.string().required(),
      body: a.string().required(),
      link: a.url().required(),
      comments: a.hasMany("Comment").valueRequired().arrayRequired(),
    })
    .authorization([
      // a.allow.public(),
      a.allow.owner(),
      // a.allow.specificGroup("Admins").to(["read", "update", "delete"]),
      // a.allow.private("userPools").to(["read"]),
    ]),

  Comment: a
    .model({
      content: a.string().required(),
      post: a.belongsTo("Post"),
    })
    .authorization([
      // a.allow.public(),
      a.allow.owner(),
      // a.allow.specificGroup("Admins").to(["read", "update", "delete"]),
      // a.allow.private("userPools").to(["read"]),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

const authorizationModes: AuthorizationModes = {
  defaultAuthorizationMode: "AMAZON_COGNITO_USER_POOLS",
};

export const data = defineData({
  schema,
  authorizationModes,
});
