export declare type ITransformerResponse<T, U> = (value: T) => U;
export declare type ITransformer<T, U> = (...args: any[]) => ITransformerResponse<T, U>;
export interface IClassConfig {
    defaultConstruction?: any[];
    autoNameGetters?: boolean;
    undefinedToNull?: boolean;
    ignoreNulls?: boolean;
    toCamelCase?: boolean;
    toSnakeCase?: boolean;
    toKebabCase?: boolean;
}
