export declare namespace Serializer {
    function deserialize<T extends FunctionConstructor>(clazz: T, json: Object | string): T;
}
