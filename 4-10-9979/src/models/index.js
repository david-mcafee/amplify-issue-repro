// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const TaskStatus = {
  "ACTIVE": "ACTIVE",
  "PICKED_UP": "PICKED_UP",
  "DROPPED_OFF": "DROPPED_OFF",
  "COMPLETED": "COMPLETED"
};

const { Task } = initSchema(schema);

export {
  Task,
  TaskStatus
};