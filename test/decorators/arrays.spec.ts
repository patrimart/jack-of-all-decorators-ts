
import assert = require("assert");

import {
    difference, differenceWith, filterTruthy, flatten, fromTuples,
    intersection, intersectionWith, iterator, mean, reverse, sample,
    shuffle, sort, sum, takeWhile, union, unionWith, unique, uniqueWith,
    xor, xorWith, zip, unzip,
} from "../../lib/decorators/arrays";


class MyTest {

    @difference
    public getDifference () {
        return [[1, 2, 3, 4], [3, 4, 5, 6]];
    }

    @differenceWith((a: any, b: any) => a.x === b.x)
    public getDifferenceWith() {
        return [[{x:1}, {x:2}, {x:3}, {x:4}], [{x:3}, {x:4}, {x:5}, {x:6}]];
    }

    @filterTruthy
    public getFilterTruthy () {
        return [1, 2, 0, undefined, 3, null, NaN, 4, false, 5];
    }

    @flatten
    public getFlatten () {
        return [1, 2, [3], [4, [5]]];
    }

    @fromTuples
    public getFromTuples () {
        return [["a", 1], ["b", 2], ["c", 3]];
    }

    @intersection
    public getIntersection () {
        return [[1, 2, 3, 4], [3, 4, 5, 6]];
    }

    @intersectionWith((a: any, b: any) => a.x === b.x)
    public getIntersectionWith() {
        return [[{x:1}, {x:2}, {x:3}, {x:4}], [{x:3}, {x:4}, {x:5}, {x:6}]];
    }

    @iterator
    public getIterator () {
        return [1, 2, 3, 4, 5, 6, 7, 8];
    }

    @mean
    public getMean () {
        return [2, 4, 6, 8, 10, 12];
    }

    @reverse
    public getReverse () {
        return [1, 2, 3, 4, 5];
    }

    @sample
    public getSample () {
        return [1, 1, 1, 1, 1, 1];
    }

    @shuffle
    public getShuffle () {
        return [1, 2, 3, 4, 5];
    }

    @sort("x")
    public getSort () {
        return [{x:7}, {x:2}, {x:6}, {x:8}, {x:3}, {x:4}, {x:1}, {x:5}];
    }

    @sum
    public getSum () {
        return [1, 2, 3, 4, 5];
    }

    @takeWhile((v: number) => v < 5)
    public getTakeWhile () {
        return [1, 2, 3, 4, 5, 6, 7, 8];
    }

    @union
    public getUnion () {
        return [[1, 2, 3, 4], [3, 4, 5, 6]];
    }

    @unionWith((a: any, b: any) => a.x === b.x)
    public getUnionWith () {
        return [[{x:1}, {x:2}, {x:3}, {x:4}], [{x:3}, {x:4}, {x:5}, {x:6}]];
    }

    @unique
    public getUnique () {
        return [1, 2, 3, 4, 1, 2, 3, 4];
    }

    @uniqueWith((a: any, b: any) => a.x === b.x)
    public getUniqueWith () {
        return [{x:1}, {x:2}, {x:3}, {x:4}, {x:3}, {x:4}, {x:5}, {x:6}];
    }

    @xor
    public getXor () {
        return [[1, 2, 3, 4, 5] , [4, 5, 6, 7, 8]];
    }

    @xorWith((a: any, b: any) => a.x === b.x)
    public getXorWith () {
        return [[{x:1}, {x:2}, {x:3}, {x:4}], [{x:3}, {x:4}, {x:5}, {x:6}]];
    }

    @zip
    public getZip () {
        return [[1, 2, 3], [true, false, true], ["a", "b", "c"]];
    }

    @unzip
    public getUnzip () {
        return [ [ 1, true, "a" ], [ 2, false, "b" ], [ 3, true, "c" ] ];
    }
}


describe ("Arrays decorators", function () {

    const c = new MyTest();

    it ("difference", function () {
        assert.deepEqual(c.getDifference(), [1, 2]);
    });

    it ("differenceWith", function () {
        assert.deepEqual(c.getDifferenceWith(), [{x:1}, {x:2}]);
    });

    it ("filterTruthy", function () {
        assert.deepEqual(c.getFilterTruthy(), [1, 2, 3, 4, 5]);
    });

    it ("flatten", function () {
        assert.deepEqual(c.getFlatten(), [1, 2, 3, 4, 5]);
    });

    it ("fromTuples", function () {
        assert.deepEqual(c.getFromTuples(), { a: 1, b: 2, c: 3 });
    });

    it ("intersection", function () {
        assert.deepEqual(c.getIntersection(), [3, 4]);
    });

    it ("intersectionWith", function () {
        assert.deepEqual(c.getIntersectionWith(), [{x:3}, {x:4}]);
    });

    it.skip("iterator");

    it ("mean", function () {
        assert.deepEqual(c.getMean(), 7);
    });

    it ("reverse", function () {
        assert.deepEqual(c.getReverse(), [5, 4, 3, 2, 1]);
    });

    it ("sample", function () {
        assert.deepEqual(c.getSample(), 1);
    });

    it ("shuffle", function () {
        assert.notDeepEqual(c.getShuffle(), [1, 2, 3, 4, 5]);
        assert.deepEqual(c.getShuffle().sort(), [1, 2, 3, 4, 5]);
    });

    it ("sort", function () {
        assert.deepEqual(c.getSort(), [{x:1}, {x:2}, {x:3}, {x:4}, {x:5}, {x:6}, {x:7}, {x:8}]);
    });

    it ("sum", function () {
        assert.deepEqual(c.getSum(), 15);
    });

    it ("takeWhile", function () {
        assert.deepEqual(c.getTakeWhile(), [1, 2, 3, 4]);
    });

    it ("union", function () {
        assert.deepEqual(c.getUnion(), [1, 2, 3, 4, 5, 6]);
    });

    it ("unionWith", function () {
        assert.deepEqual(c.getUnionWith(), [{x:1}, {x:2}, {x:3}, {x:4}, {x:5}, {x:6}]);
    });

    it ("unique", function () {
        assert.deepEqual(c.getUnique(), [1, 2, 3, 4]);
    });

    it ("uniqueWith", function () {
        assert.deepEqual(c.getUniqueWith(), [{x:1}, {x:2}, {x:3}, {x:4}, {x:5}, {x:6}]);
    });

    it ("xor", function () {
        assert.deepEqual(c.getXor(), [1, 2, 3, 6, 7, 8]);
    });

    it ("xorWith", function () {
        assert.deepEqual(c.getXorWith(), [{x:1}, {x:2}, {x:5}, {x:6}]);
    });

    it ("zip", function () {
        assert.deepEqual(c.getZip(), [ [ 1, true, "a" ], [ 2, false, "b" ], [ 3, true, "c" ] ]);
    });

    it ("unzip", function () {
        assert.deepEqual(c.getUnzip(), [[1, 2, 3], [true, false, true], ["a", "b", "c"]]);
    });
});
