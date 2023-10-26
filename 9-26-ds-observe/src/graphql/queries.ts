/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getProject = /* GraphQL */ `query GetProject($id: ID!) {
  getProject(id: $id) {
    id
    name
    description
    companies {
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetProjectQueryVariables,
  APITypes.GetProjectQuery
>;
export const listProjects = /* GraphQL */ `query ListProjects(
  $filter: ModelProjectFilterInput
  $limit: Int
  $nextToken: String
) {
  listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListProjectsQueryVariables,
  APITypes.ListProjectsQuery
>;
export const syncProjects = /* GraphQL */ `query SyncProjects(
  $filter: ModelProjectFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncProjects(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      name
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncProjectsQueryVariables,
  APITypes.SyncProjectsQuery
>;
export const getCompany = /* GraphQL */ `query GetCompany($id: ID!) {
  getCompany(id: $id) {
    id
    name
    projects {
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCompanyQueryVariables,
  APITypes.GetCompanyQuery
>;
export const listCompanies = /* GraphQL */ `query ListCompanies(
  $filter: ModelCompanyFilterInput
  $limit: Int
  $nextToken: String
) {
  listCompanies(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCompaniesQueryVariables,
  APITypes.ListCompaniesQuery
>;
export const syncCompanies = /* GraphQL */ `query SyncCompanies(
  $filter: ModelCompanyFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncCompanies(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      name
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncCompaniesQueryVariables,
  APITypes.SyncCompaniesQuery
>;
export const getCompanyProject = /* GraphQL */ `query GetCompanyProject($id: ID!) {
  getCompanyProject(id: $id) {
    id
    company {
      id
      name
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    companyId
    project {
      id
      name
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    projectId
    status
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCompanyProjectQueryVariables,
  APITypes.GetCompanyProjectQuery
>;
export const listCompanyProjects = /* GraphQL */ `query ListCompanyProjects(
  $filter: ModelCompanyProjectFilterInput
  $limit: Int
  $nextToken: String
) {
  listCompanyProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      companyId
      projectId
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCompanyProjectsQueryVariables,
  APITypes.ListCompanyProjectsQuery
>;
export const syncCompanyProjects = /* GraphQL */ `query SyncCompanyProjects(
  $filter: ModelCompanyProjectFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncCompanyProjects(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      companyId
      projectId
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncCompanyProjectsQueryVariables,
  APITypes.SyncCompanyProjectsQuery
>;
export const getTodo = /* GraphQL */ `query GetTodo($id: ID!) {
  getTodo(id: $id) {
    id
    name
    description
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTodoQueryVariables, APITypes.GetTodoQuery>;
export const listTodos = /* GraphQL */ `query ListTodos(
  $filter: ModelTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.ListTodosQueryVariables, APITypes.ListTodosQuery>;
export const syncTodos = /* GraphQL */ `query SyncTodos(
  $filter: ModelTodoFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncTodos(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      name
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.SyncTodosQueryVariables, APITypes.SyncTodosQuery>;
export const companyProjectsByCompanyId = /* GraphQL */ `query CompanyProjectsByCompanyId(
  $companyId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelCompanyProjectFilterInput
  $limit: Int
  $nextToken: String
) {
  companyProjectsByCompanyId(
    companyId: $companyId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      companyId
      projectId
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.CompanyProjectsByCompanyIdQueryVariables,
  APITypes.CompanyProjectsByCompanyIdQuery
>;
export const companyProjectsByProjectId = /* GraphQL */ `query CompanyProjectsByProjectId(
  $projectId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelCompanyProjectFilterInput
  $limit: Int
  $nextToken: String
) {
  companyProjectsByProjectId(
    projectId: $projectId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      companyId
      projectId
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.CompanyProjectsByProjectIdQueryVariables,
  APITypes.CompanyProjectsByProjectIdQuery
>;
