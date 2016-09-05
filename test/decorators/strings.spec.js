"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var assert = require("assert");
var strings_1 = require("../../lib/decorators/strings");
var MyTest = (function () {
    function MyTest() {
    }
    MyTest.prototype.getCastInt = function () {
        return "1234";
    };
    MyTest.prototype.getCastBoolean = function () {
        return "";
    };
    MyTest.prototype.getCastCustom = function () {
        return "1234";
    };
    MyTest.prototype.getEscape = function () {
        return "<strong>Escape & \"Escape\"</strong>";
    };
    MyTest.prototype.getPad = function () {
        return "string";
    };
    MyTest.prototype.getPadLeft = function () {
        return "string";
    };
    MyTest.prototype.getPadRight = function () {
        return "string";
    };
    MyTest.prototype.getRepeat = function () {
        return "a";
    };
    MyTest.prototype.getTruncate = function () {
        return "abcdefg hijklmn opqrstu vwxyz";
    };
    MyTest.prototype.getTrim = function () {
        return "   string   ";
    };
    MyTest.prototype.getCamelCase = function () {
        return "foo bar fooBar";
    };
    MyTest.prototype.getKebabCase = function () {
        return "foo bar fooBar";
    };
    MyTest.prototype.getSnakeCase = function () {
        return "foo bar fooBar";
    };
    MyTest.prototype.getStartCase = function () {
        return "foo bar fooBar";
    };
    MyTest.prototype.getTitleCase = function () {
        return "foo bar fooBar";
    };
    MyTest.prototype.getWords = function () {
        return "foo bar fooBar";
    };
    __decorate([
        strings_1.cast(parseInt)
    ], MyTest.prototype, "getCastInt", null);
    __decorate([
        strings_1.cast(Boolean)
    ], MyTest.prototype, "getCastBoolean", null);
    __decorate([
        strings_1.cast(function (v) { return ("prefix" + v); })
    ], MyTest.prototype, "getCastCustom", null);
    __decorate([
        strings_1.escape
    ], MyTest.prototype, "getEscape", null);
    __decorate([
        strings_1.pad(10, "_")
    ], MyTest.prototype, "getPad", null);
    __decorate([
        strings_1.padLeft(10, "_")
    ], MyTest.prototype, "getPadLeft", null);
    __decorate([
        strings_1.padRight(10, "_")
    ], MyTest.prototype, "getPadRight", null);
    __decorate([
        strings_1.repeat(5)
    ], MyTest.prototype, "getRepeat", null);
    __decorate([
        strings_1.truncate(10)
    ], MyTest.prototype, "getTruncate", null);
    __decorate([
        strings_1.trim
    ], MyTest.prototype, "getTrim", null);
    __decorate([
        strings_1.camelCase
    ], MyTest.prototype, "getCamelCase", null);
    __decorate([
        strings_1.kebabCase
    ], MyTest.prototype, "getKebabCase", null);
    __decorate([
        strings_1.snakeCase
    ], MyTest.prototype, "getSnakeCase", null);
    __decorate([
        strings_1.startCase
    ], MyTest.prototype, "getStartCase", null);
    __decorate([
        strings_1.titleCase
    ], MyTest.prototype, "getTitleCase", null);
    __decorate([
        strings_1.words
    ], MyTest.prototype, "getWords", null);
    return MyTest;
}());
describe("Strings decorator", function () {
    var c = new MyTest();
    it("cast", function () {
        assert.deepEqual(c.getCastInt(), 1234);
        assert.deepEqual(c.getCastBoolean(), false);
        assert.deepEqual(c.getCastCustom(), "prefix1234");
    });
    it("escape", function () {
        assert.deepEqual(c.getEscape(), "&lt;strong&gt;Escape &amp; &quot;Escape&quot;&lt;/strong&gt;");
    });
    it("pad", function () {
        assert.deepEqual(c.getPad(), "__string__");
    });
    it("padLeft", function () {
        assert.deepEqual(c.getPadLeft(), "____string");
    });
    it("padRight", function () {
        assert.deepEqual(c.getPadRight(), "string____");
    });
    it("repeat", function () {
        assert.deepEqual(c.getRepeat(), "aaaaa");
    });
    it("truncate", function () {
        assert.deepEqual(c.getTruncate(), "abcdefg...");
    });
    it("trim", function () {
        assert.deepEqual(c.getTrim(), "string");
    });
    it("camelCase", function () {
        assert.deepEqual(c.getCamelCase(), "fooBarFooBar");
    });
    it("kebabCase", function () {
        assert.deepEqual(c.getKebabCase(), "foo-bar-foo-bar");
    });
    it("snakeCase", function () {
        assert.deepEqual(c.getSnakeCase(), "foo_bar_foo_bar");
    });
    it("startCase", function () {
        assert.deepEqual(c.getStartCase(), "Foo Bar Foo Bar");
    });
    it("titleCase", function () {
        assert.deepEqual(c.getTitleCase(), "Foo bar fooBar");
    });
    it("words", function () {
        assert.deepEqual(c.getWords(), ["foo", "bar", "foo", "Bar"]);
    });
});
