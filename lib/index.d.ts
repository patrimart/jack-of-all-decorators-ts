import * as jsonablesInterfaces from "./jsonables/interfaces";
import * as jsonablesSerializer from "./jsonables/Serializer";
import * as jsonablesAnnotations from "./jsonables/annotations";
export declare namespace Json {
    type IClassConfig = jsonablesInterfaces.IClassConfig;
    type ITransformerResponse<T, U> = jsonablesInterfaces.ITransformerResponse<T, U>;
    type ITransformer<T, U> = jsonablesInterfaces.ITransformer<T, U>;
    const transformers: {
        DefaultValue: <T, _>(value: T) => (value: T) => T;
        OverrideValue: <T, _>(value: T) => (value: T) => T;
        NotNullable: <T, _>(value: T) => T;
        IsRequired: <T, _>(value: T) => T;
        ToBoolean: (value: any) => boolean;
        ToString: (value: any) => string;
        ToNumber: (value: any) => number;
    };
    const Serializer: typeof jsonablesSerializer.Serializer;
    const Serializable: typeof jsonablesAnnotations.Serializable;
    const serializeProperty: typeof jsonablesAnnotations.serializeProperty;
    const serializeMethod: typeof jsonablesAnnotations.serializeMethod;
    const serializeParam: typeof jsonablesAnnotations.serializeParam;
}
import { defensiveCopy, memoize } from "./decorators/functions";
import { difference, differenceWith, filterTruthy, flatten, fromTuples, intersection, intersectionWith, mean, reverse, shuffle, sort, sum, takeWhile, union, unionWith, unique, uniqueWith, unzip, zip, xor, xorWith } from "./decorators/arrays";
export { defensiveCopy, memoize, difference, differenceWith, filterTruthy, flatten, fromTuples, intersection, intersectionWith, mean, reverse, shuffle, sort, sum, takeWhile, union, unionWith, unique, uniqueWith, unzip, zip, xor, xorWith };
