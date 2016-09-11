
/**
 * ID param assigned to DI classes.
 * @type {symbol}
 */
export const DI_CLASS_ID = Symbol("di-class-id");

export type DIMap = [string, string[], IDependency];

/**
 * Map for DI lookup.
 * [ DI_CLASS_ID, [module namespace], DI ]
 * @type {Array}
 */
export const DI_MAP: DIMap[] = [];


/**
 * The interface for the the dependency classes.
 */
export interface IInjectable {
    DI_CLASS_ID?: string;
    destruct(): void;
}

/**
 * The interface for the dependency object lookup.
 */
export interface IDependency {
    instance: IInjectable;
    clazz: any;
    autoDestructor: boolean;
    count: number;
    destructor(): void;
}

/**
 * Returns the IDependency for the given Class object.
 * @param clazz
 * @returns {DIMap[]}
 */
export function getInjectablesByClass (clazz: any): DIMap[] {

    if (clazz[DI_CLASS_ID] === undefined) {
        throw new ReferenceError("The given class has not been registered.");
    }

    const di = DI_MAP.filter(di => di[0] === clazz[DI_CLASS_ID]);

    if (di.length === 0) {
        throw new ReferenceError("The given registered class is no longer registered.");
    }

    return di;
}

/**
 * Returns the IDependency objects under the given module path.
 * Sep by dot. Wildcard with *. "mod.path", "mod.path.*", "mod.*.path".
 * @param {string} module - the module(s) to query.
 * @param {*} [clazz] - the optional Class to filter on.
 * @returns {DIMap[]}
 */
export function getInjectablesByModule (module: string, clazz?: any): DIMap[] {

    // TODO Validate module path.

    if (module === "*" && clazz !== undefined) {
        return getInjectablesByClass(clazz);
    }

    const modParts = module.split(".");
    const di = DI_MAP
        .filter(di => {
            // console.log(di[1].length, "=", modParts.length);
            return di[1].length === modParts.length && di[1].every((d, i) => {
                // console.log(d, "= * || ", d, "=", modParts[i]);
                return modParts[i] === "*" || d === modParts[i];
            })
        })
        .filter(di => {
            // console.log(clazz);
            // console.log(di[0], "=", clazz && clazz[DI_CLASS_ID]);
            return clazz === undefined || di[0] === clazz[DI_CLASS_ID];
        });

    if (di.length === 0) {
        throw new ReferenceError(`No classes have been registered under the module path "${module}".`);
    }

    return di;
}

// /**
//  * Converts the DI data to JSON string.
//  * @returns {string}
//  */
// export function serialize (): string {
//
//     return JSON.stringify(
//         DI_MAP.map(di =>[
//             di[0],
//             di[1],
//             {
//                 instance: null,
//                 clazz: `( ${String(di[2].clazz)} )`,
//                 autoDestructor: di[2].autoDestructor,
//                 count: 0,
//                 destructor: `( ${String(di[2].destructor)} )`,
//             }
//         ])
//     );
// }
//
// export function deserialize (json: string): DIMap[] {
//
//     return [];
// }
