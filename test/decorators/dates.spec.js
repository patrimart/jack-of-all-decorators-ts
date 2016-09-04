"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var assert = require("assert");
var dates_1 = require("../../lib/decorators/dates");
var MyTest = (function () {
    function MyTest() {
    }
    MyTest.prototype.getDate = function () {
        return new Date(1472965878944);
    };
    __decorate([
        dates_1.dateFormat("dddd, mmmm dS, yyyy, h:MM:ss TT")
    ], MyTest.prototype, "getDate", null);
    return MyTest;
}());
describe("Dates decorator", function () {
    var c = new MyTest();
    it("dateFormat", function () {
        assert.deepEqual(c.getDate(), "Saturday, September 3rd, 2016, 10:11:18 PM");
    });
});
