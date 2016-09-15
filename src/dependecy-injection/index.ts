
import * as Module from "./module";
import * as Register from "./register";
import * as Utils from "./utils";

export namespace DI {

    export type IInjectable = Module.Injectable;


    export namespace utils {

        export const register = Register.register;
        export const unregister = Register.unregister;
        export const numRegistered = Register.numRegistered;
        export const inject = Utils.inject;
        export const injectable = Utils.injectable;
        export const modularize = Utils.modularize;
    }
}
