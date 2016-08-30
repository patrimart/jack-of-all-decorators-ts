
import * as dateFormatter from "dateformat";

import { methodFactory } from "./factories";

/**
 * Uses dateformat to format Date.
 * @see https://github.com/felixge/node-dateformat
 * @param {string} [mask] - the format of the date.
 * @param {boolean} [isUTC=false] - output the date in UTC.
 * @returns {(target:any, propertyKey:string, descriptor:(TypedPropertyDescriptor<()=>Date>|TypedPropertyDescriptor<Date>))=>undefined}
 */
export function dateFormat (mask: string = undefined, isUTC = false) {

    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => Date> | TypedPropertyDescriptor<Date>) {
        return methodFactory<any>((date: Date) => dateFormatter.call(dateFormatter, date, mask, isUTC), descriptor);
    }
}
