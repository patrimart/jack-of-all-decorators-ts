
import {
    IDependency,
    getInjectablesByModule
} from "./module";
import { register } from "./register";


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
        dependency.count = 0;
        // console.log("initClass 3", dependency.instance);
        dependency.destructor = dependency.instance.destruct;

        Object.defineProperty(dependency.instance, "destruct", {
            enumerable: true,
            value: function () {

                dependency.count = Math.max(0, dependency.count - 1);

                if (dependency.selfDestruct && dependency.count === 0 && dependency.instance) {
                    dependency.destructor();
                    dependency.instance = null;
                    return;
                }
            }
        });
    }

    dependency.count++;
    return dependency.instance;
}


export function injectable (target: any) {

    register(target);
}


export function inject (target: any, clazz: any, position: number) {

    const regTarget = register(target);
    register(clazz);

    while (regTarget.dependencies.length < position + 1) {
        regTarget.dependencies.push(undefined);
    }

    regTarget.dependencies[position] = clazz;
}


export function destruct <T> (module = "global", clazz?: any) {

    getInjectablesByModule(module, clazz)
        .forEach(depMap => {
            const d = depMap[2];
            if (d.instance) d.destructor.call(d.instance);
            d.instance = null;
            d.count = 0;
        });
}
