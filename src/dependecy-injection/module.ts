
/**
 * ID param assigned to DI classes.
 * @type {symbol}
 */
export const DI_CLASS_ID = Symbol("di-class-id");

/**
 * DepMap type.
 * [ DI_CLASS_ID: string, [module: string], IDependency ]
 */
export type DepMap = [string, string[], IDependency];

/**
 * Map for DI lookup.
 * @type {DepMap[]}
 */
export const DI_MAP: DepMap[] = [];

/**
 * The interface for the the dependency classes.
 */
export interface Injectable {
    destruct(): void;
}

/**
 * The interface for the dependency object lookup.
 */
export interface IDependency {
    instance: Injectable;
    clazz: any;
    dependencies: any[];
    count: number;
    selfDestruct: boolean;
    destructor(): void;
}

/**
 * Returns the IDependency for the given Class object.
 * @param {*} [clazz] - the Class to filter on.
 * @returns {DepMap[]}
 */
export function getInjectablesByClass (clazz: any): DepMap[] {

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
 * Sep by dot. Wildcard with * and **. "mod.path", "mod.path.*", "mod.path.**".
 * @param {string} module - the module(s) to query.
 * @param {*} [clazz] - the optional Class to filter on.
 * @returns {DepMap[]}
 */
export function getInjectablesByModule (module: string, clazz?: any): DepMap[] {

    // TODO Validate module path.

    if (module === "**" && clazz !== undefined) {
        return getInjectablesByClass(clazz);
    }

    const modParts = module.split(".");
    const di = DI_MAP
        .filter(di => {
            // console.log();
            // console.log(di[1].length, "=", modParts.length);
            let lastModPart: string;
            return di[1].length >= modParts.length && di[1].every((d, i) => {
                // console.log(d, "= * || ", d, "=", modParts[i]);
                lastModPart = modParts[i] || lastModPart;
                return modParts[i] === "*" || d === modParts[i] || lastModPart === "**";
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
//                 selfDestruct: di[2].selfDestruct,
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
