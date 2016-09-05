"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var assert = require("assert");
var jsonables_1 = require("../../lib/jsonables");
var MyClass = (function () {
    function MyClass(_fooPrivate, barPublic) {
        this._fooPrivate = _fooPrivate;
        this.barPublic = barPublic;
        this.bar = "bar";
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
    MyClass = __decorate([
        jsonables_1.Json.Serializable()
    ], MyClass);
    return MyClass;
}());
describe("Jsonables Default Serialization", function () {
    var c = new MyClass("fooPrivate", "barPublic");
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
