
import { isEmpty } from "lodash";
import { ITransformerResponse } from "./interfaces";

/**
 * If a value is undefined, the given default value is returned.
 * <code>@serializeProperty("foo", DefaultValue("bar");</code>
 * @param {T} value - default value
 * @returns {(v:T) => T}
 */
export function DefaultValue<T, _> (value: T): ITransformerResponse<T, T> {

    return function (v: T): T {
        return v || value;
    }
}

/**
 * The given value is always returned.
 * <code>@serializeProperty("foo", OverrideValue("bar");</code>
 * @param {T} value - override value
 * @returns {(v:T)=>T}
 */
export function OverrideValue<T, _> (value: T): ITransformerResponse<T, T> {

    return function (v: T): T {
        return value;
    }
}

/**
 * If the property value is null, a TypeError is thrown.
 * <code>@serializeProperty("foo", NotNullable);</code>
 * @param {T} value - the property value
 * @returns {T}
 */
export function NotNullable<T, _> (value: T): T {
    if (value === null) throw new TypeError("The property cannot be null.");
    return value;
}

/**
 * If the property value is undefined, a ReferenceError is thrown.
 * <code>@serializeProperty("foo", IsRequired);</code>
 * @param {T} value - the property value
 * @returns {T}
 */
export function IsRequired<T, _> (value: T): T {
    if (value === undefined) throw new ReferenceError("The property cannot be undefined.");
    return value;
}

/**
 * Converts the property value to true or false based on the following rules:<br>
 *     - If string, true unless /^(false|0|no|off|\s*)$/i ("false", "0", "no", "off", "" or " ").<br>
 *     - If array, true unless length === 0.<br>
 *     - If object, true unless empty ({}).<br>
 *     - Else, !! value.<br>
 * <code>@serializeProperty("foo", ToBoolean);</code>
 * @param {*} value - the property value
 * @returns {boolean}
 */
export function ToBoolean (value: any): boolean {

    if (typeof value === "string") return /^(false|0|no|off|\s*)$/i.test(value.trim()) === false;
    if (Array.isArray(value) && value.length === 0) return false;
    if (typeof value === "object" && isEmpty(value)) return false;
    return !! value;
}

/**
 * Converts the value to a string based in the following rules:<br>
 *     - If string, return value.<br>
 *     - If undefined, return "undefined".<br>
 *     - Else, JSON.stringify(value).
 * <code>@serializeProperty("foo", ToString);</code>
 * @param {*} value - the property value.
 * @returns {String}
 */
export function ToString (value: any): string {
    if (value === undefined) return "undefined";
    return typeof value === "string" ? value : JSON.stringify(value);
}

/**
 * Converts a value to a number with (parseFloat(value) || 0).
 * @param {*} value - the property value.
 * @returns {number}
 */
export function ToNumber (value: any): number {
    return parseFloat(value) || 0;
}
