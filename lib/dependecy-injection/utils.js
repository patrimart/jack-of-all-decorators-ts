"use strict";
var register_1 = require("./register");
function modularize(clazz, module) {
    if (module === void 0) { module = "global"; }
    var regClass = register_1.register(clazz, module);
    return initClass(regClass, module);
}
exports.modularize = modularize;
function initClass(dependency, module) {
    if (module === void 0) { module = "global"; }
    if (dependency.instance === null) {
        var instances = dependency.dependencies.map(function (d) { return d ? modularize(d, module) : d; });
        dependency.instance = new ((_a = (dependency.clazz)).bind.apply(_a, [void 0].concat(instances)))();
        var origDestruct_1 = dependency.instance.destruct;
        Object.defineProperty(dependency.instance, "destruct", {
            enumerable: true,
            value: function () {
                dependency.count = Math.max(0, dependency.count - 1);
                if (dependency.selfDestruct && dependency.count === 0 && dependency.instance) {
                    origDestruct_1.call(this);
                    dependency.instance = null;
                    return;
                }
            }
        });
    }
    return dependency.instance;
    var _a;
}
function injectable(target) {
    register_1.register(target);
}
exports.injectable = injectable;
function inject(target, clazz, position) {
    var regTarget = register_1.register(target);
    register_1.register(clazz);
    while (regTarget.dependencies.length < position + 1) {
        regTarget.dependencies.push(undefined);
    }
    regTarget.dependencies[position] = clazz;
}
exports.inject = inject;
//# sourceMappingURL=utils.js.map