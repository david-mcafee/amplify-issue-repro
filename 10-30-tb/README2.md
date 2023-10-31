# 10-30-tb

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
npm create amplify
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

# Next.js README:

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
