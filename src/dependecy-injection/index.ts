
import * as Module from "./module";
import * as Register from "./register";

export namespace DI {

    export type IInjectable = Module.IInjectable;

    export const register = Register.register;
    export const unregister = Register.unregister;
}
