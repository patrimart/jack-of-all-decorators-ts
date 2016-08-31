
import {
    curry, partial, iterator, iterable, lazy,
    at, extend, includes, mapKeys, mapValues, omit, orderBy,
    toTuples, toValues,
} from "../lib";

class MyClass {

    constructor (
        private foo: string
    ) {}

    public setFoo (v: string) {
        this.foo = v;
    }

    public getArray (): any {
        return [1, 3, 4, 5, 6];
    }

    @toValues
    public getObj() {
        return {a: 1, b: 2, c: [1, 2, 3]};
    }

    @iterable(5)
    public getRandom(): any {
        return Math.random();
    }

    @lazy
    public add (a, b, c: number) {
        console.log("Execute", a, b, c);
        return a + b + c;
    }

    @orderBy("user age")
    public getArrayOfObjects () {
        return [
            { 'user': 'fred',   'age': 48 },
            { 'user': 'barney', 'age': 34 },
            { 'user': 'fred',   'age': 40 },
            { 'user': 'barney', 'age': 36 }
        ];
    }
}

let c = new MyClass("foo");
console.log("getArray() =>", c.getArray());
// for (let a of c.getArray()) {
//     console.log("IT =>", a);
// }
console.log("getObject() =>", c.getObj());
console.log("getArrayOfObjects() =>", c.getArrayOfObjects());
const v = c.add(4, 5, 6);
console.log("add() =>", v());
let it = c.getRandom();
for (let i of it) {
    console.log(i);
}
