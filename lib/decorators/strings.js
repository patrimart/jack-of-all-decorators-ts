"use strict";
var factories_1 = require("./factories");
var lodash_1 = require("lodash");
function cast(caster) {
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactory(caster, descriptor);
    };
}
exports.cast = cast;
function escape(target, propertyKey, descriptor) {
    return factories_1.methodFactory(lodash_1.escape.bind(lodash_1.escape), descriptor);
}
exports.escape = escape;
function pad(len, chars) {
    if (chars === void 0) { chars = " "; }
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactory(function (str) { return lodash_1.pad.call(lodash_1.pad, str, len, chars); }, descriptor);
    };
}
exports.pad = pad;
function padLeft(len, chars) {
    if (chars === void 0) { chars = " "; }
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactory(function (str) { return lodash_1.padStart.call(lodash_1.padStart, str, len, chars); }, descriptor);
    };
}
exports.padLeft = padLeft;
function padRight(len, chars) {
    if (chars === void 0) { chars = " "; }
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactory(function (str) { return lodash_1.padEnd.call(lodash_1.padEnd, str, len, chars); }, descriptor);
    };
}
exports.padRight = padRight;
function repeat(n) {
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactory(function (str) { return lodash_1.repeat.call(lodash_1.repeat, str, n); }, descriptor);
    };
}
exports.repeat = repeat;
function truncate(length, omission, separator) {
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactory(function (str) { return lodash_1.truncate.call(lodash_1.truncate, str, { length: length, omission: omission, separator: separator }); }, descriptor);
    };
}
exports.truncate = truncate;
function trim(target, propertyKey, descriptor) {
    return factories_1.methodFactory(lodash_1.trim.bind(lodash_1.trim), descriptor);
}
exports.trim = trim;
function camelCase(target, propertyKey, descriptor) {
    return factories_1.methodFactory(lodash_1.camelCase.bind(lodash_1.camelCase), descriptor);
}
exports.camelCase = camelCase;
function kebabCase(target, propertyKey, descriptor) {
    return factories_1.methodFactory(lodash_1.kebabCase.bind(lodash_1.kebabCase), descriptor);
}
exports.kebabCase = kebabCase;
function snakeCase(target, propertyKey, descriptor) {
    return factories_1.methodFactory(lodash_1.snakeCase.bind(lodash_1.snakeCase), descriptor);
}
exports.snakeCase = snakeCase;
function startCase(target, propertyKey, descriptor) {
    return factories_1.methodFactory(lodash_1.startCase.bind(lodash_1.startCase), descriptor);
}
exports.startCase = startCase;
function titleCase(target, propertyKey, descriptor) {
    return factories_1.methodFactory(lodash_1.upperFirst.bind(lodash_1.upperFirst), descriptor);
}
exports.titleCase = titleCase;
function words(target, propertyKey, descriptor) {
    return factories_1.methodFactory(lodash_1.words.bind(lodash_1.words), descriptor);
}
exports.words = words;
//# sourceMappingURL=strings.js.map