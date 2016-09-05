"use strict";
var lodash_1 = require("lodash");
var RE_PARAMS = /^[^(]+\(([$\w,\s]+)*\)/;
var RE_PROPS = /\sthis.([^_][$\w]+)\s*=/g;
var IClassConfigDefaults = {
    defaultConstruction: undefined,
    autoNameGetters: true,
    undefinedToNull: true,
    ignoreNulls: false,
    toSnakeCase: false,
    toCamelCase: false,
    toKebabCase: false,
};
exports.constArgs = Symbol("$$jsonConstArgs");
exports.jsonKey = Symbol("$$jsonKey");
exports.fromJSON = Symbol("$$fromJSON");
function Serializable(configs) {
    configs = Object.assign({}, IClassConfigDefaults, configs);
    function keyToJsonKey(k) {
        if (configs.autoNameGetters) {
            k = k.replace(/^get([\w])/i, function (a, b) { return b.toLowerCase(); });
            k = k.replace(/^set([\w])/i, function (a, b) { return b.toLowerCase(); });
        }
        if (configs.toCamelCase)
            return lodash_1.camelCase(k);
        if (configs.toSnakeCase)
            return lodash_1.snakeCase(k);
        if (configs.toKebabCase)
            return lodash_1.kebabCase(k);
        return k;
    }
    return function (target) {
        if (Array.isArray(configs.defaultConstruction) && configs.defaultConstruction.length > 0) {
            target.prototype[exports.constArgs] = configs.defaultConstruction;
        }
        if (target.prototype[exports.jsonKey] === undefined && target.prototype[exports.fromJSON] === undefined) {
            var classProps = void 0;
            var _loop_1 = function() {
                var prop = classProps[1];
                var key = keyToJsonKey(classProps[1]);
                classProps = undefined;
                assignJsonKey(target.prototype, key, function () { return this[prop]; }, []);
                assignFromJson(target.prototype, key, function (v) { this[prop] = v; }, []);
            };
            while ((classProps = RE_PROPS.exec(String(target))) !== null) {
                _loop_1();
            }
            for (var prop in target.prototype) {
                if (target.prototype.hasOwnProperty(prop)) {
                    var key = keyToJsonKey(prop);
                    var trg = target.prototype;
                    var descriptor = Object.getOwnPropertyDescriptor(trg, prop);
                    if (descriptor.value) {
                        if (prop.startsWith("set")) {
                            assignFromJson(trg, key, descriptor.value, []);
                        }
                        else if (prop.startsWith("get")) {
                            assignJsonKey(trg, key, descriptor.value, []);
                        }
                        else {
                            assignJsonKey(trg, key, descriptor.value, []);
                            assignFromJson(trg, key, descriptor.value, []);
                        }
                    }
                    else {
                        if (descriptor.set) {
                            assignFromJson(trg, key, descriptor.set, []);
                        }
                        if (descriptor.get) {
                            assignJsonKey(trg, key, descriptor.get, []);
                        }
                    }
                }
            }
        }
        if (target.prototype[exports.jsonKey] !== undefined) {
            var jsonKeyData_1 = target.prototype[exports.jsonKey];
            delete target.prototype[exports.jsonKey];
            Object.defineProperty(target.prototype, "toJSON", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: function () {
                    var _this = this;
                    return jsonKeyData_1.reduce(function (p, c) {
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
        }
        if (target.prototype[exports.fromJSON] !== undefined) {
            var fromJsonData_1 = target.prototype[exports.fromJSON];
            Object.defineProperty(target.prototype, exports.fromJSON, {
                configurable: false,
                enumerable: false,
                writable: false,
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
    };
}
exports.serializeProperty = serializeProperty;
function deserializeProperty(name) {
    var transformers = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        transformers[_i - 1] = arguments[_i];
    }
    return function (target, propertyKey) {
        assignFromJson(target, name || propertyKey, function (v) { this[propertyKey] = v; }, transformers);
    };
}
exports.deserializeProperty = deserializeProperty;
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
        assignFromJson(target, name || propertyKey, descriptor.value || descriptor.set, transformers);
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
    };
}
exports.serializeParam = serializeParam;
function deserializeParam(name) {
    var transformers = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        transformers[_i - 1] = arguments[_i];
    }
    return function (target, propertyKey, parameterIndex) {
        propertyKey = target.toString().match(RE_PARAMS)[1].split(',')[parameterIndex].trim();
        var key = name || propertyKey;
        assignFromJson(target.prototype, key, function (v) { this[propertyKey] = v; }, transformers);
    };
}
exports.deserializeParam = deserializeParam;
function assignJsonKey(target, key, value, transformers) {
    target[exports.jsonKey] = target[exports.jsonKey] || [];
    target[exports.jsonKey].push({ key: key, value: value, transformers: transformers });
}
function assignFromJson(target, key, value, transformers) {
    target[exports.fromJSON] = target[exports.fromJSON] || [];
    target[exports.fromJSON].push({ key: key, value: value, transformers: transformers });
}
//# sourceMappingURL=annotations.js.map