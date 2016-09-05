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
    function MyClass(conParam, _foo2, _bar2) {
        this.conParam = conParam;
        this._foo2 = _foo2;
        this._bar2 = _bar2;
        this.fooProp = "set foo prop";
        this._foo = "ignore private _foo";
        this._bar = "ignore private _bar";
    }
    Object.defineProperty(MyClass.prototype, "barSetGet", {
        get: function () {
            return this._bar + this._bar2;
        },
        set: function (v) {
            this._bar = v;
        },
        enumerable: true,
        configurable: true
    });
    MyClass.prototype.getFooMethod = function () {
        return this._foo + this._foo2;
    };
    MyClass.prototype.setFooMethod = function (v) {
        this._foo = v;
    };
    MyClass = __decorate([
        jsonables_1.Json.Serializable({
            defaultConstruction: [
                "set con param",
                "set _foo2 param",
                "set _bar2 param",
            ],
            autoNameGetters: true,
            toSnakeCase: true,
        })
    ], MyClass);
    return MyClass;
}());
describe("Jsonables Configs Serialization", function () {
    var c = new MyClass("set con param", "set _foo2 param", "set _bar2 param");
    it("serialize", function () {
        assert.deepEqual(JSON.parse(JSON.stringify(c)), {
            foo_prop: "set foo prop",
            con_param: "set con param",
            bar_set_get: "ignore private _barset _bar2 param",
            foo_method: "ignore private _fooset _foo2 param",
        });
    });
    it("deserialize", function () {
        var json = {
            foo_prop: "set foo prop",
            con_param: "set con param",
            bar_set_get: "ignore private _bar",
            foo_method: "ignore private _foo",
        };
        var d = jsonables_1.Json.Serializer.deserialize(MyClass, json);
        assert.equal(c.fooProp, d.fooProp, "c.fooProp(" + c.fooProp + ") !== d.fooProp(" + d.fooProp + ")");
        assert.equal(c.conParam, d.conParam);
        assert.equal(c.barSetGet, d.barSetGet, "c.barSetGet(" + c.barSetGet + ") !== d.barSetGet(" + d.barSetGet + ")");
        assert.equal(c.getFooMethod(), d.getFooMethod());
    });
});
