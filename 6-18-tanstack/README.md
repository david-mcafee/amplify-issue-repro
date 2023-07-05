# TanStack Query + GraphQL API Optimistic UI Sample App

## Schema:

```graphql
type RealEstateProperty @model @auth(rules: [{ allow: public }]) {
  id: ID!
  name: String!
  address: String
}
```
