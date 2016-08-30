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
    MyClass.prototype.getArray = function () {
        return [1, 3, 4, 5, 6];
    };
    MyClass.prototype.getObj = function () {
        return { a: 1, b: 2, c: [1, 2, 3] };
    };
    MyClass.prototype.add = function (a, b, c) {
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
        lib_1.iterator, 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], MyClass.prototype, "getArray", null);
    __decorate([
        lib_1.toValues, 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], MyClass.prototype, "getObj", null);
    __decorate([
        lib_1.partial(1, 2), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object, Object, Number]), 
        __metadata('design:returntype', void 0)
    ], MyClass.prototype, "add", null);
    __decorate([
        lib_1.orderBy("user age"), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], MyClass.prototype, "getArrayOfObjects", null);
    return MyClass;
}());
var c = new MyClass("foo");
console.log("getArray() =>", c.getArray().next().value);
// for (let a of c.getArray()) {
//     console.log("IT =>", a);
// }
console.log("getObject() =>", c.getObj());
console.log("getArrayOfObjects() =>", c.getArrayOfObjects());
console.log("add() =>", c.add(6));
