
import { cloneDeep, curry, debounce, defer, delay, rearg, throttle } from "lodash";
import { methodFactory, methodFactoryBind } from "./factories";



export function debounce<T> (maxWait: number, leading = true, trailing = ! leading, wait = 0) {

    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        return methodFactoryBind<any>((func: Function) => debounce.call(debounce, func, { maxWait, leading, trailing, wait }), descriptor);
    }
}


export function curry (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
    return methodFactoryBind<any>((func: Function) => curry.call(curry, func), descriptor);
}


export function defer (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
    return methodFactoryBind<any>((func: Function) => defer.call(defer, func), descriptor);
}


export function delay (wait: number) {

    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        return methodFactoryBind<any>((func: Function) => delay.call(delay, func, wait), descriptor);
    }
}


/**
 * Makes a copy of the return object with lodash's cloneDeep.
 * Note: Some other decorators create copies by necessity like sort, reverse, etc.
 */
export function defensiveCopy (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    return methodFactory (cloneDeep.bind(cloneDeep), descriptor);
}

/**
 * Requires target ES6 to work with for...of and [...it]. ES5 works with Array.from() or it.next().
 * @param {number} [limit=Number.MAX_SAFE_INTEGER] - limit of iterations.
 */
export function iterable (limit = Number.MAX_SAFE_INTEGER) {

    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        return methodFactoryBind<any>((func: Function) => ({
            next () { return { value: limit > 0 ? func.call(func) : undefined, done: limit-- <= 0 }; },
            [Symbol.iterator] () { return this; }
        }), descriptor);
    }
}


export function lazy (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
    return methodFactoryBind<any>(function (func: Function) {
        let cache: any;
        return () => cache || (cache = func.call(func));
    }, descriptor);
}


export function memoize (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    const memKey = Symbol(propertyKey);
    return methodFactory (function (v: any) { return this[memKey] = this[memKey] || v; }, descriptor);
}


export function partial (...args: any[]) {

    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        // Using curry to achieve c.method(3), where partial is forcing c.method()(3)
        return methodFactoryBind<any>((func: Function) => curry.call(curry, func)(...args), descriptor);
    }
}


export function rearg (...indexes: number[]) {

    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        return methodFactoryBind<any>((func: Function) => rearg.call(rearg, func, indexes), descriptor);
    }
}

export function throttle (wait: number, leading = true, trailing = ! leading) {

    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        return methodFactoryBind<any>((func: Function) => throttle.call(throttle, func, { leading, trailing, wait }), descriptor);
    }
}


export function tryCatch (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {

    const func = function (f: () => any) {
        return function (...a: any[]) {
            try {
                return f.apply(this, a);
            } catch (err) {
                console.error(`An error occurred on property "${propertyKey}".`, err, err.stack);
                return undefined;
            }
        }
    };

    if (!! descriptor.value)    descriptor.value = func(descriptor.value as any) as any;
    else if (!! descriptor.get) descriptor.get   = func(descriptor.get);
    else                        throw new TypeError("Only put a decorator on a method or get accessor.");
}
