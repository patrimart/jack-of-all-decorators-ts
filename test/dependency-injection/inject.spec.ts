

import assert = require("assert");

import { DI } from "../../lib/dependecy-injection";


class Foo implements DI.IInjectable {

    public guid = Math.random().toString(36).substr(2);

    constructor () {
        console.log(`Foo Constructor ${this.guid}`);
    }

    public destruct(): void {
        console.log(`Foo destruct() ${this.guid}`);
    }

}

class MyClass implements DI.IInjectable {
    constructor (public foo: Foo) {
        console.log("MyClass constructor");
    }
    public destruct () {}
}

class MyClass2 implements DI.IInjectable {
    constructor (public foo: Foo) {
        console.log("MyClass2 constructor");
    }
    public destruct () {}
}


describe ("Inject", function () {

    let c1: MyClass;
    let c2: MyClass2;

    it ("injectables", function () {

        DI.utils.injectable(Foo);
        DI.utils.inject(MyClass, Foo, 0);
        c1 = DI.utils.modularize<MyClass>(MyClass);

        console.log("c1.foo.guid", c1.foo.guid);
        assert.notEqual(c1, undefined);
        assert.notEqual(c1.foo, undefined);
        assert.notEqual(c1.foo.guid, undefined);
    });

    it ("injectables scoped to modules", function () {

        DI.utils.injectable(Foo);
        DI.utils.inject(MyClass2, Foo, 0);
        c2 = DI.utils.modularize<MyClass2>(MyClass2, "foo.bar");

        console.log("c2.foo.guid", c2.foo.guid);
        assert.notEqual(c1.foo.guid, c2.foo.guid);
    });

});
