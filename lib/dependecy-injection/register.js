"use strict";
var module_1 = require("./module");
function register(clazz, module, autoDestructor) {
    if (module === void 0) { module = "global"; }
    if (autoDestructor === void 0) { autoDestructor = true; }
    var classId = clazz[module_1.DI_CLASS_ID] || Date.now().toString(36) + "-" + Math.round(Math.random() * Number.MAX_SAFE_INTEGER).toString(36);
    var modPath = module.split(".");
    var dep = {
        instance: null,
        clazz: null,
        autoDestructor: autoDestructor,
        count: 0,
        destructor: function () { },
    };
    if (clazz[module_1.DI_CLASS_ID] !== undefined) {
        try {
            module_1.getInjectablesByModule(module, clazz);
            return;
        }
        catch (err) { }
    }
    else {
        Object.defineProperty(clazz, module_1.DI_CLASS_ID, { value: classId });
    }
    var DepInjCopy = eval("( " + clazz + " )");
    DepInjCopy.prototype = Object.create(clazz.prototype);
    DepInjCopy.prototype.constructor = clazz;
    Object.defineProperty(DepInjCopy, module_1.DI_CLASS_ID, { value: classId });
    var origDestruct = DepInjCopy.prototype["destruct"];
    if (autoDestructor) {
        Object.defineProperty(DepInjCopy.prototype, "destruct", {
            value: function () {
                dep.count = Math.max(0, dep.count - 1);
                if (dep.count === 0 && dep.instance) {
                    origDestruct.call(dep.instance);
                    dep.instance = null;
                    return;
                }
            }
        });
    }
    dep.clazz = DepInjCopy;
    dep.destructor = function () {
        if (dep.instance) {
            origDestruct.call(dep.instance);
            dep.instance = null;
            dep.count = 0;
        }
    };
    module_1.DI_MAP.push([DepInjCopy[module_1.DI_CLASS_ID], modPath, dep]);
}
exports.register = register;
function unregister(clazz, module, withDestruct) {
    if (module === void 0) { module = "global"; }
    if (withDestruct === void 0) { withDestruct = true; }
    module_1.getInjectablesByModule(module, clazz).forEach(function (di) {
        module_1.DI_MAP.splice(module_1.DI_MAP.indexOf(di), 1);
        if (withDestruct) {
            di[2].destructor();
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