"use strict";
var annotations_1 = require("./annotations");
var Serializer;
(function (Serializer) {
    function deserialize(clazz, json) {
        var c = Object.create(clazz.prototype);
        c[annotations_1.fromJSON].call(c, typeof json === "string" ? JSON.parse(json) : json);
        return c;
    }
    Serializer.deserialize = deserialize;
})(Serializer = exports.Serializer || (exports.Serializer = {}));
//# sourceMappingURL=Serializer.js.map