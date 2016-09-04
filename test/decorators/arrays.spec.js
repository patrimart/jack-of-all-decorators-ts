"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var assert = require("assert");
var arrays_1 = require("../../lib/decorators/arrays");
var MyTest = (function () {
    function MyTest() {
    }
    MyTest.prototype.getDifference = function () {
        return [[1, 2, 3, 4], [3, 4, 5, 6]];
    };
    MyTest.prototype.getDifferenceWith = function () {
        return [[{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }], [{ x: 3 }, { x: 4 }, { x: 5 }, { x: 6 }]];
    };
    MyTest.prototype.getFilterTruthy = function () {
        return [1, 2, 0, undefined, 3, null, NaN, 4, false, 5];
    };
    MyTest.prototype.getFlatten = function () {
        return [1, 2, [3], [4, [5]]];
    };
    MyTest.prototype.getFromTuples = function () {
        return [["a", 1], ["b", 2], ["c", 3]];
    };
    MyTest.prototype.getIntersection = function () {
        return [[1, 2, 3, 4], [3, 4, 5, 6]];
    };
    MyTest.prototype.getIntersectionWith = function () {
        return [[{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }], [{ x: 3 }, { x: 4 }, { x: 5 }, { x: 6 }]];
    };
    MyTest.prototype.getIterator = function () {
        return [1, 2, 3, 4, 5, 6, 7, 8];
    };
    MyTest.prototype.getMean = function () {
        return [2, 4, 6, 8, 10, 12];
    };
    MyTest.prototype.getReverse = function () {
        return [1, 2, 3, 4, 5];
    };
    MyTest.prototype.getSample = function () {
        return [1, 1, 1, 1, 1, 1];
    };
    MyTest.prototype.getShuffle = function () {
        return [1, 2, 3, 4, 5];
    };
    MyTest.prototype.getSort = function () {
        return [{ x: 7 }, { x: 2 }, { x: 6 }, { x: 8 }, { x: 3 }, { x: 4 }, { x: 1 }, { x: 5 }];
    };
    MyTest.prototype.getSum = function () {
        return [1, 2, 3, 4, 5];
    };
    MyTest.prototype.getTakeWhile = function () {
        return [1, 2, 3, 4, 5, 6, 7, 8];
    };
    MyTest.prototype.getUnion = function () {
        return [[1, 2, 3, 4], [3, 4, 5, 6]];
    };
    MyTest.prototype.getUnionWith = function () {
        return [[{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }], [{ x: 3 }, { x: 4 }, { x: 5 }, { x: 6 }]];
    };
    MyTest.prototype.getUnique = function () {
        return [1, 2, 3, 4, 1, 2, 3, 4];
    };
    MyTest.prototype.getUniqueWith = function () {
        return [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 3 }, { x: 4 }, { x: 5 }, { x: 6 }];
    };
    MyTest.prototype.getXor = function () {
        return [[1, 2, 3, 4, 5], [4, 5, 6, 7, 8]];
    };
    MyTest.prototype.getXorWith = function () {
        return [[{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }], [{ x: 3 }, { x: 4 }, { x: 5 }, { x: 6 }]];
    };
    MyTest.prototype.getZip = function () {
        return [[1, 2, 3], [true, false, true], ["a", "b", "c"]];
    };
    MyTest.prototype.getUnzip = function () {
        return [[1, true, "a"], [2, false, "b"], [3, true, "c"]];
    };
    __decorate([
        arrays_1.difference
    ], MyTest.prototype, "getDifference", null);
    __decorate([
        arrays_1.differenceWith(function (a, b) { return a.x === b.x; })
    ], MyTest.prototype, "getDifferenceWith", null);
    __decorate([
        arrays_1.filterTruthy
    ], MyTest.prototype, "getFilterTruthy", null);
    __decorate([
        arrays_1.flatten
    ], MyTest.prototype, "getFlatten", null);
    __decorate([
        arrays_1.fromTuples
    ], MyTest.prototype, "getFromTuples", null);
    __decorate([
        arrays_1.intersection
    ], MyTest.prototype, "getIntersection", null);
    __decorate([
        arrays_1.intersectionWith(function (a, b) { return a.x === b.x; })
    ], MyTest.prototype, "getIntersectionWith", null);
    __decorate([
        arrays_1.iterator
    ], MyTest.prototype, "getIterator", null);
    __decorate([
        arrays_1.mean
    ], MyTest.prototype, "getMean", null);
    __decorate([
        arrays_1.reverse
    ], MyTest.prototype, "getReverse", null);
    __decorate([
        arrays_1.sample
    ], MyTest.prototype, "getSample", null);
    __decorate([
        arrays_1.shuffle
    ], MyTest.prototype, "getShuffle", null);
    __decorate([
        arrays_1.sort("x")
    ], MyTest.prototype, "getSort", null);
    __decorate([
        arrays_1.sum
    ], MyTest.prototype, "getSum", null);
    __decorate([
        arrays_1.takeWhile(function (v) { return v < 5; })
    ], MyTest.prototype, "getTakeWhile", null);
    __decorate([
        arrays_1.union
    ], MyTest.prototype, "getUnion", null);
    __decorate([
        arrays_1.unionWith(function (a, b) { return a.x === b.x; })
    ], MyTest.prototype, "getUnionWith", null);
    __decorate([
        arrays_1.unique
    ], MyTest.prototype, "getUnique", null);
    __decorate([
        arrays_1.uniqueWith(function (a, b) { return a.x === b.x; })
    ], MyTest.prototype, "getUniqueWith", null);
    __decorate([
        arrays_1.xor
    ], MyTest.prototype, "getXor", null);
    __decorate([
        arrays_1.xorWith(function (a, b) { return a.x === b.x; })
    ], MyTest.prototype, "getXorWith", null);
    __decorate([
        arrays_1.zip
    ], MyTest.prototype, "getZip", null);
    __decorate([
        arrays_1.unzip
    ], MyTest.prototype, "getUnzip", null);
    return MyTest;
}());
describe("Arrays decorators", function () {
    var c = new MyTest();
    it("difference", function () {
        assert.deepEqual(c.getDifference(), [1, 2]);
    });
    it("differenceWith", function () {
        assert.deepEqual(c.getDifferenceWith(), [{ x: 1 }, { x: 2 }]);
    });
    it("filterTruthy", function () {
        assert.deepEqual(c.getFilterTruthy(), [1, 2, 3, 4, 5]);
    });
    it("flatten", function () {
        assert.deepEqual(c.getFlatten(), [1, 2, 3, 4, 5]);
    });
    it("fromTuples", function () {
        assert.deepEqual(c.getFromTuples(), { a: 1, b: 2, c: 3 });
    });
    it("intersection", function () {
        assert.deepEqual(c.getIntersection(), [3, 4]);
    });
    it("intersectionWith", function () {
        assert.deepEqual(c.getIntersectionWith(), [{ x: 3 }, { x: 4 }]);
    });
    it.skip("iterator");
    it("mean", function () {
        assert.deepEqual(c.getMean(), 7);
    });
    it("reverse", function () {
        assert.deepEqual(c.getReverse(), [5, 4, 3, 2, 1]);
    });
    it("sample", function () {
        assert.deepEqual(c.getSample(), 1);
    });
    it("shuffle", function () {
        assert.notDeepEqual(c.getShuffle(), [1, 2, 3, 4, 5]);
        assert.deepEqual(c.getShuffle().sort(), [1, 2, 3, 4, 5]);
    });
    it("sort", function () {
        assert.deepEqual(c.getSort(), [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 5 }, { x: 6 }, { x: 7 }, { x: 8 }]);
    });
    it("sum", function () {
        assert.deepEqual(c.getSum(), 15);
    });
    it("takeWhile", function () {
        assert.deepEqual(c.getTakeWhile(), [1, 2, 3, 4]);
    });
    it("union", function () {
        assert.deepEqual(c.getUnion(), [1, 2, 3, 4, 5, 6]);
    });
    it("unionWith", function () {
        assert.deepEqual(c.getUnionWith(), [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 5 }, { x: 6 }]);
    });
    it("unique", function () {
        assert.deepEqual(c.getUnique(), [1, 2, 3, 4]);
    });
    it("uniqueWith", function () {
        assert.deepEqual(c.getUniqueWith(), [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 5 }, { x: 6 }]);
    });
    it("xor", function () {
        assert.deepEqual(c.getXor(), [1, 2, 3, 6, 7, 8]);
    });
    it("xorWith", function () {
        assert.deepEqual(c.getXorWith(), [{ x: 1 }, { x: 2 }, { x: 5 }, { x: 6 }]);
    });
    it("zip", function () {
        assert.deepEqual(c.getZip(), [[1, true, "a"], [2, false, "b"], [3, true, "c"]]);
    });
    it("unzip", function () {
        assert.deepEqual(c.getUnzip(), [[1, 2, 3], [true, false, true], ["a", "b", "c"]]);
    });
});
