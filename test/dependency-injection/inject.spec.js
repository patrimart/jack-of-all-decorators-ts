"use strict";
var assert = require("assert");
var dependecy_injection_1 = require("../../lib/dependecy-injection");
var Foo = (function () {
    function Foo() {
        this.guid = Math.random().toString(36).substr(2);
    }
    Foo.prototype.destruct = function () {
        this.guid = null;
    };
    return Foo;
}());
var MyClass = (function () {
    function MyClass(foo) {
        this.foo = foo;
    }
    MyClass.prototype.destruct = function () {
        this.foo = null;
    };
    return MyClass;
}());
var MyClass2 = (function () {
    function MyClass2(foo) {
        this.foo = foo;
    }
    MyClass2.prototype.destruct = function () {
        this.foo = null;
    };
    return MyClass2;
}());
describe("Inject", function () {
    var c1;
    var c2;
    for (var loop = 0; loop < 5; loop++) {
        it("injectables", function () {
            dependecy_injection_1.DI.utils.injectable(Foo);
            dependecy_injection_1.DI.utils.inject(MyClass, Foo, 0);
            c1 = dependecy_injection_1.DI.utils.modularize(MyClass);
            assert.notEqual(!!c1, false);
            assert.notEqual(!!c1.foo, false);
            assert.notEqual(!!c1.foo.guid, false);
        });
        it("injectables scoped to modules", function () {
            dependecy_injection_1.DI.utils.injectable(Foo);
            dependecy_injection_1.DI.utils.inject(MyClass2, Foo, 0);
            c2 = dependecy_injection_1.DI.utils.modularize(MyClass2, "foo.bar");
            assert.notEqual(!!c2.foo.guid, false);
            assert.notEqual(c1.foo.guid, c2.foo.guid);
        });
    }
    it("destruct modules", function () {
        console.log("numRegistered numActive", dependecy_injection_1.DI.utils.numRegistered(), dependecy_injection_1.DI.utils.numActive());
        dependecy_injection_1.DI.utils.destruct();
        dependecy_injection_1.DI.utils.destruct("foo.bar");
        assert.equal(c1.foo, null);
        assert.equal(c2.foo, null);
        console.log("numRegistered numActive", dependecy_injection_1.DI.utils.numRegistered(), dependecy_injection_1.DI.utils.numActive());
    });
});
