"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var assert = require("assert");
var functions_1 = require("../../lib/decorators/functions");
var MyTest = (function () {
    function MyTest() {
        this.counter = 0;
        this.delayValue = Date.now();
    }
    MyTest.prototype.getDebounce = function () {
        console.log("Count", this.counter);
        return this.counter++;
    };
    MyTest.prototype.getCurry = function (a, b, c, d) {
        return a + b + c + d;
    };
    MyTest.prototype.getDefer = function () {
        this.deferValue = "hit";
    };
    MyTest.prototype.getDelay = function () {
        this.delayValue = Date.now();
    };
    MyTest.prototype.getDefensiveCopy = function () {
        return [1, 2, 3, 4, 5];
    };
    MyTest.prototype.getIterable = function () {
        return Math.random();
    };
    MyTest.prototype.getLazy = function () {
        return Date.now();
    };
    MyTest.prototype.getMemoize = function (count) {
        return this.counter = count;
    };
    MyTest.prototype.getPartial = function (a, b, c, d) {
        return a + b + c + d;
    };
    MyTest.prototype.getReArg = function (a, b, c, d) {
        return a + b + c + d;
    };
    MyTest.prototype.getThrottle = function () {
        return ++this.counter;
    };
    MyTest.prototype.getTryCatch = function () {
        throw new Error("Try and catch this!");
    };
    __decorate([
        functions_1.debounce(100, 100)
    ], MyTest.prototype, "getDebounce", null);
    __decorate([
        functions_1.curry
    ], MyTest.prototype, "getCurry", null);
    __decorate([
        functions_1.defer
    ], MyTest.prototype, "getDefer", null);
    __decorate([
        functions_1.delay(500)
    ], MyTest.prototype, "getDelay", null);
    __decorate([
        functions_1.defensiveCopy
    ], MyTest.prototype, "getDefensiveCopy", null);
    __decorate([
        functions_1.iterable(10)
    ], MyTest.prototype, "getIterable", null);
    __decorate([
        functions_1.lazy
    ], MyTest.prototype, "getLazy", null);
    __decorate([
        functions_1.memoize
    ], MyTest.prototype, "getMemoize", null);
    __decorate([
        functions_1.partial("a", "b", "c")
    ], MyTest.prototype, "getPartial", null);
    __decorate([
        functions_1.rearg(3, 2, 1, 0)
    ], MyTest.prototype, "getReArg", null);
    __decorate([
        functions_1.throttle(100)
    ], MyTest.prototype, "getThrottle", null);
    __decorate([
        functions_1.tryCatch
    ], MyTest.prototype, "getTryCatch", null);
    return MyTest;
}());
describe("Functions decorators", function () {
    this.timeout(30000);
    var c = new MyTest();
    it("debounce", function (done) {
        var i = setInterval(function () { return c.getDebounce(); }, 30);
        setTimeout(function () {
            clearInterval(i);
            c.getDebounce();
            var count = c.counter;
            if (count > 2)
                done("Count hit too often: " + c.counter + ".");
            else
                done();
        }, 200);
        assert.deepEqual(true, true);
    });
    it("curry", function () {
        assert.deepEqual(c.getCurry("a")("b")("c")("d"), "abcd");
    });
    it("defer", function (done) {
        c.getDefer();
        assert.deepEqual(c.deferValue, undefined);
        setTimeout(function () {
            if (c.deferValue === "hit")
                done();
            else
                done("Defer did not hit.");
        }, 100);
    });
    it("delay", function (done) {
        var origDelayValue = c.delayValue;
        c.getDelay();
        if (c.delayValue !== origDelayValue)
            done("Delay value updated too quickly");
        setTimeout(function () {
            if (c.delayValue !== origDelayValue)
                done("Delay value updated too quickly");
        }, 200);
        setTimeout(function () {
            if (c.delayValue <= origDelayValue)
                done("Delay value not updates");
            else
                done();
        }, 700);
    });
    it("defensiveCopy", function () {
        assert.deepEqual(c.getDefensiveCopy(), [1, 2, 3, 4, 5]);
    });
    it.skip("iterable");
    it("lazy", function (done) {
        var now = Date.now();
        var lazyFunc = c.getLazy();
        setTimeout(function () {
            if (lazyFunc() < now + 400)
                done("Lazy is not lazy.");
            else
                done();
        }, 500);
    });
    it("memoize", function () {
        var count = c.getMemoize(5);
        c.getMemoize(6);
        c.getMemoize(7);
        c.getMemoize(8);
        assert.deepEqual(c.getMemoize(9), count);
    });
    it("partial", function () {
        assert.deepEqual(c.getPartial("d"), "abcd");
    });
    it("rearg", function () {
        assert.deepEqual(c.getReArg("a", "b", "c", "d"), "dcba");
    });
    it("throttle", function (done) {
        var count = c.counter;
        var i = setInterval(function () { return c.getThrottle(); }, 10);
        setTimeout(function () {
            clearInterval(i);
            if (c.counter > count + 2)
                done("Throttle didn't throttle: " + c.counter + " > " + count + ".");
            else
                done();
        }, 200);
    });
    it("tryCatch", function () {
        assert.ifError(c.getTryCatch());
    });
});
