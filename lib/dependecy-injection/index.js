"use strict";
var Register = require("./register");
var DI;
(function (DI) {
    DI.register = Register.register;
    DI.unregister = Register.unregister;
    DI.numRegistered = Register.numRegistered;
})(DI = exports.DI || (exports.DI = {}));
//# sourceMappingURL=index.js.map