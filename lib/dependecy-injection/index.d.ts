import * as Module from "./module";
import * as Register from "./register";
export declare namespace DI {
    type IInjectable = Module.IInjectable;
    const register: typeof Register.register;
    const unregister: typeof Register.unregister;
}
