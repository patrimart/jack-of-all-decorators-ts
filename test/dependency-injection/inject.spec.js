"use strict";
var assert = require("assert");
var dependecy_injection_1 = require("../../lib/dependecy-injection");
var Foo = (function () {
    function Foo() {
        this.guid = Math.random().toString(36).substr(2);
        console.log("Foo Constructor " + this.guid);
    }
    Foo.prototype.destruct = function () {
        console.log("Foo destruct() " + this.guid);
    };
    return Foo;
}());
var MyClass = (function () {
    function MyClass(foo) {
        this.foo = foo;
        console.log("MyClass constructor");
    }
    MyClass.prototype.destruct = function () { };
    return MyClass;
}());
var MyClass2 = (function () {
    function MyClass2(foo) {
        this.foo = foo;
        console.log("MyClass2 constructor");
    }
    MyClass2.prototype.destruct = function () { };
    return MyClass2;
}());
describe("Inject", function () {
    var c1;
    var c2;
    it("injectables", function () {
        dependecy_injection_1.DI.utils.injectable(Foo);
        dependecy_injection_1.DI.utils.inject(MyClass, Foo, 0);
        c1 = dependecy_injection_1.DI.utils.modularize(MyClass);
        console.log("c1.foo.guid", c1.foo.guid);
        assert.notEqual(c1, undefined);
        assert.notEqual(c1.foo, undefined);
        assert.notEqual(c1.foo.guid, undefined);
    });
    it("injectables scoped to modules", function () {
        dependecy_injection_1.DI.utils.injectable(Foo);
        dependecy_injection_1.DI.utils.inject(MyClass2, Foo, 0);
        c2 = dependecy_injection_1.DI.utils.modularize(MyClass2, "foo.bar");
        console.log("c2.foo.guid", c2.foo.guid);
        assert.notEqual(c1.foo.guid, c2.foo.guid);
    });
});
