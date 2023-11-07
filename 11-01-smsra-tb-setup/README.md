# SMSRA-TB-SETUP

## Setup:

1. Create a Next.js app:

```bash
npx create-next-app

# `cd` into app directory
```

2. **Downgrade `Next` to `13.5.4`**

3. Get started with Samsara:

```bash
# The following will pull in all the latest dependencies you'll need.
npx create-amplify@latest

# To deploy it to a Sandbox, you'll need to run
npx amplify sandbox
```

3. If you run into `The given region has not been bootstrapped. Sign in to console as a Root user or Admin to complete the bootstrap process and re-run the amplify sandbox command.`, use the following command:

```bash
npx cdk@latest bootstrap aws://[account id]/[account region]
```

4. **Add `package.json` to `amplify` folder, set `"type": "module"`.**

5. Configure Amplify with `amplifyconfiguration.json`: `const config = require("../../amplifyconfiguration.json");`

6. Update schema to use API key auth:

The default auth mode with Samsara is Cognito. You can override it to API key by adding the following to your TB schema file:

```typescript
import { Duration } from "aws-cdk-lib";

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "API_KEY",
    apiKeyConfig: {
      expires: Duration.days(30),
      description: "my api key",
    },
  },
});
```

7. Edit your TB schema in `amplify/data/resource.ts`.

## CRA-specific instructions:

`npx amplify sandbox --out-dir src/`
or
`pushd src && ln -s ../amplifyconfiguration.json amplifyconfiguration.json && popd`

## SyntaxError: The requested module '@aws-amplify/backend' does not provide an export named 'Backend'

```typescript
import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource.js";
import { data } from "./data/resource.js";

const backend = defineBackend({
  auth,
  data,
});
```

## Schema:

```typescript
const schema = a.schema({
  Todo: a
    .model({
      name: a.string(),
      description: a.string(),
    })
    .authorization([a.allow.owner()]),
});
```

8. Local dev:

```bash
cd /Users/mcafd/workplace/origin/amplify-js && yarn clean && git clean -xdf && yarn setup-dev && cd /Users/mcafd/workplace/origin/amplify-api-next/packages/amplify-api-next-types && yarn && yarn link && cd /Users/mcafd/workplace/origin/amplify-api-next/packages/amplify-api-next && yarn && yarn link "@aws-amplify/amplify-api-next-types-alpha" && yarn link && cd /Users/mcafd/workplace/origin/amplify-js/packages/api-graphql && yarn link "@aws-amplify/amplify-api-next-types-alpha" && yarn link "@aws-amplify/amplify-api-next-alpha" && cd /Users/mcafd/workplace/amplify-issue-repro/11-02-tb-cra && rm -rf node_modules && yarn && yarn link @aws-amplify/core @aws-amplify/api-rest @aws-amplify/api-graphql @aws-amplify/api @aws-amplify/amplify-api-next-types-alpha @aws-amplify/amplify-api-next-alpha aws-amplify && yarn start
```
