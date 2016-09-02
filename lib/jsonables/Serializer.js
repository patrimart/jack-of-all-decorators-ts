"use strict";
var annotations_1 = require("./annotations");
var Serializer;
(function (Serializer) {
    function deserialize(clazz, json) {
        var JsonableObject = (function () {
            function JsonableObject() {
            }
            return JsonableObject;
        }());
        JsonableObject.prototype = Object.create(clazz.prototype);
        var obj = new JsonableObject();
        obj.prototype = Object.create(clazz.prototype);
        obj.prototype[annotations_1.fromJSON].call(obj, typeof json === "string" ? JSON.parse(json) : json);
        return obj;
    }
    Serializer.deserialize = deserialize;
})(Serializer = exports.Serializer || (exports.Serializer = {}));
//# sourceMappingURL=Serializer.js.map