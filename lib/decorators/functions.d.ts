export declare function debounce<T>(maxWait: number, leading?: boolean, trailing?: boolean, wait?: number): (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => void;
export declare function curry(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>): void;
export declare function defer(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>): void;
export declare function delay(wait: number): (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => void;
export declare function defensiveCopy(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): void;
export declare function memoize(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): void;
export declare function partial(...args: any[]): (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => void;
export declare function throttle(wait: number, leading?: boolean, trailing?: boolean): (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => void;
export declare function tryCatch(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): void;
