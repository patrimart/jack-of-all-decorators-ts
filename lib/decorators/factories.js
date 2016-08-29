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
//# sourceMappingURL=factories.js.map