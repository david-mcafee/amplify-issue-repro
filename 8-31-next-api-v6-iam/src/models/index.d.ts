import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";



type EagerPostmanGetArgs = {
  readonly key?: string | null;
}

type LazyPostmanGetArgs = {
  readonly key?: string | null;
}

export declare type PostmanGetArgs = LazyLoading extends LazyLoadingDisabled ? EagerPostmanGetArgs : LazyPostmanGetArgs

export declare const PostmanGetArgs: (new (init: ModelInit<PostmanGetArgs>) => PostmanGetArgs)

type EagerPostmanEcho = {
  readonly args?: PostmanGetArgs | null;
  readonly headers?: string | null;
  readonly url?: string | null;
}

type LazyPostmanEcho = {
  readonly args?: PostmanGetArgs | null;
  readonly headers?: string | null;
  readonly url?: string | null;
}

export declare type PostmanEcho = LazyLoading extends LazyLoadingDisabled ? EagerPostmanEcho : LazyPostmanEcho

export declare const PostmanEcho: (new (init: ModelInit<PostmanEcho>) => PostmanEcho)

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