
import * as jsonablesInterfaces         from "./jsonables/interfaces";
import * as jsonablesTransformersBasics from "./jsonables/transformers/basics";
import * as jsonablesSerializer         from "./jsonables/Serializer";
import * as jsonablesAnnotations        from "./jsonables/annotations";

/**
 * Namespace for the jsonables library.
 */
export namespace Json {

    export type IClassConfig               = jsonablesInterfaces.IClassConfig;
    export type ITransformerResponse<T, U> = jsonablesInterfaces.ITransformerResponse<T, U>;
    export type ITransformer<T, U>         = jsonablesInterfaces.ITransformer<T, U>;

    export const transformers = {
        DefaultValue  : jsonablesTransformersBasics.DefaultValue,
        OverrideValue : jsonablesTransformersBasics.OverrideValue,
        NotNullable   : jsonablesTransformersBasics.NotNullable,
        IsRequired    : jsonablesTransformersBasics.IsRequired,
        ToBoolean     : jsonablesTransformersBasics.ToBoolean,
        ToString      : jsonablesTransformersBasics.ToString,
        ToNumber      : jsonablesTransformersBasics.ToNumber,
    };

    export const Serializer        = jsonablesSerializer.Serializer;
    export const Serializable      = jsonablesAnnotations.Serializable;
    export const serializeProperty = jsonablesAnnotations.serializeProperty;
    export const serializeMethod   = jsonablesAnnotations.serializeMethod;
    export const serializeParam    = jsonablesAnnotations.serializeParam;
}

import { curry, defensiveCopy, debounce, defer, delay, memoize, partial, throttle, tryCatch } from "./decorators/functions";
import {
    cast, escape, pad, repeat, truncate, trim,
    camelCase, kebabCase, snakeCase, startCase, titleCase, words
} from "./decorators/strings";
import {
    difference, differenceWith, iterator,
    filterTruthy, flatten, fromTuples, intersection, intersectionWith, mean, reverse,
    sample, shuffle, sort, sum, takeWhile, union, unionWith, unique, uniqueWith, unzip, zip,
    xor, xorWith
} from "./decorators/arrays";
import {
    at, defaults, extend, includes, mapKeys, mapValues, omit, orderBy,
    toTuples, toValues,
} from "./decorators/objects";
import { dateFormat } from "./decorators/dates";

/**
 * Note: decorators are executed in reverse order. Think of the decorators as being added to a stack.
 */
export {
    // Function
    curry,
    defensiveCopy,
    delay,
    debounce,
    defer,
    memoize,
    partial,
    throttle,
    tryCatch,
    // String
    cast,
    escape,
    pad,
    repeat,
    truncate,
    trim,
    camelCase, kebabCase, snakeCase, startCase, titleCase,
    words,
    // Array
    difference, differenceWith,
    filterTruthy,
    flatten,
    fromTuples,
    intersection, intersectionWith,
    iterator,
    mean,
    reverse,
    sample,
    shuffle,
    sort,
    sum,
    takeWhile,
    union, unionWith,
    unique, uniqueWith,
    unzip, zip,
    xor, xorWith,
    // Objects
    at,
    defaults,
    extend,
    includes,
    mapKeys,
    mapValues,
    omit,
    orderBy,
    toTuples,
    toValues,
    // Dates
    dateFormat
}
