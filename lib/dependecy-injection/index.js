"use strict";
var Register = require("./register");
var Utils = require("./utils");
var DI;
(function (DI) {
    var utils;
    (function (utils) {
        utils.register = Register.register;
        utils.unregister = Register.unregister;
        utils.numRegistered = Register.numRegistered;
        utils.numActive = Register.numActive;
        utils.inject = Utils.inject;
        utils.injectable = Utils.injectable;
        utils.modularize = Utils.modularize;
        utils.destruct = Utils.destruct;
    })(utils = DI.utils || (DI.utils = {}));
})(DI = exports.DI || (exports.DI = {}));
//# sourceMappingURL=index.js.map