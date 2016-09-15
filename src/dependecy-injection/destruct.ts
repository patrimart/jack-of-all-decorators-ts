
import {
    getInjectablesByModule
} from "./module";

/**
 * Invokes destruct() on every dependency in query.
 * @param {string} [module="global] - the module path to search.
 * @param {*} [clazz] - the optional dependency filter.
 */
export function destruct (module = "global", clazz?: any): void {

    // TODO Validate module path.

    // Find Class objects under given module path.
    getInjectablesByModule(module, clazz).forEach(di => di[2].destructor());
}
