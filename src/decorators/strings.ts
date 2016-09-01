
import { methodFactory } from "./factories";
import {
    camelCase, escape, kebabCase, pad, padEnd, padStart, repeat,
    snakeCase, startCase, trim, truncate, upperFirst, words
} from "lodash";



export function cast (caster: (v: string) => any) {

    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => string> | TypedPropertyDescriptor<string>) {
        return methodFactory<any>(caster, descriptor);
    }
}


export function escape (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => string> | TypedPropertyDescriptor<string>) {
    return methodFactory<any> (escape.bind(escape), descriptor);
}


export function pad (len: number, chars = " ") {

    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => string> | TypedPropertyDescriptor<string>) {
        return methodFactory<any>((str: string) => pad.call(pad, str, len, chars), descriptor);
    }
}


export function padLeft (len: number, chars = " ") {

    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => string> | TypedPropertyDescriptor<string>) {
        return methodFactory<any>((str: string) => padStart.call(padStart, str, len, chars), descriptor);
    }
}


export function padRight (len: number, chars = " ") {

    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => string> | TypedPropertyDescriptor<string>) {
        return methodFactory<any>((str: string) => padEnd.call(padEnd, str, len, chars), descriptor);
    }
}


export function repeat (n: number) {

    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => string> | TypedPropertyDescriptor<string>) {
        return methodFactory<any>((str: string) => repeat.call(repeat, str, n), descriptor);
    }
}


export function truncate (length: number, omission?: string, separator?: RegExp | string) {

    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => string> | TypedPropertyDescriptor<string>) {
        return methodFactory<any>((str: string) => truncate.call(truncate, str, { length, omission, separator }), descriptor);
    }
}


export function trim (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => string> | TypedPropertyDescriptor<string>) {
    return methodFactory<any> (trim.bind(trim), descriptor);
}


export function camelCase (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => string> | TypedPropertyDescriptor<string>) {
    return methodFactory<any> (camelCase.bind(camelCase), descriptor);
}


export function kebabCase (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => string> | TypedPropertyDescriptor<string>) {
    return methodFactory<any> (kebabCase.bind(kebabCase), descriptor);
}


export function snakeCase (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => string> | TypedPropertyDescriptor<string>) {
    return methodFactory<any> (snakeCase.bind(snakeCase), descriptor);
}


export function startCase (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => string> | TypedPropertyDescriptor<string>) {
    return methodFactory<any> (startCase.bind(startCase), descriptor);
}


export function titleCase (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => string> | TypedPropertyDescriptor<string>) {
    return methodFactory<any> (upperFirst.bind(upperFirst), descriptor);
}


export function words (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => string> | TypedPropertyDescriptor<string>) {
    return methodFactory<any> (words.bind(words), descriptor);
}
