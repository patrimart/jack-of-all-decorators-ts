
import {
    DI_CLASS_ID, DI_MAP, IDependency, IInjectable, getInjectablesByModule, getInjectablesByClass,
} from "./module";


/**
 * Register a Class as a dependency with optional module path and auto-destructor.
 * @param {IInjectable & FunctionConstructor} clazz - the Class to register.
 * @param {string} [module="global"] - the module path to register the class under.
 * @param {boolean} [autoDestructor=true] - should the class' destruct() be called when no instances in use?
 */
export function register (clazz: any, module = "global", autoDestructor = true): void {

    // TODO Validate module path.

    const classId = clazz[DI_CLASS_ID] || Date.now().toString(36) + "-" + Math.round(Math.random() * Number.MAX_SAFE_INTEGER).toString(36);
    const modPath = module.split(".");
    const dep: IDependency = {
        instance: null,
        clazz: null,
        autoDestructor: autoDestructor,
        count: 0,
        destructor: () => {},
    };

    // If class previously registered, check if already at the module path.
    if (clazz[DI_CLASS_ID] !== undefined) {

        try {
            getInjectablesByModule(module, clazz);
            return;
        } catch (err) { /* Continue. No class found at that module path. */ }

    } else {
        // Assign unique ID to the Class object.
        Object.defineProperty(clazz, DI_CLASS_ID as any, { value: classId });
    }

    // Create a copy of the Class to preserve original destruct().
    const DepInjCopy = eval(`( ${clazz} )`);
    // DepInjCopy.prototype = Object.assign({}, clazz.prototype);
    DepInjCopy.prototype = Object.create(clazz.prototype);
    DepInjCopy.prototype.constructor = clazz;

    // Assign the same unique ID to the Class copy object.
    Object.defineProperty(DepInjCopy, DI_CLASS_ID as any, { value: classId });

    // If auto-destructor, override the original destruct() with counter and auto-destruct.
    const origDestruct = DepInjCopy.prototype["destruct"];
    if (autoDestructor) {

        Object.defineProperty(DepInjCopy.prototype, "destruct", {
            value: function () {

                dep.count = Math.max(0, dep.count - 1);

                if (dep.count === 0 && dep.instance) {
                    origDestruct.call(dep.instance);
                    dep.instance = null;
                    return;
                }
            }
        });
    }

    // console.log("DI_CLASS_ID", clazz[DI_CLASS_ID]);
    // console.log("DI_CLASS_ID", DepInjCopy[DI_CLASS_ID]);
    // console.log("A", String(DepInjCopy));
    // console.log("B", DepInjCopy.prototype);
    // const copy = new DepInjCopy();
    // copy.destruct();

    dep.clazz = DepInjCopy;
    dep.destructor = () => {
        if (dep.instance) {
            origDestruct.call(dep.instance);
            dep.instance = null;
            dep.count = 0;
        }
    };

    DI_MAP.push([DepInjCopy[DI_CLASS_ID], modPath, dep]);
    // console.log(DI_MAP);
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
        // console.log("REMOVE =>", DI_MAP.indexOf(di));
        DI_MAP.splice(DI_MAP.indexOf(di), 1);
        // Cleanup the removed Class.
        if (withDestruct) {
            di[2].destructor();
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
