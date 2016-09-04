"use strict";
function methodFactory(wrapper, descriptor) {
    var func = function (w, f) {
        return function () {
            var a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                a[_i - 0] = arguments[_i];
            }
            return w.call(this, f.apply(this, a));
        };
    };
    if (!!descriptor.value) {
        descriptor.value = func(wrapper, descriptor.value);
    }
    else if (!!descriptor.get) {
        descriptor.get = func(wrapper, descriptor.get);
    }
    else {
        throw new TypeError("Only put a decorator on a method or get accessor.");
    }
}
exports.methodFactory = methodFactory;
function methodFactoryBind(wrapper, propertyKey, descriptor) {
    var PROP_KEY_SYMBOLS = Symbol(propertyKey);
    var func = function (f) {
        return function () {
            var a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                a[_i - 0] = arguments[_i];
            }
            this[PROP_KEY_SYMBOLS] = this[PROP_KEY_SYMBOLS] || wrapper.call(this, f.bind(this));
            return typeof this[PROP_KEY_SYMBOLS] === "function" ? this[PROP_KEY_SYMBOLS].apply(this, a) : this[PROP_KEY_SYMBOLS];
        };
    };
    if (!!descriptor.value) {
        descriptor.value = func(descriptor.value);
    }
    else if (!!descriptor.get) {
        descriptor.get = func(descriptor.get);
    }
    else {
        throw new TypeError("Only put a decorator on a method or get accessor.");
    }
}
exports.methodFactoryBind = methodFactoryBind;
//# sourceMappingURL=factories.js.map