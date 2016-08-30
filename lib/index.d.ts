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
import { curry, defensiveCopy, debounce, defer, delay, memoize, partial, throttle, tryCatch } from "./decorators/functions";
import { cast, escape, pad, repeat, truncate, trim, camelCase, kebabCase, snakeCase, startCase, titleCase, words } from "./decorators/strings";
import { difference, differenceWith, iterator, filterTruthy, flatten, fromTuples, intersection, intersectionWith, mean, reverse, sample, shuffle, sort, sum, takeWhile, union, unionWith, unique, uniqueWith, unzip, zip, xor, xorWith } from "./decorators/arrays";
import { at, defaults, extend, includes, mapKeys, mapValues, omit, orderBy, toTuples, toValues } from "./decorators/objects";
import { dateFormat } from "./decorators/dates";
export { curry, defensiveCopy, delay, debounce, defer, memoize, partial, throttle, tryCatch, cast, escape, pad, repeat, truncate, trim, camelCase, kebabCase, snakeCase, startCase, titleCase, words, difference, differenceWith, filterTruthy, flatten, fromTuples, intersection, intersectionWith, iterator, mean, reverse, sample, shuffle, sort, sum, takeWhile, union, unionWith, unique, uniqueWith, unzip, zip, xor, xorWith, at, defaults, extend, includes, mapKeys, mapValues, omit, orderBy, toTuples, toValues, dateFormat };
