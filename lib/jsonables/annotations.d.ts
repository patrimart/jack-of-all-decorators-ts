import { IClassConfig, ITransformerResponse } from "./interfaces";
export declare const jsonKey: any;
export declare const fromJSON: any;
export declare function Serializable(configs?: IClassConfig): (target: any) => void;
export declare function serializeProperty<T, U>(name?: string, ...transformers: ITransformerResponse<T, U>[]): (target: any, propertyKey: string | symbol) => void;
export declare function serializeMethod<T, U>(name?: string, ...transformers: ITransformerResponse<T, U>[]): (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => void;
export declare function deserializeMethod<T, U>(name?: string, ...transformers: ITransformerResponse<T, U>[]): (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => void;
export declare function serializeParam<T, U>(name?: string, ...transformers: ITransformerResponse<T, U>[]): (target: any, propertyKey: string | symbol, parameterIndex: number) => void;
