
import { constArgs, fromJSON } from "./annotations";


export namespace Serializer {

    /**
     *
     * @param Clazz
     * @param json
     * @param [args]
     * @returns {T}
     */
    export function deserialize <T> (Clazz: any, json: Object | string, ...args: any[]): T {

        args = (args.length && args) || Clazz.prototype[constArgs] || [];

        const obj = args.length === 0 ? Object.create(Clazz.prototype) : new Clazz(...args);
        obj[fromJSON].call(obj, typeof json === "string" ? JSON.parse(json) : json);
        return obj as T;
    }
}
