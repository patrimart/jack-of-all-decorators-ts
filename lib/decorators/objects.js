"use strict";
var factories_1 = require("./factories");
var lodash_1 = require("lodash");
function at(paths) {
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactory(function (o) { return lodash_1.at.call(lodash_1.at, o, paths); }, descriptor);
    };
}
exports.at = at;
function defaults() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i - 0] = arguments[_i];
    }
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactory(function (o) { return lodash_1.defaultsDeep.call.apply(lodash_1.defaultsDeep, [lodash_1.defaultsDeep, o].concat(sources)); }, descriptor);
    };
}
exports.defaults = defaults;
function extend() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i - 0] = arguments[_i];
    }
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactory(function (o) { return lodash_1.assign.call.apply(lodash_1.assign, [lodash_1.assign, o].concat(sources)); }, descriptor);
    };
}
exports.extend = extend;
function includes(searchValue, offset) {
    if (offset === void 0) { offset = 0; }
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactory(function (collection) { return lodash_1.includes.call(lodash_1.includes, collection, searchValue, offset); }, descriptor);
    };
}
exports.includes = includes;
function mapKeys(mapper) {
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactory(function (o) { return lodash_1.mapKeys.call(lodash_1.mapKeys, o, mapper); }, descriptor);
    };
}
exports.mapKeys = mapKeys;
function mapValues(mapper) {
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactory(function (o) { return lodash_1.mapValues.call(lodash_1.mapValues, o, mapper); }, descriptor);
    };
}
exports.mapValues = mapValues;
function omit(predicate) {
    var func = lodash_1.isFunction(predicate) ? lodash_1.omitBy : lodash_1.omit;
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactory(function (o) { return func.call(func, o, predicate); }, descriptor);
    };
}
exports.omit = omit;
function orderBy(iteratees, orders) {
    var i = iteratees.split(" ");
    var o = orders ? orders.split(" ") : undefined;
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactory(function (arr) { return lodash_1.orderBy.call(lodash_1.orderBy, arr, i, o); }, descriptor);
    };
}
exports.orderBy = orderBy;
function toTuples(target, propertyKey, descriptor) {
    return factories_1.methodFactory(lodash_1.toPairsIn.bind(lodash_1.toPairsIn), descriptor);
}
exports.toTuples = toTuples;
function toValues(target, propertyKey, descriptor) {
    return factories_1.methodFactory(lodash_1.valuesIn.bind(lodash_1.valuesIn), descriptor);
}
exports.toValues = toValues;
//# sourceMappingURL=objects.js.map