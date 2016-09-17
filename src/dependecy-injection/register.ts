
import {
    DI_CLASS_ID, DI_MAP,
    IDependency, IInjectable,
    getInjectablesByModule, getInjectablesByClass,
} from "./module";


/**
 * Register a Class as a dependency with optional module path and auto-destructor.
 * @param {IInjectable & FunctionConstructor} clazz - the Class to register.
 * @param {string} [module="global"] - the module path to register the class under.
 * @param {boolean} [selfDestruct=true] - should the class' destruct() be called when no instances in use?
 */
export function register (clazz: any, module = "global", selfDestruct = true): IDependency {

    // TODO Validate module path.

    const classId = clazz[DI_CLASS_ID] || Date.now().toString(36) + "-" + Math.round(Math.random() * Number.MAX_SAFE_INTEGER).toString(36);
    const modPath = module.trim().split(".");
    const dep: IDependency = {
        instance: null,
        clazz: clazz,
        count: 0,
        dependencies: [],
        selfDestruct: selfDestruct,
        destructor: null,
    };

    // If class previously registered, check if already at the module path.
    if (clazz[DI_CLASS_ID] !== undefined) {

        try {
            return getInjectablesByModule(module, clazz)[0][2];
        } catch (err) {
            try {
                const regDep = getInjectablesByClass(clazz)[0][2];
                dep.dependencies = regDep.dependencies.slice(0);
            } catch (err) { /* Nothing found. Go ahead and register. */ }
        }

    } else {
        // Assign unique ID to the Class object.
        Object.defineProperty(clazz, DI_CLASS_ID as any, { value: classId });
    }

    DI_MAP.push([classId, modPath, dep]);

    return dep;
}

/**
 * Remove registered dependencies by Class and module. Optionally call destruct().
 * @param {*} clazz - the Class fo the dependencies to unregister.
 * @param {string} [module="global"] - the module path to find the dependency.
 * @param {boolean} [withDestruct=true] - if true, destruct() will be invoked.
 * @throws {ReferenceError} Throws when no dependencies are found.
 */
export function unregister (clazz: any, module = "global", withDestruct = true): void {

    // TODO Validate module path.

    // Find Class objects under given module path.
    getInjectablesByModule(module, clazz).forEach(di => {
        // Remove from DI_MAP.
        DI_MAP.splice(DI_MAP.indexOf(di), 1);
        // Cleanup the removed Class.
        if (withDestruct && di[2].instance) {
            di[2].instance.destruct();
        }
    });
}

/**
 * Returns the number of registered dependencies.
 * @param {*} [clazz] - the Class fo the dependencies.
 * @param {string} [module] - the module path to find the dependency.
 * @returns {number} the number of dependencies.
 */
export function numRegistered (clazz?: any, module?: string): number {

    try {

        if (clazz === undefined && module === undefined) {
            return DI_MAP.length;
        }

        if (clazz !== undefined && module === undefined) {
            return getInjectablesByClass(clazz).length;
        }

        return getInjectablesByModule(module, clazz).length;

    } catch (err) {
        return 0;
    }
}


export function numActive (clazz?: any, module?: string): number {

    try {

        if (clazz === undefined && module === undefined) {
            return DI_MAP.filter(d => !! d[2].instance).length;
        }

        if (clazz !== undefined && module === undefined) {
            return getInjectablesByClass(clazz).filter(d => !! d[2].instance).length;
        }

        return getInjectablesByModule(module, clazz).filter(d => !! d[2].instance).length;

    } catch (err) {
        return 0;
    }
}
