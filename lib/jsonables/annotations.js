"use strict";
var lodash_1 = require("lodash");
var RE_PARAMS = /^[^(]+\(([$\w,\s]+)*\)/;
var IClassConfigDefaults = {
    autoNameGetters: true,
    undefinedToNull: true,
    ignoreNulls: false,
    toSnakeCase: false,
    toCamelCase: false,
    toKebabCase: false,
};
var jsonKey = Symbol("jsonKey");
exports.fromJSON = Symbol("fromJSON");
function Serializable(configs) {
    configs = Object.assign({}, IClassConfigDefaults, configs);
    return function (target) {
        var jsonKeyData = target.prototype[jsonKey];
        delete target.prototype[jsonKey];
        Object.defineProperty(target.prototype, "toJSON", {
            value: function () {
                var _this = this;
                return jsonKeyData.reduce(function (p, c) {
                    var value = c.transformers.reduce(function (p2, c2) { return c2.call(_this, p2); }, c.value.call(_this));
                    var key = (function (k) {
                        if (configs.autoNameGetters)
                            k = k.replace(/^get([\w])/i, function (a, b) { return b.toLowerCase(); });
                        if (configs.toCamelCase)
                            return lodash_1.camelCase(k);
                        if (configs.toSnakeCase)
                            return lodash_1.snakeCase(k);
                        if (configs.toKebabCase)
                            return lodash_1.kebabCase(k);
                        return k;
                    }(c.key));
                    if (configs.undefinedToNull && value === undefined)
                        p[key] = null;
                    else if (configs.ignoreNulls === false || (configs.ignoreNulls && value !== null))
                        p[key] = value;
                    return p;
                }, {});
            }
        });
    };
}
exports.Serializable = Serializable;
function serializeProperty(name) {
    var transformers = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        transformers[_i - 1] = arguments[_i];
    }
    return function (target, propertyKey) {
        assignJsonKey(target, name || propertyKey, function () { return this[propertyKey]; }, transformers);
    };
}
exports.serializeProperty = serializeProperty;
function serializeMethod(name) {
    var transformers = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        transformers[_i - 1] = arguments[_i];
    }
    return function (target, propertyKey, descriptor) {
        assignJsonKey(target, name || propertyKey, descriptor.value || descriptor.get, transformers);
    };
}
exports.serializeMethod = serializeMethod;
function serializeParam(name) {
    var transformers = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        transformers[_i - 1] = arguments[_i];
    }
    return function (target, propertyKey, parameterIndex) {
        var key = name || target.toString().match(RE_PARAMS)[1].split(',')[parameterIndex].trim();
        assignJsonKey(target.prototype, key, function () { return this[key]; }, transformers);
    };
}
exports.serializeParam = serializeParam;
function assignJsonKey(target, key, value, transformers) {
    target[jsonKey] = target[jsonKey] || [];
    target[jsonKey].push({ key: key, value: value, transformers: transformers });
}
//# sourceMappingURL=annotations.js.map