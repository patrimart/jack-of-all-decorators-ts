"use strict";
var assert = require("assert");
var dependecy_injection_1 = require("../../lib/dependecy-injection");
var MyClass = (function () {
    function MyClass(foo, bar) {
        this.foo = foo;
        this.bar = bar;
        this.isInstantiated = false;
        console.log("Constructor");
        this.isInstantiated = true;
    }
    MyClass.prototype.destruct = function () {
        console.log("destruct()");
        this.isInstantiated = false;
    };
    return MyClass;
}());
describe("Register", function () {
    it("should register Classes", function () {
        dependecy_injection_1.DI.register(MyClass);
        dependecy_injection_1.DI.register(MyClass, "foo");
        dependecy_injection_1.DI.register(MyClass, "bar");
        dependecy_injection_1.DI.register(MyClass, "foo.bar");
        dependecy_injection_1.DI.register(MyClass, "foo.bar.fooBar");
        assert.equal(dependecy_injection_1.DI.numRegistered(MyClass), 5);
        assert.equal(dependecy_injection_1.DI.numRegistered(MyClass, "foo.bar"), 1);
        assert.equal(dependecy_injection_1.DI.numRegistered(), 5);
    });
    it("should unregister a class", function () {
        dependecy_injection_1.DI.unregister(MyClass, "foo.bar.fooBar");
        dependecy_injection_1.DI.unregister(MyClass, "foo.bar");
        dependecy_injection_1.DI.unregister(MyClass, "bar");
        dependecy_injection_1.DI.unregister(MyClass, "foo");
        dependecy_injection_1.DI.unregister(MyClass);
        assert.equal(dependecy_injection_1.DI.numRegistered(), 0);
    });
    it("should throw for unregistering at missing module path", function () {
        assert.throws(function () { return dependecy_injection_1.DI.unregister(MyClass); });
        assert.throws(function () { return dependecy_injection_1.DI.unregister(MyClass, "foo"); });
        assert.throws(function () { return dependecy_injection_1.DI.unregister(MyClass, "bar"); });
        assert.throws(function () { return dependecy_injection_1.DI.unregister(MyClass, "foo.bar"); });
        assert.throws(function () { return dependecy_injection_1.DI.unregister(MyClass, "foo.bar.fooBar"); });
        assert.throws(function () { return dependecy_injection_1.DI.unregister(MyClass, "*"); });
        assert.throws(function () { return dependecy_injection_1.DI.unregister({}, "*"); });
    });
    it("should unregister dependencies by wildcard", function () {
        dependecy_injection_1.DI.register(MyClass);
        dependecy_injection_1.DI.register(MyClass, "foo");
        dependecy_injection_1.DI.register(MyClass, "foo.bar1");
        dependecy_injection_1.DI.register(MyClass, "foo.bar2");
        dependecy_injection_1.DI.register(MyClass, "foo.bar3.fooBar");
        assert.equal(dependecy_injection_1.DI.numRegistered(), 5);
        dependecy_injection_1.DI.unregister(MyClass, "*");
        assert.equal(dependecy_injection_1.DI.numRegistered(), 0);
    });
    it("should unregister dependencies by wildcard and/or Class", function () {
        dependecy_injection_1.DI.register(MyClass);
        dependecy_injection_1.DI.register(MyClass, "foo");
        dependecy_injection_1.DI.register(MyClass, "foo.bar1");
        dependecy_injection_1.DI.register(MyClass, "foo.bar2");
        dependecy_injection_1.DI.register(MyClass, "foo.bar3.fooBar");
        assert.equal(dependecy_injection_1.DI.numRegistered(), 5);
        dependecy_injection_1.DI.unregister(MyClass, "foo.*");
        assert.equal(dependecy_injection_1.DI.numRegistered(), 3);
        dependecy_injection_1.DI.unregister(MyClass, "*");
        assert.equal(dependecy_injection_1.DI.numRegistered(), 0);
    });
});
