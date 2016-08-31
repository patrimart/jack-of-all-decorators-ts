"use strict";
var lodash_1 = require("lodash");
function DefaultValue(value) {
    return function (v) {
        return v || value;
    };
}
exports.DefaultValue = DefaultValue;
function OverrideValue(value) {
    return function (v) {
        return value;
    };
}
exports.OverrideValue = OverrideValue;
function NotNullable(value) {
    if (value === null)
        throw new TypeError("The property cannot be null.");
    return value;
}
exports.NotNullable = NotNullable;
function IsRequired(value) {
    if (value === undefined)
        throw new ReferenceError("The property cannot be undefined.");
    return value;
}
exports.IsRequired = IsRequired;
function ToBoolean(value) {
    if (typeof value === "string")
        return !!value.trim().match(/^(false|0|no|off|\s*)$/i);
    if (Array.isArray(value) && value.length == 0)
        return false;
    if (typeof value === "object" && lodash_1.isEmpty(value))
        return false;
    return !!value;
}
exports.ToBoolean = ToBoolean;
function ToString(value) {
    if (value === undefined)
        return "undefined";
    return typeof value === "string" ? value : JSON.stringify(value);
}
exports.ToString = ToString;
function ToNumber(value) {
    return parseFloat(value) || 0;
}
exports.ToNumber = ToNumber;
//# sourceMappingURL=transformers.js.map