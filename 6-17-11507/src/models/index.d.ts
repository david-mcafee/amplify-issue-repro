import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerUpload = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Upload, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly datetime: string;
  readonly name: string;
  readonly status: number;
  readonly type: number[];
  readonly uploadCount: number;
  readonly processCount: number;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUpload = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Upload, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly datetime: string;
  readonly name: string;
  readonly status: number;
  readonly type: number[];
  readonly uploadCount: number;
  readonly processCount: number;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Upload = LazyLoading extends LazyLoadingDisabled ? EagerUpload : LazyUpload

export declare const Upload: (new (init: ModelInit<Upload>) => Upload) & {
  copyOf(source: Upload, mutator: (draft: MutableModel<Upload>) => MutableModel<Upload> | void): Upload;
}