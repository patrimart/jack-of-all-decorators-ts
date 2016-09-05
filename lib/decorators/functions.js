"use strict";
var lodash_1 = require("lodash");
var factories_1 = require("./factories");
function debounce(wait, maxWait, leading, trailing) {
    if (maxWait === void 0) { maxWait = wait * 4; }
    if (leading === void 0) { leading = true; }
    if (trailing === void 0) { trailing = !leading; }
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactoryBind(function (func) {
            return lodash_1.debounce.call(this, func, wait, { maxWait: maxWait, leading: leading, trailing: trailing });
        }, propertyKey, descriptor);
    };
}
exports.debounce = debounce;
function curry(target, propertyKey, descriptor) {
    return factories_1.methodFactoryBind(function (func) {
        return lodash_1.curry.call(this, func);
    }, propertyKey, descriptor);
}
exports.curry = curry;
function defer(target, propertyKey, descriptor) {
    return factories_1.methodFactoryBind(function (func) {
        return lodash_1.defer.call(this, func);
    }, propertyKey, descriptor);
}
exports.defer = defer;
function delay(wait) {
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactoryBind(function (func) {
            return lodash_1.delay.call(this, func, wait);
        }, propertyKey, descriptor);
    };
}
exports.delay = delay;
function defensiveCopy(target, propertyKey, descriptor) {
    return factories_1.methodFactory(lodash_1.cloneDeep.bind(lodash_1.cloneDeep), descriptor);
}
exports.defensiveCopy = defensiveCopy;
function iterable(limit) {
    if (limit === void 0) { limit = Number.MAX_SAFE_INTEGER; }
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactoryBind(function (func) {
            return function () {
                var a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    a[_i - 0] = arguments[_i];
                }
                return (_a = {
                        next: function () { return { value: limit > 0 ? func.apply(this, a) : undefined, done: limit-- <= 0 }; }
                    },
                    _a[Symbol.iterator] = function () { return this; },
                    _a
                );
                var _a;
            };
        }, propertyKey, descriptor);
    };
}
exports.iterable = iterable;
function lazy(target, propertyKey, descriptor) {
    return factories_1.methodFactoryBind(function (func) {
        var cache;
        return function () {
            var a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                a[_i - 0] = arguments[_i];
            }
            return cache || (cache = func.bind.apply(func, [this].concat(a)));
        };
    }, propertyKey, descriptor);
}
exports.lazy = lazy;
function memoize(target, propertyKey, descriptor) {
    var memCache;
    return factories_1.methodFactoryBind(function (func) {
        return function () {
            var a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                a[_i - 0] = arguments[_i];
            }
            return memCache = memCache || func.apply(this, a);
        };
    }, propertyKey, descriptor);
}
exports.memoize = memoize;
function partial() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactoryBind(function (func) {
            return lodash_1.partial.call.apply(lodash_1.partial, [this, func].concat(args));
        }, propertyKey, descriptor);
    };
}
exports.partial = partial;
function rearg() {
    var indexes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        indexes[_i - 0] = arguments[_i];
    }
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactoryBind(function (func) {
            return lodash_1.rearg.call(this, func, indexes);
        }, propertyKey, descriptor);
    };
}
exports.rearg = rearg;
function throttle(wait, leading, trailing) {
    if (leading === void 0) { leading = true; }
    if (trailing === void 0) { trailing = !leading; }
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactoryBind(function (func) {
            return lodash_1.throttle.call(this, func, wait, { leading: leading, trailing: trailing });
        }, propertyKey, descriptor);
    };
}
exports.throttle = throttle;
function tryCatch(target, propertyKey, descriptor) {
    var func = function (f) {
        return function () {
            var a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                a[_i - 0] = arguments[_i];
            }
            try {
                return f.apply(this, a);
            }
            catch (err) {
                console.error("An error occurred on property \"" + propertyKey + "\".", err.stack);
                return undefined;
            }
        };
    };
    if (!!descriptor.value)
        descriptor.value = func(descriptor.value);
    else if (!!descriptor.get)
        descriptor.get = func(descriptor.get);
    else
        throw new TypeError("Only put a decorator on a method or get accessor.");
}
exports.tryCatch = tryCatch;
//# sourceMappingURL=functions.js.map