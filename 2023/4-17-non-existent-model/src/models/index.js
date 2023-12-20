// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Todo, IDoNotExist } = initSchema(schema);

export {
  Todo,
  IDoNotExist
};