export declare const DI_CLASS_ID: symbol;
export declare type DIMap = [string, string[], IDependency];
export declare const DI_MAP: DIMap[];
export interface IInjectable {
    DI_CLASS_ID?: string;
    destruct(): void;
}
export interface IDependency {
    instance: IInjectable;
    clazz: any;
    autoDestructor: boolean;
    count: number;
    destructor(): void;
}
export declare function getInjectablesByClass(clazz: any): DIMap[];
export declare function getInjectablesByModule(module: string, clazz?: any): DIMap[];
