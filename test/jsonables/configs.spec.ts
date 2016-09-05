
import assert = require("assert");

import { Json } from "../../lib/jsonables";

@Json.Serializable({
    defaultConstruction: [
        "set con param",
        "set _foo2 param",
        "set _bar2 param",
    ],
    autoNameGetters: true,
    toSnakeCase: true,
})
class MyClass {

    public fooProp = "set foo prop";

    private _foo = "ignore private _foo";
    private _bar = "ignore private _bar";

    constructor (
        public conParam: string,
        private _foo2: string,
        private _bar2: string
    ) {}

    public get barSetGet () {
        return this._bar + this._bar2;
    }

    public set barSetGet (v: string) {
        this._bar = v;
    }

    public getFooMethod () {
        return this._foo + this._foo2;
    }

    public setFooMethod (v: string) {
        this._foo = v;
    }
}

describe ("Jsonables Configs Serialization", function () {

    const c = new MyClass("set con param", "set _foo2 param", "set _bar2 param");

    it ("serialize", function () {
        assert.deepEqual(
            JSON.parse(JSON.stringify(c)),
            {
                foo_prop: "set foo prop",
                con_param: "set con param",
                bar_set_get: "ignore private _barset _bar2 param",
                foo_method: "ignore private _fooset _foo2 param",
            }
        );
    });

    it ("deserialize", function () {

        const json = {
            foo_prop: "set foo prop",
            con_param: "set con param",
            bar_set_get: "ignore private _bar",
            foo_method: "ignore private _foo",
        };
        const d = Json.Serializer.deserialize<MyClass>(MyClass, json);
        assert.equal(c.fooProp, d.fooProp, `c.fooProp(${c.fooProp}) !== d.fooProp(${d.fooProp})`);
        assert.equal(c.conParam, d.conParam);
        assert.equal(c.barSetGet, d.barSetGet, `c.barSetGet(${c.barSetGet}) !== d.barSetGet(${d.barSetGet})`);
        assert.equal(c.getFooMethod(), d.getFooMethod());
    });
});
