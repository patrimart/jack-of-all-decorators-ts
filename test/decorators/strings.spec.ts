
import assert = require("assert");

import {
    cast, escape, pad, padLeft, padRight, repeat,
    truncate, trim, camelCase, kebabCase, snakeCase, startCase,
    titleCase, words,
} from "../../lib/decorators/strings";


class MyTest {

    @cast(parseInt)
    public getCastInt () {
        return "1234";
    }

    @cast(Boolean)
    public getCastBoolean () {
        return "";
    }

    @cast((v: string) => `prefix${v}`)
    public getCastCustom () {
        return "1234";
    }

    @escape
    public getEscape () {
        return `<strong>Escape & "Escape"</strong>`;
    }

    @pad(10, "_")
    public getPad () {
        return "string";
    }

    @padLeft(10, "_")
    public getPadLeft () {
        return "string";
    }

    @padRight(10, "_")
    public getPadRight () {
        return "string";
    }

    @repeat(5)
    public getRepeat () {
        return "a";
    }

    @truncate(10)
    public getTruncate () {
        return "abcdefg hijklmn opqrstu vwxyz";
    }

    @trim
    public getTrim () {
        return "   string   ";
    }

    @camelCase
    public getCamelCase () {
        return "foo bar fooBar";
    }

    @kebabCase
    public getKebabCase () {
        return "foo bar fooBar";
    }

    @snakeCase
    public getSnakeCase () {
        return "foo bar fooBar";
    }

    @startCase
    public getStartCase () {
        return "foo bar fooBar";
    }

    @titleCase
    public getTitleCase () {
        return "foo bar fooBar";
    }

    @words
    public getWords () {
        return "foo bar fooBar";
    }
}


describe ("Strings decorator", function () {

    const c = new MyTest();

    it ("cast", function () {
        assert.deepEqual(c.getCastInt(), 1234);
        assert.deepEqual(c.getCastBoolean(), false);
        assert.deepEqual(c.getCastCustom(), "prefix1234");
    });

    it ("escape", function () {
        assert.deepEqual(c.getEscape(), "&lt;strong&gt;Escape &amp; &quot;Escape&quot;&lt;/strong&gt;");
    });

    it ("pad", function () {
        assert.deepEqual(c.getPad(), "__string__");
    });

    it ("padLeft", function () {
        assert.deepEqual(c.getPadLeft(), "____string");
    });

    it ("padRight", function () {
        assert.deepEqual(c.getPadRight(), "string____");
    });

    it ("repeat", function () {
        assert.deepEqual(c.getRepeat(), "aaaaa");
    });

    it ("truncate", function () {
        assert.deepEqual(c.getTruncate(), "abcdefg...");
    });

    it ("trim", function () {
        assert.deepEqual(c.getTrim(), "string");
    });

    it ("camelCase", function () {
        assert.deepEqual(c.getCamelCase(), "fooBarFooBar");
    });

    it ("kebabCase", function () {
        assert.deepEqual(c.getKebabCase(), "foo-bar-foo-bar");
    });

    it ("snakeCase", function () {
        assert.deepEqual(c.getSnakeCase(), "foo_bar_foo_bar");
    });

    it ("startCase", function () {
        assert.deepEqual(c.getStartCase(), "Foo Bar Foo Bar");
    });

    it ("titleCase", function () {
        assert.deepEqual(c.getTitleCase(), "Foo bar fooBar");
    });

    it ("words", function () {
        assert.deepEqual(c.getWords(), ["foo", "bar", "foo", "Bar"]);
    });
});
