"use strict";
var dateFormatter = require("dateformat");
var factories_1 = require("./factories");
function dateFormat(mask, isUTC) {
    if (mask === void 0) { mask = undefined; }
    if (isUTC === void 0) { isUTC = false; }
    return function (target, propertyKey, descriptor) {
        return factories_1.methodFactory(function (date) { return dateFormatter.call(dateFormatter, date, mask, isUTC); }, descriptor);
    };
}
exports.dateFormat = dateFormat;
//# sourceMappingURL=dates.js.map