"use strict";
var module_1 = require("./module");
function register(clazz, module, selfDestruct) {
    if (module === void 0) { module = "global"; }
    if (selfDestruct === void 0) { selfDestruct = true; }
    var classId = clazz[module_1.DI_CLASS_ID] || Date.now().toString(36) + "-" + Math.round(Math.random() * Number.MAX_SAFE_INTEGER).toString(36);
    var modPath = module.trim().split(".");
    var dep = {
        instance: null,
        clazz: clazz,
        count: 0,
        dependencies: [],
        selfDestruct: selfDestruct,
        destructor: null,
    };
    if (clazz[module_1.DI_CLASS_ID] !== undefined) {
        try {
            return module_1.getInjectablesByModule(module, clazz)[0][2];
        }
        catch (err) {
            try {
                var regDep = module_1.getInjectablesByClass(clazz)[0][2];
                dep.dependencies = regDep.dependencies.slice(0);
            }
            catch (err2) { }
        }
    }
    else {
        Object.defineProperty(clazz, module_1.DI_CLASS_ID, { value: classId });
    }
    module_1.DI_MAP.push([classId, modPath, dep]);
    return dep;
}
exports.register = register;
function unregister(clazz, module, withDestruct) {
    if (module === void 0) { module = "global"; }
    if (withDestruct === void 0) { withDestruct = true; }
    module_1.getInjectablesByModule(module, clazz).forEach(function (di) {
        module_1.DI_MAP.splice(module_1.DI_MAP.indexOf(di), 1);
        if (withDestruct && di[2].instance) {
            di[2].instance.destruct();
        }
    });
}
exports.unregister = unregister;
function numRegistered(clazz, module) {
    try {
        if (clazz === undefined && module === undefined) {
            return module_1.DI_MAP.length;
        }
        if (clazz !== undefined && module === undefined) {
            return module_1.getInjectablesByClass(clazz).length;
        }
        return module_1.getInjectablesByModule(module, clazz).length;
    }
    catch (err) {
        return 0;
    }
}
exports.numRegistered = numRegistered;
//# sourceMappingURL=register.js.map