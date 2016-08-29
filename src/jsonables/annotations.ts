
import { camelCase, snakeCase, kebabCase }    from "lodash";
import { IClassConfig, ITransformerResponse } from "./interfaces";


const RE_PARAMS = /^[^(]+\(([$\w,\s]+)*\)/;

const IClassConfigDefaults: IClassConfig = {
    autoNameGetters: true,
    undefinedToNull: true,
    ignoreNulls: false,
    toSnakeCase: false,
    toCamelCase: false,
    toKebabCase: false,
};

interface IJsonKeyData {
    key: string;
    value: Function;
    transformers: ITransformerResponse<any, any>[];
}

const jsonKey = Symbol("jsonKey");
export const fromJSON = Symbol("fromJSON");

/**
 * The annotation to mark a class as JSON Serializable.
 * @param {IClassConfig} configs - configure the serialization.
 */
export function Serializable (configs?: IClassConfig) {

    configs = Object.assign({}, IClassConfigDefaults, configs);

    return function (target: any) {

        const jsonKeyData = target.prototype[jsonKey] as IJsonKeyData[];
        delete target.prototype[jsonKey];

        Object.defineProperty(target.prototype, "toJSON", {
            value: function (): any {

                return jsonKeyData.reduce((p: any, c: IJsonKeyData) => {

                    const value = c.transformers.reduce((p2, c2) => c2.call(this, p2), c.value.call(this));
                    const key = (function (k: string) {
                        if (configs.autoNameGetters) k = k.replace(/^get([\w])/i, (a, b) => b.toLowerCase());
                        if (configs.toCamelCase) return camelCase(k);
                        if (configs.toSnakeCase) return snakeCase(k);
                        if (configs.toKebabCase) return kebabCase(k);
                        return k;
                    }(c.key));

                    if (configs.undefinedToNull && value === undefined)
                        p[key] = null;
                    else if (configs.ignoreNulls === false || (configs.ignoreNulls && value !== null))
                        p[key] = value;

                    return p;

                }, {});
            }
        });
    }
}

/**
 * An annotation to mark a class property as JSON serializable.
 * @param {string} [name] - renames the property key.
 * @param {ITransformerResponse[]} transformers - transforms the property value.
 */
export function serializeProperty<T, U> (name?: string, ...transformers: ITransformerResponse<T, U>[]) {

    return function (target: any, propertyKey: string | symbol) {
        // console.log("serializeProperty", target, propertyKey);
        assignJsonKey (target, name || propertyKey, function () { return this[propertyKey]; }, transformers);
    };
}

/**
 * An annotation to mark a class method as JSON serializable.
 * @param {string} [name] - renames the property key.
 * @param {ITransformerResponse[]} transformers - transforms the property value.
 */
export function serializeMethod<T, U> (name?: string, ...transformers: ITransformerResponse<T, U>[]) {

    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        // console.log("serializeMethod", target, propertyKey, descriptor);
        assignJsonKey (target, name || propertyKey, descriptor.value || descriptor.get, transformers);
    }
}

/**
 * An annotation to mark a class constructor's parameter as JSON serializable.
 * @param {string} [name] - renames the property key.
 * @param {ITransformerResponse[]} transformers - transforms the property value.
 */
export function serializeParam<T, U> (name?: string, ...transformers: ITransformerResponse<T, U>[]) {

    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        // console.log("serializeParam", target.toString(), propertyKey, parameterIndex);
        const key = name || target.toString().match(RE_PARAMS)[1].split(',')[parameterIndex].trim();
        assignJsonKey (target.prototype, key, function () { return this[key]; }, transformers);
    }
}


function assignJsonKey (target: any, key: string | symbol, value: Function, transformers: ITransformerResponse<any, any>[]) {

    target[jsonKey] = target[jsonKey] || [];
    target[jsonKey].push({ key, value, transformers });
}
