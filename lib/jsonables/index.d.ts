import * as jsonablesInterfaces from "./interfaces";
import * as jsonablesSerializer from "./Serializer";
import * as jsonablesAnnotations from "./annotations";
export declare namespace Json {
    type IClassConfig = jsonablesInterfaces.IClassConfig;
    type ITransformerResponse<T, U> = jsonablesInterfaces.ITransformerResponse<T, U>;
    type ITransformer<T, U> = jsonablesInterfaces.ITransformer<T, U>;
    const transformers: {
        DefaultValue: <T, _>(value: T) => (value: T) => T;
        OverrideValue: <T, _>(value: T) => (value: T) => T;
        NotNullable: <T, _>(value: T) => T;
        IsRequired: <T, _>(value: T) => T;
        ToBoolean: (value: any) => boolean;
        ToString: (value: any) => string;
        ToNumber: (value: any) => number;
    };
    const Serializer: typeof jsonablesSerializer.Serializer;
    const Serializable: typeof jsonablesAnnotations.Serializable;
    const serializeProperty: typeof jsonablesAnnotations.serializeProperty;
    const deserializeProperty: typeof jsonablesAnnotations.deserializeProperty;
    const serializeMethod: typeof jsonablesAnnotations.serializeMethod;
    const deserializeMethod: typeof jsonablesAnnotations.deserializeMethod;
    const serializeParam: typeof jsonablesAnnotations.serializeParam;
    const deserializeParam: typeof jsonablesAnnotations.deserializeParam;
}
