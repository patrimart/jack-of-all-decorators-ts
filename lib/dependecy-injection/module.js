"use strict";
exports.DI_CLASS_ID = Symbol("di-class-id");
exports.DI_MAP = [];
function getInjectablesByClass(clazz) {
    if (clazz[exports.DI_CLASS_ID] === undefined) {
        throw new ReferenceError("The given class has not been registered.");
    }
    var di = exports.DI_MAP.filter(function (di) { return di[0] === clazz[exports.DI_CLASS_ID]; });
    if (di.length === 0) {
        throw new ReferenceError("The given registered class is no longer registered.");
    }
    return di;
}
exports.getInjectablesByClass = getInjectablesByClass;
function getInjectablesByModule(module, clazz) {
    if (module === "**" && clazz !== undefined) {
        return getInjectablesByClass(clazz);
    }
    var modParts = module.split(".");
    var di = exports.DI_MAP
        .filter(function (di) {
        var lastModPart;
        return di[1].length >= modParts.length && di[1].every(function (d, i) {
            lastModPart = modParts[i] || lastModPart;
            return modParts[i] === "*" || d === modParts[i] || lastModPart === "**";
        });
    })
        .filter(function (di) {
        return clazz === undefined || di[0] === clazz[exports.DI_CLASS_ID];
    });
    if (di.length === 0) {
        throw new ReferenceError("No classes have been registered under the module path \"" + module + "\".");
    }
    return di;
}
exports.getInjectablesByModule = getInjectablesByModule;
//# sourceMappingURL=module.js.map