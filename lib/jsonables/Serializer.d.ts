export declare namespace Serializer {
    function deserialize<T extends ObjectConstructor>(Clazz: T & Function, json: Object | string, ...args: any[]): T;
}
