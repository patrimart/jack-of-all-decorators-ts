import { ITransformerResponse } from "../interfaces";
export declare function DefaultValue<T, _>(value: T): ITransformerResponse<T, T>;
export declare function OverrideValue<T, _>(value: T): ITransformerResponse<T, T>;
export declare function NotNullable<T, _>(value: T): T;
export declare function IsRequired<T, _>(value: T): T;
export declare function ToBoolean(value: any): boolean;
export declare function ToString(value: any): string;
export declare function ToNumber(value: any): number;
