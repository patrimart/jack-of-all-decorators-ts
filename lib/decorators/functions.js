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
function memoize(target, propertyKey, descriptor) {
    var memKey = Symbol(propertyKey);
    return factories_1.methodFactory(function (v) { return this[memKey] = this[memKey] || v; }, descriptor);
}
exports.memoize = memoize;
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