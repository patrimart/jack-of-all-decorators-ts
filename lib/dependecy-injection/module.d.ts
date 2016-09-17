export declare const DI_CLASS_ID: symbol;
export declare type DepMap = [string, string[], IDependency];
export declare const DI_MAP: DepMap[];
export interface IInjectable {
    destruct(): void;
}
export interface IDependency {
    instance: IInjectable;
    clazz: any;
    dependencies: any[];
    count: number;
    selfDestruct: boolean;
    destructor(): void;
}
export declare function getInjectablesByClass(clazz: any): DepMap[];
export declare function getInjectablesByModule(module: string, clazz?: any): DepMap[];
