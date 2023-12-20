import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

type TodoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type Todo2MetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerTodo = {
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTodo = {
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Todo = LazyLoading extends LazyLoadingDisabled ? EagerTodo : LazyTodo

export declare const Todo: (new (init: ModelInit<Todo, TodoMetaData>) => Todo) & {
  copyOf(source: Todo, mutator: (draft: MutableModel<Todo, TodoMetaData>) => MutableModel<Todo, TodoMetaData> | void): Todo;
}

type EagerTodo2 = {
  readonly id: string;
  readonly name?: (string | null)[] | null;
  readonly description?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTodo2 = {
  readonly id: string;
  readonly name?: (string | null)[] | null;
  readonly description?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Todo2 = LazyLoading extends LazyLoadingDisabled ? EagerTodo2 : LazyTodo2

export declare const Todo2: (new (init: ModelInit<Todo2, Todo2MetaData>) => Todo2) & {
  copyOf(source: Todo2, mutator: (draft: MutableModel<Todo2, Todo2MetaData>) => MutableModel<Todo2, Todo2MetaData> | void): Todo2;
}