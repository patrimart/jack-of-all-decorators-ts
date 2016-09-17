"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var assert = require("assert");
var dependecy_injection_1 = require("../../lib/dependecy-injection");
var Injectable = dependecy_injection_1.DI.Injectable;
var Inject = dependecy_injection_1.DI.Inject;
var Foo = (function () {
    function Foo() {
        this.guid = Math.random().toString(36).substr(2);
    }
    Foo.prototype.destruct = function () {
        this.guid = null;
    };
    Foo = __decorate([
        Injectable()
    ], Foo);
    return Foo;
}());
var MyClass = (function () {
    function MyClass(foo) {
        this.foo = foo;
    }
    MyClass.prototype.destruct = function () {
        this.foo = null;
    };
    MyClass = __decorate([
        __param(0, Inject(Foo))
    ], MyClass);
    return MyClass;
}());
var MyClass2 = (function () {
    function MyClass2(foo) {
        this.foo = foo;
    }
    MyClass2.prototype.destruct = function () {
        this.foo = null;
    };
    MyClass2 = __decorate([
        __param(0, Inject(Foo))
    ], MyClass2);
    return MyClass2;
}());
describe("Inject", function () {
    var c1;
    var c2;
    for (var loop = 0; loop < 5; loop++) {
        it("injectables", function () {
            c1 = dependecy_injection_1.DI.Modularize(MyClass);
            assert.notEqual(!!c1, false);
            assert.notEqual(!!c1.foo, false);
            assert.notEqual(!!c1.foo.guid, false);
        });
        it("injectables scoped to modules", function () {
            c2 = dependecy_injection_1.DI.Modularize(MyClass2, "foo.bar");
            assert.notEqual(!!c2.foo.guid, false);
            assert.notEqual(c1.foo.guid, c2.foo.guid);
        });
    }
    it("destruct modules", function () {
        c1.foo.destruct();
        c2.foo.destruct();
        c1.destruct();
        c2.destruct();
        dependecy_injection_1.DI.Destruct();
        dependecy_injection_1.DI.Destruct("foo.bar");
        assert.equal(c1.foo, null);
        assert.equal(c2.foo, null);
    });
});
