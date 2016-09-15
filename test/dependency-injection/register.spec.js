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
    MyClass.prototype.fooBar = function () {
        return "bar";
    };
    MyClass.prototype.destruct = function () {
        console.log("destruct()");
        this.isInstantiated = false;
    };
    return MyClass;
}());
describe("Register", function () {
    it("should register Classes", function () {
        dependecy_injection_1.DI.utils.register(MyClass);
        dependecy_injection_1.DI.utils.register(MyClass, "foo");
        dependecy_injection_1.DI.utils.register(MyClass, "bar");
        dependecy_injection_1.DI.utils.register(MyClass, "foo.bar");
        dependecy_injection_1.DI.utils.register(MyClass, "foo.bar.fooBar");
        assert.equal(dependecy_injection_1.DI.utils.numRegistered(MyClass), 5);
        assert.equal(dependecy_injection_1.DI.utils.numRegistered(MyClass, "foo.bar"), 1);
        assert.equal(dependecy_injection_1.DI.utils.numRegistered(), 5);
    });
    it("should unregister a class", function () {
        dependecy_injection_1.DI.utils.unregister(MyClass, "foo.bar.fooBar");
        dependecy_injection_1.DI.utils.unregister(MyClass, "foo.bar");
        dependecy_injection_1.DI.utils.unregister(MyClass, "bar");
        dependecy_injection_1.DI.utils.unregister(MyClass, "foo");
        dependecy_injection_1.DI.utils.unregister(MyClass);
        assert.equal(dependecy_injection_1.DI.utils.numRegistered(), 0);
    });
    it("should throw for unregistering at missing module path", function () {
        assert.throws(function () { return dependecy_injection_1.DI.utils.unregister(MyClass); });
        assert.throws(function () { return dependecy_injection_1.DI.utils.unregister(MyClass, "foo"); });
        assert.throws(function () { return dependecy_injection_1.DI.utils.unregister(MyClass, "bar"); });
        assert.throws(function () { return dependecy_injection_1.DI.utils.unregister(MyClass, "foo.bar"); });
        assert.throws(function () { return dependecy_injection_1.DI.utils.unregister(MyClass, "foo.bar.fooBar"); });
        assert.throws(function () { return dependecy_injection_1.DI.utils.unregister(MyClass, "*"); });
        assert.throws(function () { return dependecy_injection_1.DI.utils.unregister({}, "**"); });
    });
    it("should unregister dependencies by wildcard", function () {
        dependecy_injection_1.DI.utils.register(MyClass);
        dependecy_injection_1.DI.utils.register(MyClass, "foo");
        dependecy_injection_1.DI.utils.register(MyClass, "foo.bar1");
        dependecy_injection_1.DI.utils.register(MyClass, "foo.bar2");
        dependecy_injection_1.DI.utils.register(MyClass, "foo.bar3.fooBar");
        assert.equal(dependecy_injection_1.DI.utils.numRegistered(), 5);
        dependecy_injection_1.DI.utils.unregister(MyClass, "**");
        assert.equal(dependecy_injection_1.DI.utils.numRegistered(), 0);
    });
    it("should unregister dependencies by wildcard and/or Class", function () {
        dependecy_injection_1.DI.utils.register(MyClass);
        dependecy_injection_1.DI.utils.register(MyClass, "foo");
        dependecy_injection_1.DI.utils.register(MyClass, "foo.bar1");
        dependecy_injection_1.DI.utils.register(MyClass, "foo.bar2");
        dependecy_injection_1.DI.utils.register(MyClass, "foo.bar3.fooBar");
        assert.equal(dependecy_injection_1.DI.utils.numRegistered(), 5);
        dependecy_injection_1.DI.utils.unregister(MyClass, "foo.*");
        assert.equal(dependecy_injection_1.DI.utils.numRegistered(), 3);
        dependecy_injection_1.DI.utils.unregister(MyClass, "foo.**");
        assert.equal(dependecy_injection_1.DI.utils.numRegistered(), 2);
        dependecy_injection_1.DI.utils.unregister(MyClass, "**");
        assert.equal(dependecy_injection_1.DI.utils.numRegistered(), 0);
    });
});
