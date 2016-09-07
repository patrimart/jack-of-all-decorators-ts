
import { methodFactory } from "./factories";
import {
    isFunction,
    assign, at, defaultsDeep, includes, mapKeys, mapValues, omit, omitBy, orderBy,
    toPairsIn, valuesIn,
} from "lodash";


export function at (paths: string | string[]) {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => Object> | TypedPropertyDescriptor<Object>) {
        return methodFactory<any>((o: Object) => at.call(at, o, paths), descriptor);
    }
}

export function defaults (...sources: Object[]) {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => Object> | TypedPropertyDescriptor<Object>) {
        return methodFactory<any>((o: Object) => defaultsDeep.call(defaultsDeep, o, ...sources), descriptor);
    }
}

export function extend (...sources: Object[]) {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => Object> | TypedPropertyDescriptor<Object>) {
        return methodFactory<any>((o: Object) => assign.call(assign, o, ...sources), descriptor);
    }
}

/**
 * Search an array, object or string for the given value (from the optional offset).
 * @param {*} searchValue - the value to search the collection for.
 * @param {number} [offset=0] - the index to search from (supports negative values)
 */
export function includes<T extends any[] | Object | string> (searchValue: any, offset = 0) {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) {
        return methodFactory<any>((collection: any) => includes.call(includes, collection, searchValue, offset), descriptor);
    }
}

export function mapKeys (mapper: (value: any, key: string) => string) {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => Object> | TypedPropertyDescriptor<Object>) {
        return methodFactory<any>((o: Object) => mapKeys.call(mapKeys, o, mapper), descriptor);
    }
}

/**
 * See docs for value options with _.property = https://lodash.com/docs#mapValues
 * @param mapper
 * @returns {(target:any, propertyKey:string, descriptor:(TypedPropertyDescriptor<()=>Object>|TypedPropertyDescriptor<Object>))=>undefined}
 */
export function mapValues (mapper: (value: any, key?: string) => any) {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => Object> | TypedPropertyDescriptor<Object>) {
        return methodFactory<any>((o: Object) => mapValues.call(mapValues, o, mapper), descriptor);
    }
}


export function omit (predicate: string | string[] | ((value: any, key: string) => boolean)) {
    const func: Function = isFunction(predicate) ? omitBy : omit;
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => Object> | TypedPropertyDescriptor<Object>) {
        return methodFactory<any>((o: Object) => func.call(func, o, predicate), descriptor);
    }
}

/**
 * Sorts an array of objects by key(s). Supply space-delimited keys and orders.
 * <code>@orderBy("name age", "asc desc")</code>
 * @param {string} iteratees - the object keys to sort on
 * @param {string} [orders] - asc or desc to set sort order
 */
export function orderBy<T> (iteratees: string, orders?: string) {
    const i = iteratees.split(" ");
    const o = orders ? orders.split(" ") : undefined;
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) {
        return methodFactory<any>((arr: any[]) => orderBy.call(orderBy, arr, i, o), descriptor);
    }
}


export function toTuples (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => Object> | TypedPropertyDescriptor<Object>) {
    return methodFactory<any>(toPairsIn.bind(toPairsIn), descriptor);
}


export function toValues (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => Object> | TypedPropertyDescriptor<Object>) {
    return methodFactory<any>(valuesIn.bind(valuesIn), descriptor);
}

