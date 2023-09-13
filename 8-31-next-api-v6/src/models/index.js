// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Todo, PostmanGetArgs, PostmanEcho } = initSchema(schema);

export {
  Todo,
  PostmanGetArgs,
  PostmanEcho
};