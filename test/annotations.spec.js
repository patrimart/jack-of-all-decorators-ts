"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var lib_1 = require("../lib");
var MyClass = (function () {
    function MyClass(foo) {
        this.foo = foo;
    }
    MyClass.prototype.setFoo = function (v) {
        this.foo = v;
    };
    MyClass.prototype.getFoo = function () {
        return this.foo;
    };
    MyClass.prototype.print = function () {
        return new Date();
    };
    MyClass.prototype.getArray = function () {
        return [[1, 3, 4, 5], [4, 5, 6, 7]]; // [4, "", 7, 3, null, 8, 7, 0, 1, 1, 5, undefined, 7, 3, 78];
    };
    Object.defineProperty(MyClass.prototype, "arr", {
        //
        // @unzip
        // @zip
        // public getArray () {
        //     return [['a', 'b'], [1, 2], [true, false]]; // [4, 7, 3, 8, 7, 0, 1, 1, 5, 7, 3, 78];
        // }
        get: function () {
            return [1, 1, 2, 3, 3, 3, 4, 5, 6, 6, 6, 7];
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        lib_1.memoize, 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], MyClass.prototype, "getFoo", null);
    __decorate([
        lib_1.dateFormat("fullDate"), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], MyClass.prototype, "print", null);
    __decorate([
        lib_1.unique, 
        __metadata('design:type', Object)
    ], MyClass.prototype, "arr", null);
    return MyClass;
}());
var c = new MyClass("foo");
console.log("getFoo() =>", c.getFoo());
c.setFoo("bar");
console.log("DATE", c.print());
console.log("getFoo() =>", c.getFoo());
console.log("getArray() =>", c.getArray());
console.log("arr =>", c.arr);
var d = new MyClass("foo2");
console.log("getFoo() =>", d.getFoo());
d.setFoo("bar2");
console.log("getFoo() =>", d.getFoo());
console.log("getArray() =>", d.getArray());
console.log("arr =>", d.arr);
