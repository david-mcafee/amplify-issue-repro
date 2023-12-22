import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerHabit = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Habit, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly count: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyHabit = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Habit, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly count: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Habit = LazyLoading extends LazyLoadingDisabled ? EagerHabit : LazyHabit

export declare const Habit: (new (init: ModelInit<Habit>) => Habit) & {
  copyOf(source: Habit, mutator: (draft: MutableModel<Habit>) => MutableModel<Habit> | void): Habit;
}