
import { fromJSON } from "./annotations";


export namespace Serializer {

    /**
     *
     * @param clazz
     * @param json
     * @returns {T}
     */
    export function deserialize <T extends FunctionConstructor> (clazz: T, json: Object | string): T {

        const c = Object.create(clazz.prototype); // new clazz();
        (c as any)[fromJSON].call(c, typeof json === "string" ? JSON.parse(json) : json);
        // c.$$fromJSON(json);
        return c as any;
    }
}
