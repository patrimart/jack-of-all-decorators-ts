
import assert = require("assert");

import { Json } from "../../lib/jsonables";

@Json.Serializable()
class MyClass {

    @Json.serializeProperty("foo", Json.transformers.DefaultValue("default foo"))
    @Json.deserializeProperty("foo")
    public fooProp: string;

    @Json.serializeProperty("bool", Json.transformers.ToBoolean)
    @Json.deserializeProperty("bool", Json.transformers.ToString)
    public toBoolVal = "NO";

    @Json.serializeProperty("str", Json.transformers.ToString)
    @Json.deserializeProperty("str", Json.transformers.ToNumber)
    public toStringVal = 9876;

    private _foo = "ignore private _foo";
    private _bar = "ignore private _bar";

    constructor (
        @Json.serializeParam("con", Json.transformers.ToNumber)
        @Json.deserializeParam("con", Json.transformers.ToString)
        public conParam: string
    ) {}

    @Json.serializeMethod("barBar", Json.transformers.IsRequired)
    @Json.deserializeMethod("barBar", Json.transformers.NotNullable)
    public get barSetGet () {
        return this._bar;
    }

    public set barSetGet (v: string) {
        this._bar = v;
    }

    @Json.serializeMethod("fooFoo", Json.transformers.OverrideValue("override fooFoo"))
    public getFooMethod () {
        return this._foo;
    }

    @Json.deserializeMethod("fooFoo")
    public setFooMethod (v: string) {
        this._foo = v;
    }
}

describe ("Jsonables Transformers Serialization", function () {

    const c = new MyClass("12345");

    it ("serialize", function () {
        assert.deepEqual(
            JSON.parse(JSON.stringify(c)),
            {
                bool: false,
                str: "9876",
                foo: "default foo",
                con: 12345,
                barBar: "ignore private _bar",
                fooFoo: "override fooFoo",
            }
        );
    });

    it ("deserialize", function () {

        const json = {
            bool: false,
            str: "9876",
            foo: "default foo",
            con: 12345,
            barBar: "ignore private _bar",
            fooFoo: "override fooFoo",
        };
        const d = Json.Serializer.deserialize<MyClass>(MyClass, json);
        assert.equal("false", d.toBoolVal, `c.fooProp(${c.fooProp}) !== d.fooProp(${d.fooProp})`);
        assert.equal(c.toStringVal, d.toStringVal);
        assert.equal("default foo", d.fooProp, `c.fooProp(${c.fooProp}) !== d.fooProp(${d.fooProp})`);
        assert.equal(c.conParam, d.conParam);
        assert.equal(c.barSetGet, d.barSetGet, `c.barSetGet(${c.barSetGet}) !== d.barSetGet(${d.barSetGet})`);
        assert.equal("override fooFoo", d.getFooMethod());
    });
});
