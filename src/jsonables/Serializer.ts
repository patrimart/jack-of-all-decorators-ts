
import { constArgs, fromJSON } from "./annotations";


export namespace Serializer {

    /**
     *
     * @param Clazz
     * @param json
     * @param [args]
     * @returns {T}
     */
    export function deserialize <T extends ObjectConstructor> (Clazz: T & Function, json: Object | string, ...args: any[]): T {

        args = args || Clazz.prototype[constArgs] || [];

        const obj = args.length === 0 ? Object.create(Clazz.prototype) : new (Clazz.bind(Clazz, ...args));
        obj[fromJSON].call(obj, typeof json === "string" ? JSON.parse(json) : json);
        return obj as T;
    }
}
