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
var assert = require("assert");
var jsonables_1 = require("../../lib/jsonables");
var MyClass = (function () {
    function MyClass(conParam) {
        this.conParam = conParam;
        this.toBoolVal = "NO";
        this.toStringVal = 9876;
        this._foo = "ignore private _foo";
        this._bar = "ignore private _bar";
    }
    Object.defineProperty(MyClass.prototype, "barSetGet", {
        get: function () {
            return this._bar;
        },
        set: function (v) {
            this._bar = v;
        },
        enumerable: true,
        configurable: true
    });
    MyClass.prototype.getFooMethod = function () {
        return this._foo;
    };
    MyClass.prototype.setFooMethod = function (v) {
        this._foo = v;
    };
    __decorate([
        jsonables_1.Json.serializeProperty("foo", jsonables_1.Json.transformers.DefaultValue("default foo")),
        jsonables_1.Json.deserializeProperty("foo")
    ], MyClass.prototype, "fooProp", void 0);
    __decorate([
        jsonables_1.Json.serializeProperty("bool", jsonables_1.Json.transformers.ToBoolean),
        jsonables_1.Json.deserializeProperty("bool", jsonables_1.Json.transformers.ToString)
    ], MyClass.prototype, "toBoolVal", void 0);
    __decorate([
        jsonables_1.Json.serializeProperty("str", jsonables_1.Json.transformers.ToString),
        jsonables_1.Json.deserializeProperty("str", jsonables_1.Json.transformers.ToNumber)
    ], MyClass.prototype, "toStringVal", void 0);
    __decorate([
        jsonables_1.Json.serializeMethod("barBar", jsonables_1.Json.transformers.IsRequired),
        jsonables_1.Json.deserializeMethod("barBar", jsonables_1.Json.transformers.NotNullable)
    ], MyClass.prototype, "barSetGet", null);
    __decorate([
        jsonables_1.Json.serializeMethod("fooFoo", jsonables_1.Json.transformers.OverrideValue("override fooFoo"))
    ], MyClass.prototype, "getFooMethod", null);
    __decorate([
        jsonables_1.Json.deserializeMethod("fooFoo")
    ], MyClass.prototype, "setFooMethod", null);
    MyClass = __decorate([
        jsonables_1.Json.Serializable(),
        __param(0, jsonables_1.Json.serializeParam("con", jsonables_1.Json.transformers.ToNumber)),
        __param(0, jsonables_1.Json.deserializeParam("con", jsonables_1.Json.transformers.ToString))
    ], MyClass);
    return MyClass;
}());
describe("Jsonables Transformers Serialization", function () {
    var c = new MyClass("12345");
    it("serialize", function () {
        assert.deepEqual(JSON.parse(JSON.stringify(c)), {
            bool: false,
            str: "9876",
            foo: "default foo",
            con: 12345,
            barBar: "ignore private _bar",
            fooFoo: "override fooFoo",
        });
    });
    it("deserialize", function () {
        var json = {
            bool: false,
            str: "9876",
            foo: "default foo",
            con: 12345,
            barBar: "ignore private _bar",
            fooFoo: "override fooFoo",
        };
        var d = jsonables_1.Json.Serializer.deserialize(MyClass, json);
        assert.equal("false", d.toBoolVal, "c.fooProp(" + c.fooProp + ") !== d.fooProp(" + d.fooProp + ")");
        assert.equal(c.toStringVal, d.toStringVal);
        assert.equal("default foo", d.fooProp, "c.fooProp(" + c.fooProp + ") !== d.fooProp(" + d.fooProp + ")");
        assert.equal(c.conParam, d.conParam);
        assert.equal(c.barSetGet, d.barSetGet, "c.barSetGet(" + c.barSetGet + ") !== d.barSetGet(" + d.barSetGet + ")");
        assert.equal("override fooFoo", d.getFooMethod());
    });
});
