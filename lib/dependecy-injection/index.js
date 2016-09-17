"use strict";
var Register = require("./register");
var Utils = require("./utils");
var Annotations = require("./annotations");
var DI;
(function (DI) {
    DI.Injectable = Annotations.Injectable;
    DI.Inject = Annotations.Inject;
    DI.Modularize = Utils.modularize;
    DI.Destruct = Utils.destruct;
    var utils;
    (function (utils) {
        utils.inject = Utils.inject;
        utils.injectable = Utils.injectable;
        utils.numRegistered = Register.numRegistered;
        utils.numActive = Register.numActive;
        utils.register = Register.register;
        utils.unregister = Register.unregister;
    })(utils = DI.utils || (DI.utils = {}));
})(DI = exports.DI || (exports.DI = {}));
//# sourceMappingURL=index.js.map