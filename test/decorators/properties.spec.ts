
import assert = require("assert");

import { setterGetter, getterSetter } from "../../lib/decorators/properties";
import { words } from "../../lib/decorators/strings";
import { reverse } from "../../lib/decorators/arrays";

class MyTest {

    @getterSetter(
        reverse,
        words
    )
    public decorateGetter = "This is a getter";

    @setterGetter(
        reverse,
        words
    )
    public decorateSetter = "And this is a setter";
}


describe ("Properties decorator", function () {

    const c = new MyTest();

    it ("getterSetter", function () {
        assert.deepEqual(c.decorateGetter, ["getter", "a", "is", "This"]);
    });

    it ("setterGetter", function () {
        assert.deepEqual(c.decorateSetter, ["setter", "a", "is", "this", "And"]);
    });

});
