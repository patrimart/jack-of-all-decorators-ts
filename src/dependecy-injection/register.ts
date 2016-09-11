
import {
    DI_CLASS_ID, DI_MAP, DIMap, IDependency, IInjectable, getInjectablesByModule,
} from "./module";


/**
 * Register a Class as a dependency with optional module path and auto-destructor.
 * @param {IInjectable & FunctionConstructor} clazz - the Class to register.
 * @param {string} [module="global"] - the module path to register the class under.
 * @param {boolean} [autoDestructor=true] - should the class' destruct() be called when no instances in use?
 */
export function register (clazz: IInjectable & FunctionConstructor, module = "global", autoDestructor = true): void {

    // TODO Validate module path.

    const classId = clazz.DI_CLASS_ID || Date.now().toString(36) + "-" + Math.round(Math.random() * Number.MAX_SAFE_INTEGER).toString(36);
    const modPath = module.split(".");
    const dep: IDependency = {
        instance: null,
        clazz: null,
        autoDestructor: autoDestructor,
        count: 0,
        destructor: () => {},
    };

    // If class previously registered, check if already at the module path.
    if (clazz.DI_CLASS_ID !== undefined) {

        try {
            getInjectablesByModule(module, clazz);
            return;
        } catch (err) { /* Continue. No class found at that module path. */ }

    } else {
        // Assign unique ID to the Class object.
        Object.defineProperty(clazz, DI_CLASS_ID as any, { value: classId });
    }

    // Create a copy of the Class to preserve original destruct().
    const clazzCopy = Object.create(clazz.prototype);
    clazzCopy.prototype.constructor = clazz;

    // Assign the same unique ID to the Class copy object.
    Object.defineProperty(clazzCopy, DI_CLASS_ID as any, { value: classId });

    // If auto-destructor, override the original destruct() with counter and auto-destruct.
    const origDestruct = clazzCopy.prototype["destruct"];
    if (autoDestructor) {

        Object.defineProperty(clazzCopy.prototype, "destruct", {
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

    dep.clazz = clazzCopy;
    dep.destructor = () => {
        if (dep.instance) {
            origDestruct.call(dep.instance);
            dep.instance = null;
            dep.count = 0;
        }
    };

    DI_MAP.push( [ clazzCopy[DI_CLASS_ID], modPath, dep]);
}


export function unregister (clazz: IInjectable, module = "global", withDestruct = true): void {

    // TODO Validate module path.

    try {
        // Find Class objects under given module path.
        getInjectablesByModule(module, clazz).forEach(di => {
            // Remove from DI_MAP.
            DI_MAP.slice(DI_MAP.indexOf(di));
            // Cleanup the removed Class.
            if (withDestruct) {
                di[2].destructor();
            }
        });

    } catch (err) { /* Fail silently */ }
}
