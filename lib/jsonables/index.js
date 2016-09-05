"use strict";
var jsonablesTransformers = require("./transformers");
var jsonablesSerializer = require("./Serializer");
var jsonablesAnnotations = require("./annotations");
var Json;
(function (Json) {
    Json.transformers = {
        DefaultValue: jsonablesTransformers.DefaultValue,
        OverrideValue: jsonablesTransformers.OverrideValue,
        NotNullable: jsonablesTransformers.NotNullable,
        IsRequired: jsonablesTransformers.IsRequired,
        ToBoolean: jsonablesTransformers.ToBoolean,
        ToString: jsonablesTransformers.ToString,
        ToNumber: jsonablesTransformers.ToNumber,
    };
    Json.Serializer = { deserialize: jsonablesSerializer.Serializer.deserialize };
    Json.Serializable = jsonablesAnnotations.Serializable;
    Json.serializeProperty = jsonablesAnnotations.serializeProperty;
    Json.deserializeProperty = jsonablesAnnotations.deserializeProperty;
    Json.serializeMethod = jsonablesAnnotations.serializeMethod;
    Json.deserializeMethod = jsonablesAnnotations.deserializeMethod;
    Json.serializeParam = jsonablesAnnotations.serializeParam;
    Json.deserializeParam = jsonablesAnnotations.deserializeParam;
})(Json = exports.Json || (exports.Json = {}));
//# sourceMappingURL=index.js.map