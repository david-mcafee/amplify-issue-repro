/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createProject = /* GraphQL */ `mutation CreateProject(
  $input: CreateProjectInput!
  $condition: ModelProjectConditionInput
) {
  createProject(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateProjectMutationVariables,
  APITypes.CreateProjectMutation
>;
export const updateProject = /* GraphQL */ `mutation UpdateProject(
  $input: UpdateProjectInput!
  $condition: ModelProjectConditionInput
) {
  updateProject(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateProjectMutationVariables,
  APITypes.UpdateProjectMutation
>;
export const deleteProject = /* GraphQL */ `mutation DeleteProject(
  $input: DeleteProjectInput!
  $condition: ModelProjectConditionInput
) {
  deleteProject(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteProjectMutationVariables,
  APITypes.DeleteProjectMutation
>;
export const createCompany = /* GraphQL */ `mutation CreateCompany(
  $input: CreateCompanyInput!
  $condition: ModelCompanyConditionInput
) {
  createCompany(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateCompanyMutationVariables,
  APITypes.CreateCompanyMutation
>;
export const updateCompany = /* GraphQL */ `mutation UpdateCompany(
  $input: UpdateCompanyInput!
  $condition: ModelCompanyConditionInput
) {
  updateCompany(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateCompanyMutationVariables,
  APITypes.UpdateCompanyMutation
>;
export const deleteCompany = /* GraphQL */ `mutation DeleteCompany(
  $input: DeleteCompanyInput!
  $condition: ModelCompanyConditionInput
) {
  deleteCompany(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteCompanyMutationVariables,
  APITypes.DeleteCompanyMutation
>;
export const createCompanyProject = /* GraphQL */ `mutation CreateCompanyProject(
  $input: CreateCompanyProjectInput!
  $condition: ModelCompanyProjectConditionInput
) {
  createCompanyProject(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateCompanyProjectMutationVariables,
  APITypes.CreateCompanyProjectMutation
>;
export const updateCompanyProject = /* GraphQL */ `mutation UpdateCompanyProject(
  $input: UpdateCompanyProjectInput!
  $condition: ModelCompanyProjectConditionInput
) {
  updateCompanyProject(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateCompanyProjectMutationVariables,
  APITypes.UpdateCompanyProjectMutation
>;
export const deleteCompanyProject = /* GraphQL */ `mutation DeleteCompanyProject(
  $input: DeleteCompanyProjectInput!
  $condition: ModelCompanyProjectConditionInput
) {
  deleteCompanyProject(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteCompanyProjectMutationVariables,
  APITypes.DeleteCompanyProjectMutation
>;
export const createTodo = /* GraphQL */ `mutation CreateTodo(
  $input: CreateTodoInput!
  $condition: ModelTodoConditionInput
) {
  createTodo(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateTodoMutationVariables,
  APITypes.CreateTodoMutation
>;
export const updateTodo = /* GraphQL */ `mutation UpdateTodo(
  $input: UpdateTodoInput!
  $condition: ModelTodoConditionInput
) {
  updateTodo(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateTodoMutationVariables,
  APITypes.UpdateTodoMutation
>;
export const deleteTodo = /* GraphQL */ `mutation DeleteTodo(
  $input: DeleteTodoInput!
  $condition: ModelTodoConditionInput
) {
  deleteTodo(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteTodoMutationVariables,
  APITypes.DeleteTodoMutation
>;
