
import {
    defensiveCopy, memoize, mean, sum,
    difference, differenceWith, xor, xorWith,
    filterTruthy, flatten, fromTuples, intersection, unique, uniqueWith, reverse, shuffle, sort, takeWhile, union, unionWith, unzip, zip
} from "../lib";

class MyClass {

    constructor (
        private foo: string
    ) {}

    public setFoo (v: string) {
        this.foo = v;
    }

    @memoize
    public getFoo () {
        return this.foo;
    }

    @xor
    public getArray () {
        return [[1, 3, 4, 5], [4, 5, 6, 7]]; // [4, "", 7, 3, null, 8, 7, 0, 1, 1, 5, undefined, 7, 3, 78];
    }
    //
    // @unzip
    // @zip
    // public getArray () {
    //     return [['a', 'b'], [1, 2], [true, false]]; // [4, 7, 3, 8, 7, 0, 1, 1, 5, 7, 3, 78];
    // }

    @unique
    public get arr () {
        return [1, 1, 2, 3, 3, 3, 4, 5, 6, 6, 6, 7];
    }
}

let c = new MyClass("foo");
console.log("getFoo() =>", c.getFoo());
c.setFoo("bar");
console.log("getFoo() =>", c.getFoo());
console.log("getArray() =>", c.getArray());
console.log("arr =>", c.arr);

let d = new MyClass("foo2");
console.log("getFoo() =>", d.getFoo());
d.setFoo("bar2");
console.log("getFoo() =>", d.getFoo());
console.log("getArray() =>", d.getArray());
console.log("arr =>", d.arr);
