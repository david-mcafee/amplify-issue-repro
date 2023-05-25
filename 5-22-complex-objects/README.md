# 5/22 Complex Objects

https://docs.amplify.aws/lib/graphqlapi/advanced-workflows/q/platform/js/#complex-objects

https://github.com/david-mcafee/aws-amplify-graphql

## Schema:

```graphql
# This "input" configures a global authorization rule to enable public access to
# all models in this schema. Learn more about authorization rules here: https://docs.amplify.aws/cli/graphql/authorization-rules
input AMPLIFY {
  globalAuthRule: AuthRule = { allow: public }
} # FOR TESTING ONLY!
type Song @model {
  id: ID!
  name: String!
  covertArtKey: String
}
```
