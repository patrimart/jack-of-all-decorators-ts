import { cloneDeep, curry, debounce, defer, delay, partial, rearg, throttle } from "lodash";
import { methodFactory, methodFactoryBind } from "./factories";



export function debounce<T> (wait: number, maxWait = wait * 4, leading = true, trailing = ! leading) {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        return methodFactoryBind<any>(
            function (func: Function) {
                return debounce.call(this, func, wait, { maxWait, leading, trailing });
            },
            propertyKey, descriptor
        );
    }
}


export function curry (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
    return methodFactoryBind<any>(
        function (func: Function) {
            return curry.call(this, func);
        },
        propertyKey, descriptor
    );
}


export function defer (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
    return methodFactoryBind<any> (
        function (func: Function) {
            return defer.call(this, func)
        },
        propertyKey, descriptor
    );
}


export function delay (wait: number) {

    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        return methodFactoryBind<any>(
            function (func: Function) {
                return delay.call(this, func, wait);
            },
            propertyKey, descriptor
        );
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
        return methodFactoryBind<any> (
            function (func: Function)  {
                return function (...a: any[]) {
                    return {
                        next () { return { value: limit > 0 ? func.apply(this, a) : undefined, done: limit-- <= 0 }; },
                        [Symbol.iterator] () { return this; }
                    };
                };
            },
            propertyKey, descriptor
        );
    }
}


export function lazy (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
    return methodFactoryBind<any>(function (func: Function) {
        let cache: any;
        return function (...a: any[]) {
            return cache || (cache = func.bind(this, ...a));
        };
    }, propertyKey, descriptor);
}


export function memoize (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    let memCache: any;
    return methodFactoryBind<any> (
        function (func: Function) {
            return function (...a: any[]) {
                return memCache = memCache || func.apply(this, a);
            };
        }, propertyKey, descriptor
    );
}


export function partial (...args: any[]) {

    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        // Using curry to achieve c.method(3), where partial is forcing c.method()(3)
        return methodFactoryBind<any>(
            function (func: Function) {
                return partial.call(this, func, ...args);
            },
            propertyKey, descriptor
        );
    }
}


export function rearg (...indexes: number[]) {

    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        return methodFactoryBind<any>(
            function (func: Function) {
                return rearg.call(this, func, indexes);
            },
            propertyKey, descriptor
        );
    }
}

export function throttle (wait: number, leading = true, trailing = ! leading) {

    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        return methodFactoryBind<any>(
            function (func: Function) {
                return throttle.call(this, func, wait, { leading, trailing });
            },
            propertyKey, descriptor
        );
    }
}


export function tryCatch (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {

    const func = function (f: () => any) {
        return function (...a: any[]) {
            try {
                return f.apply(this, a);
            } catch (err) {
                console.error(`An error occurred on property "${propertyKey}".`, err.stack);
                return undefined;
            }
        }
    };

    if (!! descriptor.value)    descriptor.value = func(descriptor.value as any) as any;
    else if (!! descriptor.get) descriptor.get   = func(descriptor.get);
    else                        throw new TypeError("Only put a decorator on a method or get accessor.");
}
