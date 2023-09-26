import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum Status {
  NO = "NO",
  REVIEWING = "REVIEWING",
  GREEN_LIT = "GREEN_LIT"
}



type EagerProject = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Project, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly companies?: (CompanyProject | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProject = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Project, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly companies: AsyncCollection<CompanyProject>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Project = LazyLoading extends LazyLoadingDisabled ? EagerProject : LazyProject

export declare const Project: (new (init: ModelInit<Project>) => Project) & {
  copyOf(source: Project, mutator: (draft: MutableModel<Project>) => MutableModel<Project> | void): Project;
}

type EagerCompany = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Company, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly projects?: (CompanyProject | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCompany = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Company, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly projects: AsyncCollection<CompanyProject>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Company = LazyLoading extends LazyLoadingDisabled ? EagerCompany : LazyCompany

export declare const Company: (new (init: ModelInit<Company>) => Company) & {
  copyOf(source: Company, mutator: (draft: MutableModel<Company>) => MutableModel<Company> | void): Company;
}

type EagerCompanyProject = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CompanyProject, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly company?: Company | null;
  readonly companyId: string;
  readonly project?: Project | null;
  readonly projectId: string;
  readonly status?: Status | keyof typeof Status | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCompanyProject = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CompanyProject, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly company: AsyncItem<Company | undefined>;
  readonly companyId: string;
  readonly project: AsyncItem<Project | undefined>;
  readonly projectId: string;
  readonly status?: Status | keyof typeof Status | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CompanyProject = LazyLoading extends LazyLoadingDisabled ? EagerCompanyProject : LazyCompanyProject

export declare const CompanyProject: (new (init: ModelInit<CompanyProject>) => CompanyProject) & {
  copyOf(source: CompanyProject, mutator: (draft: MutableModel<CompanyProject>) => MutableModel<CompanyProject> | void): CompanyProject;
}

type EagerTodo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Todo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTodo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Todo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Todo = LazyLoading extends LazyLoadingDisabled ? EagerTodo : LazyTodo

export declare const Todo: (new (init: ModelInit<Todo>) => Todo) & {
  copyOf(source: Todo, mutator: (draft: MutableModel<Todo>) => MutableModel<Todo> | void): Todo;
}