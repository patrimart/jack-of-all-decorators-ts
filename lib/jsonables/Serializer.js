"use strict";
var annotations_1 = require("./annotations");
var Serializer;
(function (Serializer) {
    function deserialize(Clazz, json) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        args = (args.length && args) || Clazz.prototype[annotations_1.constArgs] || [];
        var obj = args.length === 0 ? Object.create(Clazz.prototype) : new (Clazz.bind.apply(Clazz, [void 0].concat(args)))();
        obj[annotations_1.fromJSON].call(obj, typeof json === "string" ? JSON.parse(json) : json);
        return obj;
    }
    Serializer.deserialize = deserialize;
})(Serializer = exports.Serializer || (exports.Serializer = {}));
//# sourceMappingURL=Serializer.js.map