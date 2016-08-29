
import { cloneDeep } from "lodash";
import { methodFactory } from "./factories";


/**
 * Makes a copy of the return object with lodash's cloneDeep.
 * Note: Some other decorators create copies by necessity like sort, reverse, etc.
 */
export function defensiveCopy (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    return methodFactory (cloneDeep.bind(cloneDeep), descriptor);
}


export function memoize (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    const memKey = Symbol(propertyKey);
    return methodFactory (function (v: any) { return this[memKey] = this[memKey] || v; }, descriptor);
}
