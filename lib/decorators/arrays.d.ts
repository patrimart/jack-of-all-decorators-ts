export declare function difference<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>): void;
export declare function differenceWith<T>(equality?: (a: T, b: T) => boolean): (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) => void;
export declare function filterTruthy<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>): void;
export declare function flatten<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>): void;
export declare function fromTuples<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>): void;
export declare function intersection<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>): void;
export declare function intersectionWith<T>(equality?: (a: T, b: T) => boolean): (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) => void;
export declare function iterator<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>): void;
export declare function mean<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>): void;
export declare function reverse<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>): void;
export declare function sample<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>): void;
export declare function shuffle<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>): void;
export declare function sort<T>(...keys: string[]): (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) => void;
export declare function sum<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>): void;
export declare function takeWhile<T>(predicate?: (v: T) => boolean): (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) => void;
export declare function union<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>): void;
export declare function unionWith<T>(equality?: (a: T, b: T) => boolean): (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) => void;
export declare function unique<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>): void;
export declare function uniqueWith<T>(equality?: (a: T, b: T) => boolean): (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) => void;
export declare function xor<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>): void;
export declare function xorWith<T>(equality?: (a: T, b: T) => boolean): (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>) => void;
export declare function unzip<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>): void;
export declare function zip<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>): void;
