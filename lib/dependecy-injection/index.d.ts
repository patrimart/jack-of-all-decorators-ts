import * as Module from "./module";
import * as Register from "./register";
import * as Utils from "./utils";
export declare namespace DI {
    type IInjectable = Module.Injectable;
    namespace utils {
        const register: typeof Register.register;
        const unregister: typeof Register.unregister;
        const numRegistered: typeof Register.numRegistered;
        const inject: typeof Utils.inject;
        const injectable: typeof Utils.injectable;
        const modularize: typeof Utils.modularize;
    }
}
