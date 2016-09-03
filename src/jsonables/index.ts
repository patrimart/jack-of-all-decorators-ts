
import * as jsonablesInterfaces   from "./interfaces";
import * as jsonablesTransformers from "./transformers";
import * as jsonablesSerializer   from "./Serializer";
import * as jsonablesAnnotations  from "./annotations";

/**
 * Namespace for the jsonables library.
 */
export namespace Json {

    export type IClassConfig               = jsonablesInterfaces.IClassConfig;
    export type ITransformerResponse<T, U> = jsonablesInterfaces.ITransformerResponse<T, U>;
    export type ITransformer<T, U>         = jsonablesInterfaces.ITransformer<T, U>;

    export const transformers = {
        DefaultValue  : jsonablesTransformers.DefaultValue,
        OverrideValue : jsonablesTransformers.OverrideValue,
        NotNullable   : jsonablesTransformers.NotNullable,
        IsRequired    : jsonablesTransformers.IsRequired,
        ToBoolean     : jsonablesTransformers.ToBoolean,
        ToString      : jsonablesTransformers.ToString,
        ToNumber      : jsonablesTransformers.ToNumber,
    };

    export const Serializer        = jsonablesSerializer.Serializer;
    export const Serializable      = jsonablesAnnotations.Serializable;
    export const serializeProperty = jsonablesAnnotations.serializeProperty;
    export const deserializeProperty = jsonablesAnnotations.deserializeProperty;
    export const serializeMethod   = jsonablesAnnotations.serializeMethod;
    export const deserializeMethod = jsonablesAnnotations.deserializeMethod;
    export const serializeParam    = jsonablesAnnotations.serializeParam;
    export const deserializeParam    = jsonablesAnnotations.deserializeParam;
}
