
import assert = require("assert");

import {
    at, defaults, extend, includes, mapKeys, mapValues,
    omit, orderBy, toTuples, toValues,
} from "../../lib/decorators/objects";


class MyTest {

    @at(['a[0].b.c', 'a[1]'])
    public getAt () {
        return { 'a': [{ 'b': { 'c': 3 } }, 4] };
    }

    @defaults({b: 2}, {d: {d2: 2}}, {a: 4})
    public getDefaults () {
        return { a: 1, c: 3, d: {d1: 1, d3: 3}};
    }

    @extend({b: 2}, {d: {d2: 2}}, {a: 4})
    public getExtend() {
        return { a: 1, c: 3, d: {d1: 1, d3: 3}};
    }

    @includes(3)
    public getIncludesArray () {
        return [1, 2, 3, 4, 5, 6];
    }

    @includes(2)
    public getIncludesObj () {
        return {x: 1, y: 2, z: 3};
    }

    @mapKeys((v: number, k: string) => k + v)
    public getMapKeys () {
        return {x: 1, y: 2, z: 3};
    }

    @mapValues((v: number) => v * v)
    public getMapValues () {
        return {x: 1, y: 2, z: 3};
    }

    @omit((v: any, k: string) => v % 2 === 0)
    public getOmit1 () {
        return {x: 1, y: 2, z: 3};
    }

    @omit(["x", "y"])
    public getOmit2 () {
        return {x: 1, y: 2, z: 3};
    }

    @orderBy("age", "desc")
    public getOrderBy () {
        return [{name: "Bob", age: 25}, {name: "Jane", age: 18}, {name: "Chris", age: 20}];
    }

    @toTuples
    public getToTuples () {
        return {x: 1, y: 2, z: 3};
    }

    @toValues
    public getToValues () {
        return {x: 1, y: 2, z: 3};
    }
}


describe ("Objects decorator", function () {

    const c = new MyTest();

    it ("at", function () {
        assert.deepEqual(c.getAt(), [3, 4]);
    });

    it ("defaults", function () {
        assert.deepEqual(c.getDefaults(), { a: 1, b: 2, c: 3, d: {d1: 1, d2: 2, d3: 3}});
    });

    it ("extends", function () {
        assert.deepEqual(c.getExtend(), { a: 4, b: 2, c: 3, d: {d2: 2}});
    });

    it ("includes", function () {
        assert.deepEqual(c.getIncludesArray(), true);
        assert.deepEqual(c.getIncludesObj(), true);
    });

    it ("mapKeys", function () {
        assert.deepEqual(c.getMapKeys(), {x1: 1, y2: 2, z3: 3});
    });

    it ("mapValues", function () {
        assert.deepEqual(c.getMapValues(), {x: 1, y: 4, z: 9});
    });

    it ("omit", function () {
        assert.deepEqual(c.getOmit1(), {x: 1, z: 3});
        assert.deepEqual(c.getOmit2(), {z: 3});
    });

    it ("orderBy", function () {
        assert.deepEqual(c.getOrderBy(), [{name: "Bob", age: 25}, {name: "Chris", age: 20}, {name: "Jane", age: 18}]);
    });

    it ("toTuples", function () {
        assert.deepEqual(c.getToTuples(), [["x", 1], ["y", 2], ["z", 3]]);
    });

    it ("toValues", function () {
        assert.deepEqual(c.getToValues(), [1, 2, 3]);
    });
});
