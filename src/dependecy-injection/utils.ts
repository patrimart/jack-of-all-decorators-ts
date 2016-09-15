
import { IDependency } from "./module";
import { register }    from "./register";


export function modularize <T> (clazz: any, module = "global"): T {

    const regClass = register(clazz, module);
    return initClass(regClass, module) as any as T;
}


function initClass (dependency: IDependency, module = "global"): any {

    if (dependency.instance === null) {
        // console.log("initClass 1", dependency, module);
        const instances: any = dependency.dependencies.map(d => d ? modularize(d, module) : d);
        // console.log("initClass 2", instances);
        dependency.instance = new (dependency.clazz)(...instances);
        // console.log("initClass 3", dependency.instance);

        const origDestruct = dependency.instance.destruct;
        Object.defineProperty(dependency.instance, "destruct", {
            enumerable: true,
            value: function () {

                dependency.count = Math.max(0, dependency.count - 1);

                if (dependency.selfDestruct && dependency.count === 0 && dependency.instance) {
                    origDestruct.call(this);
                    dependency.instance = null;
                    return;
                }
            }
        });
    }

    return dependency.instance;
}

// export function loadModule <T> (clazz: any): T {
//
//     // const dep = getInjectablesByClass(clazz)[0];
//     // console.log("loadModule", dep);
//     // if (! dep[2].instance) {
//     //     console.log("1");
//     //     dep[2].instance = new (dep[2].clazz)(clazz[DI_CLASS_MODULE]);
//     //     console.log("2", dep[2].instance);
//     // }
//     // console.log("loadModule instance", dep[2].instance);
//     // return dep[2].instance as any as T;
// }


export function injectable (target: any) {

    register(target);

    // const origConstructor = target.prototype.constructor;
    // console.log("injectable origConstructor", target, origConstructor);
    // target.prototype.constructor = function (module = "global") {
    //     console.log("injectable start constructor", target, module);
    //     const dependencies = (function (deps: any[]) {
    //
    //         deps.forEach(d => register(d, module));
    //         return deps
    //             .reduce((p, d) => p.concat(getInjectablesByModule(module, d)), [])
    //             .map((d: DIMap) => {
    //                 console.log("injectable 2", d);
    //                 if (!d[2].instance) {
    //                     d[2].instance = new (d[2].clazz)(module);
    //                 }
    //                 return d[2].instance;
    //             });
    //
    //     }(target[DI_CONSTRUCTOR_ARGS] || []));
    //     console.log("origConstructor", this, origConstructor, dependencies);
    //     return origConstructor.apply(this, dependencies);
    // };
}


export function inject (target: any, clazz: any, position: number) {

    const regTarget = register(target);
    register(clazz);

    while (regTarget.dependencies.length < position + 1) {
        regTarget.dependencies.push(undefined);
    }
    // console.log("inject ", regTarget.dependencies, position, clazz);
    regTarget.dependencies[position] = clazz;
}
