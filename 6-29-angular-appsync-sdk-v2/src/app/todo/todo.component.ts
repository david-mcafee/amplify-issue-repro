// import { createTodoInput } from './../../graphql/inputs';
import { Component, OnInit } from '@angular/core';
import { AppsyncService } from '../appsync.service';
// import * as mutations from '../../graphql/mutations';
// import * as queries from '../../graphql/queries';
// import { APIService, Todo } from '../API.service';
import { buildMutation } from 'aws-appsync';
import gql from 'graphql-tag';
import { CreateTodoInput } from '../API.service';

// Import gql helper and craft a GraphQL query
const query = gql(`query ListTodos(
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
      __typename
    }
    nextToken
    __typename
  }
}`);

// Set up a subscription query
const subquery =
  gql(`subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
  onCreateTodo(filter: $filter) {
    id
    name
    description
    createdAt
    updatedAt
    __typename
  }
}`);

const createTodoInput = `input CreteTodoInput {
    id: ID
    name: String!
    description: String
  }`;

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  allTodos: any = [];
  constructor(private appsync: AppsyncService) {}

  ngOnInit() {
    // @ts-ignore
    this.appsync.funchc().then((client) => {
      // TODO: what's this?
      // const observable = client.watchQuery({
      //   query: listTodos,
      //   fetchPolicy: 'cache-and-network',
      // });

      // @ts-ignore
      // observable.subscribe(({ data }) => {
      //   this.allTodos = data.listTodos.items;
      // });

      //Now run a query
      client
        .query({ query: query })
        //client.query({ query: query, fetchPolicy: 'network-only' })   //Uncomment for AWS Lambda
        // @ts-ignore
        .then(function logData(data) {
          console.log('results of query: ', data);
        })
        .catch(console.error);

      const observable = client.subscribe({ query: subquery });

      // @ts-ignore
      const realtimeResults = function realtimeResults(data) {
        console.log('realtime data: ', data);
      };

      observable.subscribe({
        next: realtimeResults,
        complete: console.log,
        error: console.log,
      });
    });
  }

  async createTodo() {
    const todoName = `test ${Date.now()}`;
    if (todoName) {
      // NOTE: we wait for the client to be initialized prior to performing a mutation
      const client = await this.appsync.funchc();

      const result = await client.mutate(
        buildMutation(
          client,
          gql(`mutation CreateTodo(
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
          }`),
          {
            inputType: gql(createTodoInput),
            variables: {
              input: {
                name: `name ${Date.now()}`,
              },
            },
          },
          // tslint:disable-next-line: variable-name
          (_variables) => [query],
          'Todo'
        )
      );

      this.allTodos.push(result.data.createTodo);
    } // end of if
  }
}
