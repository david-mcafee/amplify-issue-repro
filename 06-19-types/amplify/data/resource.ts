import { a, defineData, type ClientSchema } from "@aws-amplify/backend";

const platformList = ["TEST1", "TEST2", "TEST3"];

const schema = a
  .schema({
    Todo: a.model({
      title: a.string(),
    }),
    Todo2: a.model({
      name: a.string(),
    }),
    Platform: a.enum(platformList),
    Category: a
      .model({
        name: a.string().required(),
        platform: a.ref("Platform").required(),
        content: a.string(),
        s3ImgKey: a.string(),
      })
      .secondaryIndexes((index) => [
        index("platform").queryField("listByPlatform"),
      ]),
  })
  .authorization((allow) => [allow.publicApiKey()]);

// Used for code completion / highlighting when making requests from frontend
export type Schema = ClientSchema<typeof schema>;

// defines the data resource to be deployed
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: { expiresInDays: 365 },
  },
});
