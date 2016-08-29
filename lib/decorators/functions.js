"use strict";
var lodash_1 = require("lodash");
var factories_1 = require("./factories");
function defensiveCopy(target, propertyKey, descriptor) {
    return factories_1.methodFactory(lodash_1.cloneDeep.bind(lodash_1.cloneDeep), descriptor);
}
exports.defensiveCopy = defensiveCopy;
function memoize(target, propertyKey, descriptor) {
    var memKey = Symbol(propertyKey);
    return factories_1.methodFactory(function (v) { return this[memKey] = this[memKey] || v; }, descriptor);
}
exports.memoize = memoize;
//# sourceMappingURL=functions.js.map