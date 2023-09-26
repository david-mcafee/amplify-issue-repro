// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Status = {
  "NO": "NO",
  "REVIEWING": "REVIEWING",
  "GREEN_LIT": "GREEN_LIT"
};

const { Project, Company, CompanyProject, Todo } = initSchema(schema);

export {
  Project,
  Company,
  CompanyProject,
  Todo,
  Status
};