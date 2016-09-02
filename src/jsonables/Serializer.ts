
import { jsonKey, fromJSON } from "./annotations";



export namespace Serializer {

    /**
     *
     * @param clazz
     * @param json
     * @returns {T}
     */
    export function deserialize <T extends FunctionConstructor> (clazz: T, json: Object | string): T {

        class JsonableObject {}

        JsonableObject.prototype = Object.create(clazz.prototype);
        // JsonableObject.prototype.constructor = JsonableObject;
        // console.log(">>", String(JsonableObject), clazz.prototype[fromJSON]);
        const obj = new JsonableObject();
        (obj as any).prototype = Object.create(clazz.prototype);
        // console.log("INIT", obj);
        (obj as any).prototype[fromJSON].call(obj, typeof json === "string" ? JSON.parse(json) : json);
        return obj as T;
    }
}
