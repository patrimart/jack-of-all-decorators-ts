"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var lib_1 = require("../lib");
var MyClass = (function () {
    function MyClass(foo, arg, _class) {
        if (arg === void 0) { arg = "default"; }
        this.foo = foo;
        this.arg = arg;
        this._class = _class;
        this.bar = "12345";
    }
    MyClass.prototype.getFoo = function () {
        return this.foo;
    };
    MyClass.prototype.getClass = function () {
        return this._class;
    };
    __decorate([
        lib_1.Json.serializeProperty("barbar", lib_1.Json.transformers.OverrideValue("999"))
    ], MyClass.prototype, "bar", void 0);
    __decorate([
        lib_1.Json.serializeMethod()
    ], MyClass.prototype, "getFoo", null);
    __decorate([
        lib_1.Json.serializeMethod()
    ], MyClass.prototype, "getClass", null);
    MyClass = __decorate([
        lib_1.Json.Serializable(),
        __param(1, lib_1.Json.serializeParam())
    ], MyClass);
    return MyClass;
}());
var c = new MyClass(undefined);
c.bar = "9876";
var d = new MyClass("bar", "arguments", new MyClass("foobar"));
d.arg = "newDefault";
console.log("JSON =>", JSON.stringify(c.toJSON()));
console.log("JSON =>", JSON.stringify(d));
