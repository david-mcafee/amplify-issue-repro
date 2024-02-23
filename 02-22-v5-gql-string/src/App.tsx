import "./App.css";

import { generateClient } from "aws-amplify/api";
import * as mutations from "./graphql/mutations";
import gql from "graphql-tag";

const client = generateClient();

function App() {
  // Works as expected:
  async function createTodoGeneratedQuery() {
    const todoDetails = {
      name: `${Date.now()}`,
      description: `${Date.now()}`,
    };

    const newTodo = await client.graphql({
      query: mutations.createTodo,
      variables: { input: todoDetails },
    });

    console.log(newTodo.data.createTodo);
  }

  // Works, but with TS error on result:
  async function createTodoStringQuery() {
    const todoDetails = {
      name: `${Date.now()}`,
      description: `${Date.now()}`,
    };

    const newTodo = await client.graphql({
      query: `mutation CreateTodo(
        $input: CreateTodoInput!
        $condition: ModelTodoConditionInput
      ) {
        createTodo(input: $input, condition: $condition) {
          id
          name
          description
          createdAt
          updatedAt
          __typename
        }
      }
      `,
      variables: { input: todoDetails },
    });

    /**
     * `Property 'data' does not exist on type 'GraphQLResult<any> | GraphqlSubscriptionResult<any>'.
     *    Property 'data' does not exist on type 'GraphqlSubscriptionResult<any>'.`
     */
    // @ts-expect-error - see above
    console.log(newTodo.data.createTodo);
  }

  /**
   * Works, but there are two TS errors:
   * 1. Error on `query` (see below)
   * 2. Error on result (see below)
   */
  async function createTodoGQLQuery() {
    const todoDetails = {
      name: `${Date.now()}`,
      description: `${Date.now()}`,
    };

    const newTodo = await client.graphql({
      //@ts-expect-error - `Type 'DocumentNode' is not assignable to type 'string | DocumentNode'.`
      query: gql`
        mutation CreateTodo(
          $input: CreateTodoInput!
          $condition: ModelTodoConditionInput
        ) {
          createTodo(input: $input, condition: $condition) {
            id
            name
            description
            createdAt
            updatedAt
            __typename
          }
        }
      `,
      variables: { input: todoDetails },
    });

    /**
     * `Property 'data' does not exist on type 'GraphQLResult<any> | GraphqlSubscriptionResult<any>'.
     *    Property 'data' does not exist on type 'GraphqlSubscriptionResult<any>'.`
     */
    // @ts-expect-error - see above
    console.log(newTodo.data.createTodo);
  }

  return (
    <>
      <button onClick={createTodoGeneratedQuery}>
        create (generated query)
      </button>
      <button onClick={createTodoStringQuery}>create (string query)</button>
      <button onClick={createTodoGQLQuery}>create (GQL query)</button>
    </>
  );
}

export default App;
