"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var assert = require("assert");
var objects_1 = require("../../lib/decorators/objects");
var MyTest = (function () {
    function MyTest() {
    }
    MyTest.prototype.getAt = function () {
        return { 'a': [{ 'b': { 'c': 3 } }, 4] };
    };
    MyTest.prototype.getDefaults = function () {
        return { a: 1, c: 3, d: { d1: 1, d3: 3 } };
    };
    MyTest.prototype.getExtend = function () {
        return { a: 1, c: 3, d: { d1: 1, d3: 3 } };
    };
    MyTest.prototype.getIncludesArray = function () {
        return [1, 2, 3, 4, 5, 6];
    };
    MyTest.prototype.getIncludesObj = function () {
        return { x: 1, y: 2, z: 3 };
    };
    MyTest.prototype.getMapKeys = function () {
        return { x: 1, y: 2, z: 3 };
    };
    MyTest.prototype.getMapValues = function () {
        return { x: 1, y: 2, z: 3 };
    };
    MyTest.prototype.getOmit1 = function () {
        return { x: 1, y: 2, z: 3 };
    };
    MyTest.prototype.getOmit2 = function () {
        return { x: 1, y: 2, z: 3 };
    };
    MyTest.prototype.getOrderBy = function () {
        return [{ name: "Bob", age: 25 }, { name: "Jane", age: 18 }, { name: "Chris", age: 20 }];
    };
    MyTest.prototype.getToTuples = function () {
        return { x: 1, y: 2, z: 3 };
    };
    MyTest.prototype.getToValues = function () {
        return { x: 1, y: 2, z: 3 };
    };
    __decorate([
        objects_1.at(['a[0].b.c', 'a[1]'])
    ], MyTest.prototype, "getAt", null);
    __decorate([
        objects_1.defaults({ b: 2 }, { d: { d2: 2 } }, { a: 4 })
    ], MyTest.prototype, "getDefaults", null);
    __decorate([
        objects_1.extend({ b: 2 }, { d: { d2: 2 } }, { a: 4 })
    ], MyTest.prototype, "getExtend", null);
    __decorate([
        objects_1.includes(3)
    ], MyTest.prototype, "getIncludesArray", null);
    __decorate([
        objects_1.includes(2)
    ], MyTest.prototype, "getIncludesObj", null);
    __decorate([
        objects_1.mapKeys(function (v, k) { return k + v; })
    ], MyTest.prototype, "getMapKeys", null);
    __decorate([
        objects_1.mapValues(function (v) { return v * v; })
    ], MyTest.prototype, "getMapValues", null);
    __decorate([
        objects_1.omit(function (v, k) { return v % 2 === 0; })
    ], MyTest.prototype, "getOmit1", null);
    __decorate([
        objects_1.omit(["x", "y"])
    ], MyTest.prototype, "getOmit2", null);
    __decorate([
        objects_1.orderBy("age", "desc")
    ], MyTest.prototype, "getOrderBy", null);
    __decorate([
        objects_1.toTuples
    ], MyTest.prototype, "getToTuples", null);
    __decorate([
        objects_1.toValues
    ], MyTest.prototype, "getToValues", null);
    return MyTest;
}());
describe("Objects decorator", function () {
    var c = new MyTest();
    it("at", function () {
        assert.deepEqual(c.getAt(), [3, 4]);
    });
    it("defaults", function () {
        assert.deepEqual(c.getDefaults(), { a: 1, b: 2, c: 3, d: { d1: 1, d2: 2, d3: 3 } });
    });
    it("extends", function () {
        assert.deepEqual(c.getExtend(), { a: 4, b: 2, c: 3, d: { d2: 2 } });
    });
    it("includes", function () {
        assert.deepEqual(c.getIncludesArray(), true);
        assert.deepEqual(c.getIncludesObj(), true);
    });
    it("mapKeys", function () {
        assert.deepEqual(c.getMapKeys(), { x1: 1, y2: 2, z3: 3 });
    });
    it("mapValues", function () {
        assert.deepEqual(c.getMapValues(), { x: 1, y: 4, z: 9 });
    });
    it("omit", function () {
        assert.deepEqual(c.getOmit1(), { x: 1, z: 3 });
        assert.deepEqual(c.getOmit2(), { z: 3 });
    });
    it("orderBy", function () {
        assert.deepEqual(c.getOrderBy(), [{ name: "Bob", age: 25 }, { name: "Chris", age: 20 }, { name: "Jane", age: 18 }]);
    });
    it("toTuples", function () {
        assert.deepEqual(c.getToTuples(), [["x", 1], ["y", 2], ["z", 3]]);
    });
    it("toValues", function () {
        assert.deepEqual(c.getToValues(), [1, 2, 3]);
    });
});
