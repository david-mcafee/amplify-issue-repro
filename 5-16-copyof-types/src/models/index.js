// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Todo, Todo2 } = initSchema(schema);

export {
  Todo,
  Todo2
};