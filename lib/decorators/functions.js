"use strict";
var lodash_1 = require("lodash");
var factories_1 = require("./factories");
function debounce(maxWait, leading, trailing, wait) {
    if (leading === void 0) { leading = true; }
    if (trailing === void 0) { trailing = !leading; }
    if (wait === void 0) { wait = 0; }
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactoryBind(function (func) { return lodash_1.debounce.call(lodash_1.debounce, func, { maxWait: maxWait, leading: leading, trailing: trailing, wait: wait }); }, descriptor);
    };
}
exports.debounce = debounce;
function curry(target, propertyKey, descriptor) {
    return factories_1.methodFactoryBind(function (func) { return lodash_1.curry.call(lodash_1.curry, func); }, descriptor);
}
exports.curry = curry;
function defer(target, propertyKey, descriptor) {
    return factories_1.methodFactoryBind(function (func) { return lodash_1.defer.call(lodash_1.defer, func); }, descriptor);
}
exports.defer = defer;
function delay(wait) {
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactoryBind(function (func) { return lodash_1.delay.call(lodash_1.delay, func, wait); }, descriptor);
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
        return factories_1.methodFactoryBind(function (func) { return ((_a = {
                next: function () { return { value: limit > 0 ? func.call(func) : undefined, done: limit-- <= 0 }; }
            },
            _a[Symbol.iterator] = function () { return this; },
            _a
        )); var _a; }, descriptor);
    };
}
exports.iterable = iterable;
function lazy(target, propertyKey, descriptor) {
    return factories_1.methodFactoryBind(function (func) {
        var cache;
        return function () { return cache || (cache = func.call(func)); };
    }, descriptor);
}
exports.lazy = lazy;
function memoize(target, propertyKey, descriptor) {
    var memKey = Symbol(propertyKey);
    return factories_1.methodFactory(function (v) { return this[memKey] = this[memKey] || v; }, descriptor);
}
exports.memoize = memoize;
function partial() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactoryBind(function (func) { return lodash_1.curry.call(lodash_1.curry, func).apply(void 0, args); }, descriptor);
    };
}
exports.partial = partial;
function rearg() {
    var indexes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        indexes[_i - 0] = arguments[_i];
    }
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactoryBind(function (func) { return lodash_1.rearg.call(lodash_1.rearg, func, indexes); }, descriptor);
    };
}
exports.rearg = rearg;
function throttle(wait, leading, trailing) {
    if (leading === void 0) { leading = true; }
    if (trailing === void 0) { trailing = !leading; }
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactoryBind(function (func) { return lodash_1.throttle.call(lodash_1.throttle, func, { leading: leading, trailing: trailing, wait: wait }); }, descriptor);
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
                console.error("An error occurred on property \"" + propertyKey + "\".", err, err.stack);
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