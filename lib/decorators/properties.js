"use strict";
function setterGetter() {
    var decorators = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        decorators[_i - 0] = arguments[_i];
    }
    decorators = decorators.reverse();
    return function (target, propertyKey) {
        var propValue = target[propertyKey];
        Object.defineProperty(target, String(propertyKey), {
            configurable: false,
            enumerable: true,
            get: function () {
                var _this = this;
                if (decorators.length === 0) {
                    return propValue;
                }
                return decorators.reduce(function (v, f) {
                    var descriptor = { get: function () { return v; } };
                    f.call(_this, target, propertyKey, descriptor);
                    return descriptor.get();
                }, propValue);
            },
            set: function (value) {
                propValue = value;
            }
        });
    };
}
exports.setterGetter = setterGetter;
//# sourceMappingURL=properties.js.map