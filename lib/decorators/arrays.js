"use strict";
var factories_1 = require("./factories");
var lodash_1 = require("lodash");
function difference(target, propertyKey, descriptor) {
    return factories_1.methodFactory(function (arr) { return lodash_1.difference.apply(lodash_1.difference, arr); }, descriptor);
}
exports.difference = difference;
function differenceWith(equality) {
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactory(function (arr) { return lodash_1.differenceWith.call.apply(lodash_1.differenceWith, [lodash_1.differenceWith].concat(arr, [equality])); }, descriptor);
    };
}
exports.differenceWith = differenceWith;
function filterTruthy(target, propertyKey, descriptor) {
    return factories_1.methodFactory(lodash_1.compact.bind(lodash_1.compact), descriptor);
}
exports.filterTruthy = filterTruthy;
function flatten(target, propertyKey, descriptor) {
    return factories_1.methodFactory(lodash_1.flattenDeep.bind(lodash_1.flattenDeep), descriptor);
}
exports.flatten = flatten;
function fromTuples(target, propertyKey, descriptor) {
    return factories_1.methodFactory(lodash_1.fromPairs.bind(lodash_1.fromPairs), descriptor);
}
exports.fromTuples = fromTuples;
function intersection(target, propertyKey, descriptor) {
    return factories_1.methodFactory(function (arr) { return lodash_1.intersection.apply(lodash_1.intersection, arr); }, descriptor);
}
exports.intersection = intersection;
function intersectionWith(equality) {
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactory(function (arr) { return lodash_1.intersectionWith.call.apply(lodash_1.intersectionWith, [lodash_1.intersectionWith].concat(arr, [equality])); }, descriptor);
    };
}
exports.intersectionWith = intersectionWith;
function iterator(target, propertyKey, descriptor) {
    return factories_1.methodFactory(function (arr) { return arr[Symbol.iterator](); }, descriptor);
}
exports.iterator = iterator;
function mean(target, propertyKey, descriptor) {
    return factories_1.methodFactory(lodash_1.mean.bind(lodash_1.mean), descriptor);
}
exports.mean = mean;
function reverse(target, propertyKey, descriptor) {
    return factories_1.methodFactory(lodash_1.reverse.bind(lodash_1.reverse), descriptor);
}
exports.reverse = reverse;
function sample(target, propertyKey, descriptor) {
    return factories_1.methodFactory(lodash_1.sample.bind(lodash_1.sample), descriptor);
}
exports.sample = sample;
function shuffle(target, propertyKey, descriptor) {
    return factories_1.methodFactory(lodash_1.shuffle.bind(lodash_1.shuffle), descriptor);
}
exports.shuffle = shuffle;
function sort() {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i - 0] = arguments[_i];
    }
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactory(function (arr) { return lodash_1.sortBy.call(lodash_1.sortBy, arr, keys); }, descriptor);
    };
}
exports.sort = sort;
function sum(target, propertyKey, descriptor) {
    return factories_1.methodFactory(lodash_1.sum.bind(lodash_1.sum), descriptor);
}
exports.sum = sum;
function takeWhile(predicate) {
    return function (target, propertyKey, descriptor) {
        factories_1.methodFactory(function (arr) { return lodash_1.takeWhile.call(lodash_1.takeWhile, arr, predicate); }, descriptor);
    };
}
exports.takeWhile = takeWhile;
function union(target, propertyKey, descriptor) {
    return factories_1.methodFactory(function (arr) { return lodash_1.union.apply(lodash_1.union, arr); }, descriptor);
}
exports.union = union;
function unionWith(equality) {
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactory(function (arr) { return lodash_1.unionWith.call.apply(lodash_1.unionWith, [lodash_1.unionWith].concat(arr, [equality])); }, descriptor);
    };
}
exports.unionWith = unionWith;
function unique(target, propertyKey, descriptor) {
    return factories_1.methodFactory(lodash_1.uniq.bind(lodash_1.uniq), descriptor);
}
exports.unique = unique;
function uniqueWith(equality) {
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactory(function (arr) { return lodash_1.uniqWith.call(uniqueWith, arr, equality); }, descriptor);
    };
}
exports.uniqueWith = uniqueWith;
function xor(target, propertyKey, descriptor) {
    return factories_1.methodFactory(function (arr) { return lodash_1.xor.apply(lodash_1.xor, arr); }, descriptor);
}
exports.xor = xor;
function xorWith(equality) {
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactory(function (arr) { return lodash_1.xorWith.call.apply(lodash_1.xorWith, [lodash_1.xorWith].concat(arr, [equality])); }, descriptor);
    };
}
exports.xorWith = xorWith;
function unzip(target, propertyKey, descriptor) {
    return factories_1.methodFactory(lodash_1.unzip.bind(lodash_1.unzip), descriptor);
}
exports.unzip = unzip;
function zip(target, propertyKey, descriptor) {
    return factories_1.methodFactory(function (arr) { return lodash_1.zip.apply(lodash_1.zip, arr); }, descriptor);
}
exports.zip = zip;
//# sourceMappingURL=arrays.js.map