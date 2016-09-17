
import * as Module      from "./module";
import * as Register    from "./register";
import * as Utils       from "./utils";
import * as Annotations from "./annotations";

/**
 * The Depenency Injection namespace.
 */
export namespace DI {

    /**
     * @Injectable() annotation for classes.
     * Mark a class as an injectable dependency.
     */
    export const Injectable = Annotations.Injectable;

    /**
     * @Inject(Class) annotation for constructor params.
     * Instruct a constructor value to be injected with a class singleton instance.
     */
    export const Inject = Annotations.Inject;

    /**
     * IInjectable Interface.
     * Implement the IInjectable interface, requiring the destruct() method.
     */
    export type IInjectable = Module.IInjectable;

    /**
     * Initializes the given class as a singleton and all its injectable dependencies.
     * Optionally, scope the class to a given module namespace for easy cleanup.
     */
    export const Modularize = Utils.modularize;

    /**
     * Destroys the injectable dependencies by module namespace and, optionally, class.
     */
    export const Destruct = Utils.destruct;

    /**
     * Utility functions can be utilized instead of annotations.
     */
    export namespace utils {

        export const inject = Utils.inject;
        export const injectable = Utils.injectable;

        export const numRegistered = Register.numRegistered;
        export const numActive = Register.numActive;

        export const register = Register.register;
        export const unregister = Register.unregister;
    }
}
