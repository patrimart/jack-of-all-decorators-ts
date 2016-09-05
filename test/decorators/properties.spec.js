"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var assert = require("assert");
var properties_1 = require("../../lib/decorators/properties");
var strings_1 = require("../../lib/decorators/strings");
var arrays_1 = require("../../lib/decorators/arrays");
var MyTest = (function () {
    function MyTest() {
        this.decorateGetter = "This is a getter";
        this.decorateSetter = "And this is a setter";
    }
    __decorate([
        properties_1.getterSetter(arrays_1.reverse, strings_1.words)
    ], MyTest.prototype, "decorateGetter", void 0);
    __decorate([
        properties_1.setterGetter(arrays_1.reverse, strings_1.words)
    ], MyTest.prototype, "decorateSetter", void 0);
    return MyTest;
}());
describe("Properties decorator", function () {
    var c = new MyTest();
    it("getterSetter", function () {
        assert.deepEqual(c.decorateGetter, ["getter", "a", "is", "This"]);
    });
    it("setterGetter", function () {
        assert.deepEqual(c.decorateSetter, ["setter", "a", "is", "this", "And"]);
    });
});
