
/**
 * Interface for Transformer function.
 */
export type ITransformerResponse<T, U> = (value: T) => U;

/**
 * Interface for Transformer function wrapper. Only for internal use.
 */
export type ITransformer<T, U> = (...args: any[]) => ITransformerResponse<T, U>;

/**
 * Interface to configure JSONables Serializable annotation.
 */
export interface IClassConfig {

    // Arguments array to initialize deserialized classes. Default: undefined.
    defaultConstruction?: any[];
    // Converts the getter name: getFoo => foo. Default: true.
    autoNameGetters?: boolean;
    // Converts undefined values to null values. Default: true.
    undefinedToNull?: boolean;
    // Removes properties with null values. Default: false.
    ignoreNulls?: boolean;
    // Converts property names to camel case. Default: false.
    toCamelCase?: boolean;
    // Converts property names to snake case. Default: false.
    toSnakeCase?: boolean;
    // Converts property names to kebab case. Default: false.
    toKebabCase?: boolean;
}
