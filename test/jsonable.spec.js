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
    function MyClass(foo, arg, nothing) {
        if (arg === void 0) { arg = "default"; }
        this.foo = foo;
        this.arg = arg;
        this.nothing = nothing;
        this.bar = "12345";
    }
    Object.defineProperty(MyClass.prototype, "booboo", {
        get: function () {
            return "h";
        },
        set: function (v) {
        },
        enumerable: true,
        configurable: true
    });
    MyClass.prototype.getFoo = function () {
        return this.foo;
    };
    MyClass.prototype.setFoo = function (v) {
        this.foo = v;
    };
    __decorate([
        lib_1.Json.serializeProperty("barbar"),
        // , Json.transformers.OverrideValue("999"))
        lib_1.Json.deserializeProperty("barbar")
    ], MyClass.prototype, "bar", void 0);
    __decorate([
        lib_1.Json.serializeMethod()
    ], MyClass.prototype, "getFoo", null);
    __decorate([
        lib_1.Json.deserializeMethod()
    ], MyClass.prototype, "setFoo", null);
    MyClass = __decorate([
        lib_1.Json.Serializable({
            defaultConstruction: ["foo", "noDefault", "nothing to see here"]
        }),
        __param(1, lib_1.Json.serializeParam()),
        __param(1, lib_1.Json.deserializeParam())
    ], MyClass);
    return MyClass;
}());
var c = new MyClass(undefined);
c.bar = "9876";
var d = new MyClass("bar", "arguments");
d.arg = "newDefault";
var json = c.toJSON();
console.log(c);
console.log("nothing =>", c.nothing);
console.log("JSON =>", JSON.stringify(json));
// const a: typeof MyClass = MyClass.prototype;
var clazz = lib_1.Json.Serializer.deserialize(MyClass, json, "foo", "noDefault", "nothing to see here");
console.log(clazz);
console.log("nothing =>", clazz.nothing);
console.log("bar=", clazz.bar, "getFoo=", clazz.getFoo(), "arg=", clazz.arg);
console.log(JSON.stringify(clazz.toJSON()));
