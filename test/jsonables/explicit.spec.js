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
    function MyClass(_fooPrivate, barPublic, barPublicIgnore) {
        this._fooPrivate = _fooPrivate;
        this.barPublic = barPublic;
        this.barPublicIgnore = barPublicIgnore;
        this.bar = "bar";
        this.barIgnore = "bar";
    }
    Object.defineProperty(MyClass.prototype, "fooProp", {
        get: function () {
            return this._fooPrivate;
        },
        set: function (v) {
            this._fooPrivate = v;
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
    MyClass.prototype.barInterface = function (v) {
        if (v === undefined)
            return this._bar;
        this._bar = v;
    };
    Object.defineProperty(MyClass.prototype, "fooPropIgnore", {
        get: function () {
            return this._fooPrivate;
        },
        set: function (v) {
            this._fooPrivate = v;
        },
        enumerable: true,
        configurable: true
    });
    MyClass.prototype.getFooMethodIgnore = function () {
        return this._foo;
    };
    MyClass.prototype.setFooMethodIgnore = function (v) {
        this._foo = v;
    };
    MyClass.prototype.barInterfaceIgnore = function (v) {
        if (v === undefined)
            return this._bar;
        this._bar = v;
    };
    __decorate([
        jsonables_1.Json.serializeProperty(),
        jsonables_1.Json.deserializeProperty()
    ], MyClass.prototype, "bar", void 0);
    __decorate([
        jsonables_1.Json.serializeMethod(),
        jsonables_1.Json.deserializeMethod()
    ], MyClass.prototype, "fooProp", null);
    __decorate([
        jsonables_1.Json.serializeMethod()
    ], MyClass.prototype, "getFooMethod", null);
    __decorate([
        jsonables_1.Json.deserializeMethod()
    ], MyClass.prototype, "setFooMethod", null);
    __decorate([
        jsonables_1.Json.serializeMethod(),
        jsonables_1.Json.deserializeMethod()
    ], MyClass.prototype, "barInterface", null);
    MyClass = __decorate([
        jsonables_1.Json.Serializable(),
        __param(1, jsonables_1.Json.serializeParam()),
        __param(1, jsonables_1.Json.deserializeParam())
    ], MyClass);
    return MyClass;
}());
describe("Jsonables Explicit Serialization", function () {
    var c = new MyClass("fooPrivate", "barPublic", "barPublicIgnore");
    c.setFooMethod("SetFooMethod");
    c.barInterface("set barInterface");
    it("serialize", function () {
        assert.deepEqual(JSON.parse(JSON.stringify(c)), { "barPublic": "barPublic", "bar": "bar", "fooProp": "fooPrivate", "fooMethod": "SetFooMethod", "barInterface": "set barInterface" });
    });
    it("deserialize", function () {
        var json = { "barPublic": "barPublic", "bar": "bar", "fooProp": "fooPrivate", "fooMethod": "SetFooMethod", "barInterface": "set barInterface" };
        var d = jsonables_1.Json.Serializer.deserialize(MyClass, json);
        assert.equal(c.bar, d.bar);
        assert.equal(c.barPublic, d.barPublic);
        assert.equal(c.fooProp, d.fooProp, "c.fooProp(" + c.fooProp + ") !== d.fooProp(" + d.fooProp + ")");
        assert.equal(c.getFooMethod(), d.getFooMethod());
    });
});
