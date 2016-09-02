"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var lib_1 = require("../lib");
var MyClass = (function () {
    function MyClass(foo) {
        this.foo = foo;
        this.prop = "initial";
    }
    MyClass.prototype.setFoo = function (v) {
        this.foo = v;
    };
    MyClass.prototype.getArray = function () {
        return [1, 3, 4, 5, 6];
    };
    MyClass.prototype.getObj = function () {
        return { a: 1, b: 2, c: [1, 2, 3] };
    };
    MyClass.prototype.getRandom = function () {
        return Math.random();
    };
    MyClass.prototype.add = function (a, b, c) {
        console.log("Execute", a, b, c);
        return a + b + c;
    };
    MyClass.prototype.getArrayOfObjects = function () {
        return [
            { 'user': 'fred', 'age': 48 },
            { 'user': 'barney', 'age': 34 },
            { 'user': 'fred', 'age': 40 },
            { 'user': 'barney', 'age': 36 }
        ];
    };
    __decorate([
        lib_1.getterSetter(lib_1.repeat(2), lib_1.padLeft(10))
    ], MyClass.prototype, "prop", void 0);
    __decorate([
        lib_1.toValues
    ], MyClass.prototype, "getObj", null);
    __decorate([
        lib_1.iterable(5)
    ], MyClass.prototype, "getRandom", null);
    __decorate([
        lib_1.lazy
    ], MyClass.prototype, "add", null);
    __decorate([
        lib_1.orderBy("user age")
    ], MyClass.prototype, "getArrayOfObjects", null);
    return MyClass;
}());
var c = new MyClass("foo");
console.log(c.prop);
c.prop = "changed";
console.log(c.prop);
console.log("getArray() =>", c.getArray());
// for (let a of c.getArray()) {
//     console.log("IT =>", a);
// }
console.log("getObject() =>", c.getObj());
console.log("getArrayOfObjects() =>", c.getArrayOfObjects());
var v = c.add(4, 5, 6);
console.log("add() =>", v());
// let it = c.getRandom();
// for (let i of it) {
//     console.log(i);
// }
