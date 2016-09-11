
import assert = require("assert");

import { DI } from "../../lib/dependecy-injection";


class MyClass implements DI.IInjectable {

    public isInstantiated = false;

    constructor (public foo: string, public bar: string) {
        console.log("Constructor");
        this.isInstantiated = true;
    }

    public destruct(): void {
        console.log("destruct()");
        this.isInstantiated = false;
    }

}

describe ("Register", function () {

    it ("should register Classes", function () {

        DI.register(MyClass);
        DI.register(MyClass, "foo");
        DI.register(MyClass, "bar");
        DI.register(MyClass, "foo.bar");
        DI.register(MyClass, "foo.bar.fooBar");

        assert.equal(DI.numRegistered(MyClass), 5);
        assert.equal(DI.numRegistered(MyClass, "foo.bar"), 1);
        assert.equal(DI.numRegistered(), 5);
    });

    it ("should unregister a class", function () {

        DI.unregister(MyClass, "foo.bar.fooBar");
        DI.unregister(MyClass, "foo.bar");
        DI.unregister(MyClass, "bar");
        DI.unregister(MyClass, "foo");
        DI.unregister(MyClass);

        assert.equal(DI.numRegistered(), 0);
    });

    it ("should throw for unregistering at missing module path", function () {

        assert.throws(() => DI.unregister(MyClass));
        assert.throws(() => DI.unregister(MyClass, "foo"));
        assert.throws(() => DI.unregister(MyClass, "bar"));
        assert.throws(() => DI.unregister(MyClass, "foo.bar"));
        assert.throws(() => DI.unregister(MyClass, "foo.bar.fooBar"));
        assert.throws(() => DI.unregister(MyClass, "*"));
        assert.throws(() => DI.unregister({}, "*"));
    });


    it ("should unregister dependencies by wildcard", function () {

        DI.register(MyClass);
        DI.register(MyClass, "foo");
        DI.register(MyClass, "foo.bar1");
        DI.register(MyClass, "foo.bar2");
        DI.register(MyClass, "foo.bar3.fooBar");

        assert.equal(DI.numRegistered(), 5);

        DI.unregister(MyClass, "*");
        assert.equal(DI.numRegistered(), 0);
    });


    it ("should unregister dependencies by wildcard and/or Class", function () {

        DI.register(MyClass);
        DI.register(MyClass, "foo");
        DI.register(MyClass, "foo.bar1");
        DI.register(MyClass, "foo.bar2");
        DI.register(MyClass, "foo.bar3.fooBar");

        assert.equal(DI.numRegistered(), 5);

        DI.unregister(MyClass, "foo.*");
        assert.equal(DI.numRegistered(), 3);

        DI.unregister(MyClass, "*");
        assert.equal(DI.numRegistered(), 0);
    });

});
