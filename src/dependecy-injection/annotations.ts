
import {inject, injectable} from "./utils";

/**
 * Annotation for constructor params to intject the given dependency.
 * @param {*} clazz - the Class to inject.
 */
export function Inject (clazz: any) {

    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {

        inject (target, clazz, parameterIndex);
    }
}


/**
 * Annotation for classes to prepare them as injectable dependencies.
 */
export function Injectable () {

    return function (target: any) {
        injectable(target);
    }
}
