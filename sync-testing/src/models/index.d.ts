import { ModelInit, MutableModel, __modelMeta__, CompositeIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerNote = {
  readonly [__modelMeta__]: {
    identifier: CompositeIdentifier<Note, ['userd', 'sequence']>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly userd: string;
  readonly sequence: number;
  readonly noteType: string;
  readonly content?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyNote = {
  readonly [__modelMeta__]: {
    identifier: CompositeIdentifier<Note, ['userd', 'sequence']>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly userd: string;
  readonly sequence: number;
  readonly noteType: string;
  readonly content?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Note = LazyLoading extends LazyLoadingDisabled ? EagerNote : LazyNote

export declare const Note: (new (init: ModelInit<Note>) => Note) & {
  copyOf(source: Note, mutator: (draft: MutableModel<Note>) => MutableModel<Note> | void): Note;
}