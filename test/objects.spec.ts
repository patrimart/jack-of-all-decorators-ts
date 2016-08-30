
import {
    curry, partial, iterator,
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

    @iterator
    public getArray () {
        return [1, 3, 4, 5, 6];
    }

    @toValues
    public getObj() {
        return {a: 1, b: 2, c: [1, 2, 3]};
    }

    @partial(1, 2)
    public add (a?, b?, c?: number) {
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
console.log("getArray() =>", (c.getArray() as any).next().value);
// for (let a of c.getArray()) {
//     console.log("IT =>", a);
// }
console.log("getObject() =>", c.getObj());
console.log("getArrayOfObjects() =>", c.getArrayOfObjects());
console.log("add() =>", c.add(6));
