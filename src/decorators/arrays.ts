
import { methodFactory } from "./factories";
import {
    compact, difference, differenceWith, flattenDeep, fromPairs, intersection, intersectionWith, mean,
    reverse, sample, shuffle, sortBy, sum, takeWhile, union, unionWith, uniq, uniqWith, xor, xorWith, unzip, zip
} from "lodash";



export function difference<T> (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) {
    return methodFactory<any> ((arr: any[]) => difference.apply(difference, arr), descriptor);
}


export function differenceWith<T> (equality?: (a: T, b: T) => boolean) {

    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) {
        return methodFactory<any>((arr: any[]) => differenceWith.call(differenceWith, ...arr, equality), descriptor);
    }
}


export function filterTruthy<T> (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) {
    return methodFactory<any> (compact.bind(compact), descriptor);
}


export function flatten<T> (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) {
    return methodFactory<any> (flattenDeep.bind(flattenDeep), descriptor);
}


export function fromTuples<T> (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) {
    return methodFactory<any> (fromPairs.bind(fromPairs), descriptor);
}


export function intersection<T> (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) {
    return methodFactory<any> ((arr: any[]) => intersection.apply(intersection, arr), descriptor);
}


export function intersectionWith<T> (equality?: (a: T, b: T) => boolean) {

    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) {
        return methodFactory<any>((arr: any[]) => intersectionWith.call(intersectionWith, ...arr, equality), descriptor);
    }
}

/**
 * c.getArray().next().value
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
 * @param target
 * @param propertyKey
 * @param descriptor
 */
export function iterator<T> (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) {
    return methodFactory<any> ((arr: any[]) => (arr as any)[Symbol.iterator](), descriptor);
}


export function mean<T> (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) {
    return methodFactory<any> (mean.bind(mean), descriptor);
}


export function reverse<T> (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) {
    return methodFactory<any> (reverse.bind(reverse), descriptor);
}


export function sample<T> (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) {
    return methodFactory<any> (sample.bind(sample), descriptor);
}


export function shuffle<T> (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) {
    return methodFactory<any> (shuffle.bind(shuffle), descriptor);
}


// export function sort<T> (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) {
//     return methodFactory<any> (sortBy.bind(sortBy), descriptor);
// }
export function sort<T> (...keys: string[]) {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) {
        return methodFactory<any>((arr: T[]) => sortBy.call(sortBy, arr, keys), descriptor);
    }
}


export function sum<T> (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) {
    return methodFactory<any> (sum.bind(sum), descriptor);
}


export function takeWhile<T> (predicate?: (v: T) => boolean) {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) {
        methodFactory<any>((arr: T[]) => takeWhile.call(takeWhile, arr, predicate), descriptor);
    }
}


export function union<T> (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) {
    return methodFactory<any> ((arr: any[]) => union.apply(union, arr), descriptor);
}


export function unionWith<T> (equality?: (a: T, b: T) => boolean) {

    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) {
        return methodFactory<any>((arr: any[]) => unionWith.call(unionWith, ...arr, equality), descriptor);
    }
}


export function unique<T> (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) {
    return methodFactory<any> (uniq.bind(uniq), descriptor);
}


export function uniqueWith<T> (equality?: (a: T, b: T) => boolean) {

    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) {
        return methodFactory<any>((arr: any[]) => uniqWith.call(uniqueWith, arr, equality), descriptor);
    }
}


export function xor<T> (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) {
    return methodFactory<any> ((arr: any[]) => xor.apply(xor, arr), descriptor);
}


export function xorWith<T> (equality?: (a: T, b: T) => boolean) {

    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) {
        return methodFactory<any>((arr: any[]) => xorWith.call(xorWith, ...arr, equality), descriptor);
    }
}


export function unzip<T> (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) {
    return methodFactory<any> (unzip.bind(unzip), descriptor);
}

export function zip<T> (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) {
    return methodFactory<any> ((arr: any[]) => zip.apply(zip, arr), descriptor);
}
