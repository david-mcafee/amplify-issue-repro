import "./App.css";

import { generateClient, GraphQLQuery } from "aws-amplify/api";
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

  async function createTodoStringQuery() {
    const todoDetails = {
      name: `${Date.now()}`,
      description: `${Date.now()}`,
    };

    type MyTodoType = {
      createTodo: { name: string; description: string };
    };

    // now newTodo has the expected type and accessing `newTodo.data.createTodo` won't surface an error:
    const newTodo = await client.graphql<GraphQLQuery<MyTodoType>>({
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
     * Now we no longer get the following error:
     * `Property 'data' does not exist on type 'GraphQLResult<any> | GraphqlSubscriptionResult<any>'.
     *    Property 'data' does not exist on type 'GraphqlSubscriptionResult<any>'.`
     */
    console.log(newTodo.data.createTodo);
  }

  /**
   * Works, but there is an error on `query`:
   */
  async function createTodoGQLQuery() {
    const todoDetails = {
      name: `${Date.now()}`,
      description: `${Date.now()}`,
    };

    type MyTodoType = {
      createTodo: { name: string; description: string };
    };

    const newTodo = await client.graphql<GraphQLQuery<MyTodoType>>({
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
     * Now we no longer get the following error:
     * `Property 'data' does not exist on type 'GraphQLResult<any> | GraphqlSubscriptionResult<any>'.
     *    Property 'data' does not exist on type 'GraphqlSubscriptionResult<any>'.`
     */
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
