import { IDependency } from "./module";
export declare function register(clazz: any, module?: string, selfDestruct?: boolean): IDependency;
export declare function unregister(clazz: any, module?: string, withDestruct?: boolean): void;
export declare function numRegistered(clazz?: any, module?: string): number;
export declare function numActive(clazz?: any, module?: string): number;
