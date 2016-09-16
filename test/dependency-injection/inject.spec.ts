

import assert = require("assert");

import { DI } from "../../lib/dependecy-injection";


class Foo implements DI.IInjectable {

    public guid = Math.random().toString(36).substr(2);

    constructor () {
        // console.log(`Foo Constructor ${this.guid}`);
    }

    public destruct(): void {
        // console.log(`Foo destruct() ${this.guid}`);
        this.guid = null;
    }

}

class MyClass implements DI.IInjectable {
    constructor (public foo: Foo) {
        // console.log("MyClass constructor");
    }
    public destruct () {
        // console.log("MyClass destruct()");
        this.foo = null;
    }
}

class MyClass2 implements DI.IInjectable {
    constructor (public foo: Foo) {
        // console.log("MyClass2 destruct()");
    }
    public destruct () {
        // console.log("MyClass2 destruct()");
        this.foo = null;
    }
}


describe ("Inject", function () {

    let c1: MyClass;
    let c2: MyClass2;

    for (let loop = 0; loop < 5; loop++) {

        it("injectables", function () {

            DI.utils.injectable(Foo);
            DI.utils.inject(MyClass, Foo, 0);
            c1 = DI.utils.modularize<MyClass>(MyClass);

            // console.log("c1.foo.guid", c1.foo.guid);
            assert.notEqual(!!c1, false);
            assert.notEqual(!!c1.foo, false);
            assert.notEqual(!!c1.foo.guid, false);
        });

        it("injectables scoped to modules", function () {

            DI.utils.injectable(Foo);
            DI.utils.inject(MyClass2, Foo, 0);
            c2 = DI.utils.modularize<MyClass2>(MyClass2, "foo.bar");

            // console.log("c2.foo.guid", c2.foo.guid);
            assert.notEqual(!!c2.foo.guid, false);
            assert.notEqual(c1.foo.guid, c2.foo.guid);
        });
    }

    it("destruct modules", function () {

        console.log("numRegistered numActive", DI.utils.numRegistered(), DI.utils.numActive());
        DI.utils.destruct();
        DI.utils.destruct("foo.bar");
        assert.equal(c1.foo, null);
        assert.equal(c2.foo, null);
        console.log("numRegistered numActive", DI.utils.numRegistered(), DI.utils.numActive());
    });
});
