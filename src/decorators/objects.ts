
import { methodFactory } from "./factories";
import {
    compact
} from "lodash";



// export function difference<T> (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) {
//     return methodFactory<any> ((arr: any[]) => difference.apply(difference, arr), descriptor);
// }
//
//
// export function differenceWith<T> (equality?: (a: T, b: T) => boolean) {
//
//     return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) {
//         return methodFactory<any>((arr: any[]) => differenceWith.call(differenceWith, ...arr, equality), descriptor);
//     }
// }

