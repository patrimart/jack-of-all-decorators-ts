import { IInjectable } from "./module";
export declare function register(clazz: IInjectable & FunctionConstructor, module?: string, autoDestructor?: boolean): void;
export declare function unregister(clazz: IInjectable, module?: string, withDestruct?: boolean): void;
