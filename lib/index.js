"use strict";
var jsonablesTransformersBasics = require("./jsonables/transformers/basics");
var jsonablesSerializer = require("./jsonables/Serializer");
var jsonablesAnnotations = require("./jsonables/annotations");
var Json;
(function (Json) {
    Json.transformers = {
        DefaultValue: jsonablesTransformersBasics.DefaultValue,
        OverrideValue: jsonablesTransformersBasics.OverrideValue,
        NotNullable: jsonablesTransformersBasics.NotNullable,
        IsRequired: jsonablesTransformersBasics.IsRequired,
        ToBoolean: jsonablesTransformersBasics.ToBoolean,
        ToString: jsonablesTransformersBasics.ToString,
        ToNumber: jsonablesTransformersBasics.ToNumber,
    };
    Json.Serializer = jsonablesSerializer.Serializer;
    Json.Serializable = jsonablesAnnotations.Serializable;
    Json.serializeProperty = jsonablesAnnotations.serializeProperty;
    Json.serializeMethod = jsonablesAnnotations.serializeMethod;
    Json.serializeParam = jsonablesAnnotations.serializeParam;
})(Json = exports.Json || (exports.Json = {}));
var functions_1 = require("./decorators/functions");
exports.defensiveCopy = functions_1.defensiveCopy;
exports.memoize = functions_1.memoize;
var arrays_1 = require("./decorators/arrays");
exports.difference = arrays_1.difference;
exports.differenceWith = arrays_1.differenceWith;
exports.filterTruthy = arrays_1.filterTruthy;
exports.flatten = arrays_1.flatten;
exports.fromTuples = arrays_1.fromTuples;
exports.intersection = arrays_1.intersection;
exports.intersectionWith = arrays_1.intersectionWith;
exports.mean = arrays_1.mean;
exports.reverse = arrays_1.reverse;
exports.shuffle = arrays_1.shuffle;
exports.sort = arrays_1.sort;
exports.sum = arrays_1.sum;
exports.takeWhile = arrays_1.takeWhile;
exports.union = arrays_1.union;
exports.unionWith = arrays_1.unionWith;
exports.unique = arrays_1.unique;
exports.uniqueWith = arrays_1.uniqueWith;
exports.unzip = arrays_1.unzip;
exports.zip = arrays_1.zip;
exports.xor = arrays_1.xor;
exports.xorWith = arrays_1.xorWith;
//# sourceMappingURL=index.js.map