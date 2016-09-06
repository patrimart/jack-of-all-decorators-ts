
import assert = require("assert");

import {
    debounce, curry, defer, delay, defensiveCopy, iterable,
    lazy, memoize, partial, rearg, throttle, tryCatch,
} from "../../lib/decorators/functions";


class MyTest {

    public counter = 0;
    public deferValue: string;
    public delayValue = Date.now();

    @debounce(100, 100)
    public getDebounce () {
        // console.log("Count", this.counter);
        return this.counter++;
    }

    @curry
    public getCurry (a: string, b: string, c: string, d: string) {
        return a + b + c + d;
    }

    @defer
    public getDefer () {
        this.deferValue = "hit";
    }

    @delay(500)
    public getDelay () {
        this.delayValue = Date.now();
    }

    @defensiveCopy
    public getDefensiveCopy () {
        return [1, 2, 3, 4, 5];
    }

    @iterable(10)
    public getIterable () {
        return Math.random();
    }

    @lazy
    public getLazy () {
        return Date.now();
    }

    @memoize
    public getMemoize (count: number) {
        return this.counter = count;
    }

    @partial("a", "b", "c")
    public getPartial (a: string, b: string, c: string, d: string) {
        return a + b + c + d;
    }

    @rearg(3, 2, 1, 0)
    public getReArg (a: string, b: string, c: string, d: string) {
        return a + b + c + d;
    }

    @throttle(100)
    public getThrottle (input: number) {
        // console.log(input);
        return ++this.counter;
    }

    @tryCatch
    public getTryCatch () {
        throw new Error("Try and catch this!");
    }
}


describe ("Functions decorators", function () {

    this.timeout(30000);

    const c = new MyTest();

    it ("debounce", function (done) {

        const i: number = setInterval(() => c.getDebounce(), 30);
        setTimeout(() => {
            clearInterval(i);
            c.getDebounce();
            const count = c.counter;
            // console.log("DEBOUNCE", count);
            if (count > 2) done(`Count hit too often: ${c.counter}.`);
            else done();
        }, 200);
        assert.deepEqual(true, true);
    });

    it ("curry", function () {
        assert.deepEqual((c.getCurry as any)("a")("b")("c")("d"), "abcd");
    });

    it ("defer", function (done) {
        c.getDefer();
        assert.deepEqual(c.deferValue, undefined);
        setTimeout(() => {
            if (c.deferValue === "hit") done();
            else done("Defer did not hit.");
        }, 100);
    });

    it ("delay", function (done) {

        const origDelayValue = c.delayValue;
        c.getDelay();
        if (c.delayValue !== origDelayValue)
            done("Delay value updated too quickly");
        setTimeout(() => {
            if (c.delayValue !== origDelayValue)
                done("Delay value updated too quickly");
        }, 200);
        setTimeout(() => {
            if (c.delayValue <= origDelayValue)
                done("Delay value not updates");
            else
                done();
        }, 700);
    });

    it ("defensiveCopy", function () {
        assert.deepEqual(c.getDefensiveCopy(), [1, 2, 3, 4, 5]);
    });

    it.skip("iterable");

    it ("lazy", function (done) {

        const now = Date.now();
        const lazyFunc = c.getLazy() as any as Function;
        setTimeout(() => {
            if (lazyFunc() < now + 400)
                done("Lazy is not lazy.");
            else
                done();
        }, 500);
    });

    it ("memoize", function () {

        const count = c.getMemoize(5);
        c.getMemoize(6);
        c.getMemoize(7);
        c.getMemoize(8);
        assert.deepEqual(c.getMemoize(9), count);
    });


    it ("partial", function () {
        assert.deepEqual((c.getPartial as any)("d"), "abcd");
    });

    it ("rearg", function () {
        assert.deepEqual(c.getReArg("a", "b", "c", "d"), "dcba");
    });

    it ("throttle", function (done) {

        const count = c.counter;
        const i: number = setInterval(() => c.getThrottle(Math.random()), 10);
        setTimeout(() => {
            clearInterval(i);
            if (c.counter > count + 2) done (`Throttle didn't throttle: ${c.counter} > ${count}.`);
            else done();
        }, 200);
    });

    it ("tryCatch", function () {
        assert.ifError(c.getTryCatch());
    });
});
