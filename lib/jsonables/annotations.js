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
exports.jsonKey = Symbol("$$jsonKey");
exports.fromJSON = Symbol("$$fromJSON");
function Serializable(configs) {
    configs = Object.assign({}, IClassConfigDefaults, configs);
    function keyToJsonKey(k) {
        if (configs.autoNameGetters)
            k = k.replace(/^get([\w])/i, function (a, b) { return b.toLowerCase(); });
        if (configs.toCamelCase)
            return lodash_1.camelCase(k);
        if (configs.toSnakeCase)
            return lodash_1.snakeCase(k);
        if (configs.toKebabCase)
            return lodash_1.kebabCase(k);
        return k;
    }
    return function (target) {
        var jsonKeyData = target.prototype[exports.jsonKey];
        delete target.prototype[exports.jsonKey];
        Object.defineProperty(target.prototype, "toJSON", {
            value: function () {
                var _this = this;
                return jsonKeyData.reduce(function (p, c) {
                    var value = c.transformers.reduce(function (p2, c2) { return c2.call(_this, p2); }, c.value.call(_this));
                    var key = keyToJsonKey(c.key);
                    if (configs.undefinedToNull && value === undefined)
                        p[key] = null;
                    else if (configs.ignoreNulls === false || (configs.ignoreNulls && value !== null))
                        p[key] = value;
                    return p;
                }, {});
            }
        });
        if (target.prototype[exports.fromJSON] !== undefined) {
            var fromJsonData_1 = target.prototype[exports.fromJSON];
            Object.defineProperty(target.prototype, exports.fromJSON, {
                value: function (value) {
                    var _this = this;
                    if (value === undefined || typeof value !== "object" || typeof value === "function") {
                        return undefined;
                    }
                    else if (value === null || Array.isArray(value)) {
                        return value;
                    }
                    fromJsonData_1
                        .forEach(function (data) {
                        var key = keyToJsonKey(data.key);
                        if (configs.undefinedToNull && value[key] === undefined)
                            return data.value.call(_this, null);
                        else if (configs.ignoreNulls === true && value[key] === null)
                            return;
                        data.value.call(_this, data.transformers.reduce(function (p, c) { return c.call(c, p); }, value[key]));
                    }, {});
                }
            });
        }
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
        assignFromJson(target, name || propertyKey, function (v) { this[propertyKey] = v; }, transformers);
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
function deserializeMethod(name) {
    var transformers = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        transformers[_i - 1] = arguments[_i];
    }
    return function (target, propertyKey, descriptor) {
        assignFromJson(target, name || propertyKey, descriptor.value || descriptor.get, transformers);
    };
}
exports.deserializeMethod = deserializeMethod;
function serializeParam(name) {
    var transformers = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        transformers[_i - 1] = arguments[_i];
    }
    return function (target, propertyKey, parameterIndex) {
        propertyKey = target.toString().match(RE_PARAMS)[1].split(',')[parameterIndex].trim();
        var key = name || propertyKey;
        assignJsonKey(target.prototype, key, function () { return this[propertyKey]; }, transformers);
        assignFromJson(target.prototype, key, function (v) { this[propertyKey] = v; }, transformers);
    };
}
exports.serializeParam = serializeParam;
function assignJsonKey(target, key, value, transformers) {
    target[exports.jsonKey] = target[exports.jsonKey] || [];
    target[exports.jsonKey].push({ key: key, value: value, transformers: transformers });
}
function assignFromJson(target, key, value, transformers) {
    target[exports.fromJSON] = target[exports.fromJSON] || [];
    target[exports.fromJSON].push({ key: key, value: value, transformers: transformers });
}
//# sourceMappingURL=annotations.js.map