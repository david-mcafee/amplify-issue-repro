# DataStore observe / observeQuery testing

## Schema

```graphql
# This "input" configures a global authorization rule to enable public access to
# all models in this schema. Learn more about authorization rules here: https://docs.amplify.aws/cli/graphql/authorization-rules
input AMPLIFY {
  globalAuthRule: AuthRule = { allow: public }
} # FOR TESTING ONLY!
# Project / Company
type Project @model {
  id: ID!
  name: String!
  description: String
  companies: [CompanyProject] @hasMany(indexName: "byProject", fields: ["id"])
}

type Company @model {
  id: ID!
  name: String!
  projects: [CompanyProject] @hasMany(indexName: "byCompany", fields: ["id"])
}

type CompanyProject @model {
  id: ID!
  company: Company @belongsTo(fields: ["companyId"])
  companyId: ID! @index(name: "byCompany")
  project: Project @belongsTo(fields: ["projectId"])
  projectId: ID! @index(name: "byProject")
  status: Status
}

enum Status {
  NO
  REVIEWING
  GREEN_LIT
}

# TODO
type Todo @model {
  id: ID!
  name: String!
  description: String
}
```
