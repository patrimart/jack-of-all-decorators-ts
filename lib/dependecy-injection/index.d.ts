import * as Module from "./module";
import * as Register from "./register";
import * as Utils from "./utils";
import * as Annotations from "./annotations";
export declare namespace DI {
    const Injectable: typeof Annotations.Injectable;
    const Inject: typeof Annotations.Inject;
    type IInjectable = Module.IInjectable;
    const Modularize: typeof Utils.modularize;
    const Destruct: typeof Utils.destruct;
    namespace utils {
        const inject: typeof Utils.inject;
        const injectable: typeof Utils.injectable;
        const numRegistered: typeof Register.numRegistered;
        const numActive: typeof Register.numActive;
        const register: typeof Register.register;
        const unregister: typeof Register.unregister;
    }
}
