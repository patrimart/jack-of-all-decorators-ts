
import assert = require("assert");

import { DI } from "../../lib/dependecy-injection";


class MyClass implements DI.IInjectable {

    public isInstantiated = false;

    constructor (public foo: string, public bar: string) {
        console.log("Constructor");
        this.isInstantiated = true;
    }

    public fooBar () {
        return "bar";
    }

    public destruct(): void {
        console.log("destruct()");
        this.isInstantiated = false;
    }

}

describe ("Register", function () {

    it ("should register Classes", function () {

        DI.utils.register(MyClass);
        DI.utils.register(MyClass, "foo");
        DI.utils.register(MyClass, "bar");
        DI.utils.register(MyClass, "foo.bar");
        DI.utils.register(MyClass, "foo.bar.fooBar");

        assert.equal(DI.utils.numRegistered(MyClass), 5);
        assert.equal(DI.utils.numRegistered(MyClass, "foo.bar"), 1);
        assert.equal(DI.utils.numRegistered(), 5);
    });

    it ("should unregister a class", function () {

        DI.utils.unregister(MyClass, "foo.bar.fooBar");
        DI.utils.unregister(MyClass, "foo.bar");
        DI.utils.unregister(MyClass, "bar");
        DI.utils.unregister(MyClass, "foo");
        DI.utils.unregister(MyClass);

        assert.equal(DI.utils.numRegistered(), 0);
    });

    it ("should throw for unregistering at missing module path", function () {

        assert.throws(() => DI.utils.unregister(MyClass));
        assert.throws(() => DI.utils.unregister(MyClass, "foo"));
        assert.throws(() => DI.utils.unregister(MyClass, "bar"));
        assert.throws(() => DI.utils.unregister(MyClass, "foo.bar"));
        assert.throws(() => DI.utils.unregister(MyClass, "foo.bar.fooBar"));
        assert.throws(() => DI.utils.unregister(MyClass, "*"));
        assert.throws(() => DI.utils.unregister({}, "**"));
    });


    it ("should unregister dependencies by wildcard", function () {

        DI.utils.register(MyClass);
        DI.utils.register(MyClass, "foo");
        DI.utils.register(MyClass, "foo.bar1");
        DI.utils.register(MyClass, "foo.bar2");
        DI.utils.register(MyClass, "foo.bar3.fooBar");

        assert.equal(DI.utils.numRegistered(), 5);

        DI.utils.unregister(MyClass, "**");
        assert.equal(DI.utils.numRegistered(), 0);
    });


    it ("should unregister dependencies by wildcard and/or Class", function () {

        DI.utils.register(MyClass);
        DI.utils.register(MyClass, "foo");
        DI.utils.register(MyClass, "foo.bar1");
        DI.utils.register(MyClass, "foo.bar2");
        DI.utils.register(MyClass, "foo.bar3.fooBar");

        assert.equal(DI.utils.numRegistered(), 5);

        DI.utils.unregister(MyClass, "foo.*");
        assert.equal(DI.utils.numRegistered(), 3);

        DI.utils.unregister(MyClass, "foo.**");
        assert.equal(DI.utils.numRegistered(), 2);

        DI.utils.unregister(MyClass, "**");
        assert.equal(DI.utils.numRegistered(), 0);
    });

});
