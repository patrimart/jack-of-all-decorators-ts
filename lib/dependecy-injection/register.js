"use strict";
var module_1 = require("./module");
function register(clazz, module, autoDestructor) {
    if (module === void 0) { module = "global"; }
    if (autoDestructor === void 0) { autoDestructor = true; }
    var classId = clazz.DI_CLASS_ID || Date.now().toString(36) + "-" + Math.round(Math.random() * Number.MAX_SAFE_INTEGER).toString(36);
    var modPath = module.split(".");
    var dep = {
        instance: null,
        clazz: null,
        autoDestructor: autoDestructor,
        count: 0,
        destructor: function () { },
    };
    if (clazz.DI_CLASS_ID !== undefined) {
        try {
            module_1.getInjectablesByModule(module, clazz);
            return;
        }
        catch (err) { }
    }
    else {
        Object.defineProperty(clazz, module_1.DI_CLASS_ID, { value: classId });
    }
    var clazzCopy = Object.create(clazz.prototype);
    clazzCopy.prototype.constructor = clazz;
    Object.defineProperty(clazzCopy, module_1.DI_CLASS_ID, { value: classId });
    var origDestruct = clazzCopy.prototype["destruct"];
    if (autoDestructor) {
        Object.defineProperty(clazzCopy.prototype, "destruct", {
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
    dep.clazz = clazzCopy;
    dep.destructor = function () {
        if (dep.instance) {
            origDestruct.call(dep.instance);
            dep.instance = null;
            dep.count = 0;
        }
    };
    module_1.DI_MAP.push([clazzCopy[module_1.DI_CLASS_ID], modPath, dep]);
}
exports.register = register;
function unregister(clazz, module, withDestruct) {
    if (module === void 0) { module = "global"; }
    if (withDestruct === void 0) { withDestruct = true; }
    try {
        module_1.getInjectablesByModule(module, clazz).forEach(function (di) {
            module_1.DI_MAP.slice(module_1.DI_MAP.indexOf(di));
            if (withDestruct) {
                di[2].destructor();
            }
        });
    }
    catch (err) { }
}
exports.unregister = unregister;
//# sourceMappingURL=register.js.map