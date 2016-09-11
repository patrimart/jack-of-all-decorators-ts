"use strict";
exports.DI_CLASS_ID = Symbol("di-class-id");
exports.DI_MAP = [];
function getInjectablesByClass(clazz) {
    if (clazz.DI_CLASS_ID === undefined) {
        throw new ReferenceError("The given class has not been registered.");
    }
    var di = exports.DI_MAP.filter(function (di) { return di[0] === clazz.DI_CLASS_ID; });
    if (di.length === 0) {
        throw new ReferenceError("The given registered class is no longer registered.");
    }
    return di;
}
exports.getInjectablesByClass = getInjectablesByClass;
function getInjectablesByModule(module, clazz) {
    if (module === "*" && clazz !== undefined) {
        return getInjectablesByClass(clazz);
    }
    var modParts = module.split(".");
    var di = exports.DI_MAP.filter(function (di) { return di[1].every(function (d, i) { return d === "*" || d === modParts[i]; }); }).filter(function (di) { return clazz === undefined || di[0] === clazz.DI_CLASS_ID; });
    if (di.length === 0) {
        throw new ReferenceError("No classes have been registered under the given module path.");
    }
    return di;
}
exports.getInjectablesByModule = getInjectablesByModule;
function serialize() {
    return JSON.stringify(exports.DI_MAP.map(function (di) { return [
        di[0],
        di[1],
        {
            instance: null,
            clazz: String(di[2].clazz),
            autoDestructor: di[2].autoDestructor,
            count: 0,
            destructor: String(di[2].destructor),
        }
    ]; }));
}
exports.serialize = serialize;
//# sourceMappingURL=module.js.map