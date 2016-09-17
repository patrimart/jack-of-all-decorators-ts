"use strict";
var utils_1 = require("./utils");
function Inject(clazz) {
    return function (target, propertyKey, parameterIndex) {
        utils_1.inject(target, clazz, parameterIndex);
    };
}
exports.Inject = Inject;
function Injectable() {
    return function (target) {
        utils_1.injectable(target);
    };
}
exports.Injectable = Injectable;
//# sourceMappingURL=annotations.js.map