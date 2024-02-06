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
    Model48: a.model({
      field1: a.string(),
    }),
    Model49: a.model({
      field1: a.string(),
    }),
    Model50: a.model({
      field1: a.string(),
    }),
    Model51: a.model({
      field1: a.string(),
    }),
    Model52: a.model({
      field1: a.string(),
    }),
    Model53: a.model({
      field1: a.string(),
    }),
    Model54: a.model({
      field1: a.string(),
    }),
    Model55: a.model({
      field1: a.string(),
    }),
    Model56: a.model({
      field1: a.string(),
    }),
    Model57: a.model({
      field1: a.string(),
    }),
    Model58: a.model({
      field1: a.string(),
    }),
    Model59: a.model({
      field1: a.string(),
    }),
    Model60: a.model({
      field1: a.string(),
    }),
    Model61: a.model({
      field1: a.string(),
    }),
    Model62: a.model({
      field1: a.string(),
    }),
    Model63: a.model({
      field1: a.string(),
    }),
    Model64: a.model({
      field1: a.string(),
    }),
    Model65: a.model({
      field1: a.string(),
    }),
    Model66: a.model({
      field1: a.string(),
    }),
    Model67: a.model({
      field1: a.string(),
    }),
    Model68: a.model({
      field1: a.string(),
    }),
    Model69: a.model({
      field1: a.string(),
    }),
    Model70: a.model({
      field1: a.string(),
    }),
    Model71: a.model({
      field1: a.string(),
    }),
    Model72: a.model({
      field1: a.string(),
    }),
    Model73: a.model({
      field1: a.string(),
    }),
    Model74: a.model({
      field1: a.string(),
    }),
    Model75: a.model({
      field1: a.string(),
    }),
    Model76: a.model({
      field1: a.string(),
    }),
    Model77: a.model({
      field1: a.string(),
    }),
    Model78: a.model({
      field1: a.string(),
    }),
    Model79: a.model({
      field1: a.string(),
    }),
    Model80: a.model({
      field1: a.string(),
    }),
    Model81: a.model({
      field1: a.string(),
    }),
    Model82: a.model({
      field1: a.string(),
    }),
    Model83: a.model({
      field1: a.string(),
    }),
    Model84: a.model({
      field1: a.string(),
    }),
    Model85: a.model({
      field1: a.string(),
    }),
    Model86: a.model({
      field1: a.string(),
    }),
    Model87: a.model({
      field1: a.string(),
    }),
    Model88: a.model({
      field1: a.string(),
    }),
    Model89: a.model({
      field1: a.string(),
    }),
    Model90: a.model({
      field1: a.string(),
    }),
    Model91: a.model({
      field1: a.string(),
    }),
    Model92: a.model({
      field1: a.string(),
    }),
    Model93: a.model({
      field1: a.string(),
    }),
    Model94: a.model({
      field1: a.string(),
    }),
    Model95: a.model({
      field1: a.string(),
    }),
    Model96: a.model({
      field1: a.string(),
    }),
    Model97: a.model({
      field1: a.string(),
    }),
    Model98: a.model({
      field1: a.string(),
    }),
    Model99: a.model({
      field1: a.string(),
    }),
    Model100: a.model({
      field1: a.string(),
    }),
    Model101: a.model({
      field1: a.string(),
    }),
    Model102: a.model({
      field1: a.string(),
    }),
    Model103: a.model({
      field1: a.string(),
    }),
    Model104: a.model({
      field1: a.string(),
    }),
    Model105: a.model({
      field1: a.string(),
    }),
    Model106: a.model({
      field1: a.string(),
    }),
    Model107: a.model({
      field1: a.string(),
    }),
    Model108: a.model({
      field1: a.string(),
    }),
    Model109: a.model({
      field1: a.string(),
    }),
    Model110: a.model({
      field1: a.string(),
    }),
    Model111: a.model({
      field1: a.string(),
    }),
    Model112: a.model({
      field1: a.string(),
    }),
    Model113: a.model({
      field1: a.string(),
    }),
    Model114: a.model({
      field1: a.string(),
    }),
    Model115: a.model({
      field1: a.string(),
    }),
    Model116: a.model({
      field1: a.string(),
    }),
    Model117: a.model({
      field1: a.string(),
    }),
    Model118: a.model({
      field1: a.string(),
    }),
    Model119: a.model({
      field1: a.string(),
    }),
    Model120: a.model({
      field1: a.string(),
    }),
    Model121: a.model({
      field1: a.string(),
    }),
    Model122: a.model({
      field1: a.string(),
    }),
    Model123: a.model({
      field1: a.string(),
    }),
    Model124: a.model({
      field1: a.string(),
    }),
    Model125: a.model({
      field1: a.string(),
    }),
    Model126: a.model({
      field1: a.string(),
    }),
    Model127: a.model({
      field1: a.string(),
    }),
    Model128: a.model({
      field1: a.string(),
    }),
    Model129: a.model({
      field1: a.string(),
    }),
    Model130: a.model({
      field1: a.string(),
    }),
    Model131: a.model({
      field1: a.string(),
    }),
    Model132: a.model({
      field1: a.string(),
    }),
    Model133: a.model({
      field1: a.string(),
    }),
    Model134: a.model({
      field1: a.string(),
    }),
    Model135: a.model({
      field1: a.string(),
    }),
    Model136: a.model({
      field1: a.string(),
    }),
    Model137: a.model({
      field1: a.string(),
    }),
    Model138: a.model({
      field1: a.string(),
    }),
    Model139: a.model({
      field1: a.string(),
    }),
    Model140: a.model({
      field1: a.string(),
    }),
    Model141: a.model({
      field1: a.string(),
    }),
    Model142: a.model({
      field1: a.string(),
    }),
    Model143: a.model({
      field1: a.string(),
    }),
    Model144: a.model({
      field1: a.string(),
    }),
    Model145: a.model({
      field1: a.string(),
    }),
    Model146: a.model({
      field1: a.string(),
    }),
    Model147: a.model({
      field1: a.string(),
    }),
    Model148: a.model({
      field1: a.string(),
    }),
    Model149: a.model({
      field1: a.string(),
    }),
    Model150: a.model({
      field1: a.string(),
    }),
    Model151: a.model({
      field1: a.string(),
    }),
    Model152: a.model({
      field1: a.string(),
    }),
    Model153: a.model({
      field1: a.string(),
    }),
    Model154: a.model({
      field1: a.string(),
    }),
    Model155: a.model({
      field1: a.string(),
    }),
    Model156: a.model({
      field1: a.string(),
    }),
    Model157: a.model({
      field1: a.string(),
    }),
    Model158: a.model({
      field1: a.string(),
    }),
    Model159: a.model({
      field1: a.string(),
    }),
    Model160: a.model({
      field1: a.string(),
    }),
    Model161: a.model({
      field1: a.string(),
    }),
    Model162: a.model({
      field1: a.string(),
    }),
    Model163: a.model({
      field1: a.string(),
    }),
    Model164: a.model({
      field1: a.string(),
    }),
    Model165: a.model({
      field1: a.string(),
    }),
    Model166: a.model({
      field1: a.string(),
    }),
    Model167: a.model({
      field1: a.string(),
    }),
    Model168: a.model({
      field1: a.string(),
    }),
    Model169: a.model({
      field1: a.string(),
    }),
    Model170: a.model({
      field1: a.string(),
    }),
    Model171: a.model({
      field1: a.string(),
    }),
    Model172: a.model({
      field1: a.string(),
    }),
    Model173: a.model({
      field1: a.string(),
    }),
    Model174: a.model({
      field1: a.string(),
    }),
    Model175: a.model({
      field1: a.string(),
    }),
    Model176: a.model({
      field1: a.string(),
    }),
    Model177: a.model({
      field1: a.string(),
    }),
    Model178: a.model({
      field1: a.string(),
    }),
    Model179: a.model({
      field1: a.string(),
    }),
    Model180: a.model({
      field1: a.string(),
    }),
    Model181: a.model({
      field1: a.string(),
    }),
    Model182: a.model({
      field1: a.string(),
    }),
    Model183: a.model({
      field1: a.string(),
    }),
    Model184: a.model({
      field1: a.string(),
    }),
    Model185: a.model({
      field1: a.string(),
    }),
    Model186: a.model({
      field1: a.string(),
    }),
    Model187: a.model({
      field1: a.string(),
    }),
    Model188: a.model({
      field1: a.string(),
    }),
    Model189: a.model({
      field1: a.string(),
    }),
    Model190: a.model({
      field1: a.string(),
    }),
    Model191: a.model({
      field1: a.string(),
    }),
    Model192: a.model({
      field1: a.string(),
    }),
    Model193: a.model({
      field1: a.string(),
    }),
    Model194: a.model({
      field1: a.string(),
    }),
    Model195: a.model({
      field1: a.string(),
    }),
    Model196: a.model({
      field1: a.string(),
    }),
    Model197: a.model({
      field1: a.string(),
    }),
    Model198: a.model({
      field1: a.string(),
    }),
    Model199: a.model({
      field1: a.string(),
    }),
    Model200: a.model({
      field1: a.string(),
    }),
  })
  .authorization([a.allow.public()]);

//@ts-ignore
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
