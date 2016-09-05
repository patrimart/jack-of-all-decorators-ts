
import assert = require("assert");

import { Json } from "../../lib/jsonables";

@Json.Serializable()
class MyClass {

    public foo: string;
    @Json.serializeProperty()
    @Json.deserializeProperty()
    public bar = "bar";
    public barIgnore = "bar";

    private _foo: string;
    private _bar: string;

    constructor (
        private _fooPrivate: string,
        @Json.serializeParam()
        @Json.deserializeParam()
        public barPublic: string,
        public barPublicIgnore: string
    ){}

    @Json.serializeMethod()
    @Json.deserializeMethod()
    public get fooProp () {
        return this._fooPrivate;
    }

    public set fooProp (v: string) {
        this._fooPrivate = v;
    }

    @Json.serializeMethod()
    public getFooMethod () {
        return this._foo;
    }

    @Json.deserializeMethod()
    public setFooMethod (v: string) {
        this._foo = v;
    }

    @Json.serializeMethod()
    @Json.deserializeMethod()
    public barInterface (v: string) {
        if (v === undefined) return this._bar;
        this._bar = v;
    }

    public get fooPropIgnore () {
        return this._fooPrivate;
    }

    public set fooPropIgnore (v: string) {
        this._fooPrivate = v;
    }

    public getFooMethodIgnore () {
        return this._foo;
    }

    public setFooMethodIgnore (v: string) {
        this._foo = v;
    }

    public barInterfaceIgnore (v: string) {
        if (v === undefined) return this._bar;
        this._bar = v;
    }
}

describe ("Jsonables Explicit Serialization", function () {

    const c = new MyClass("fooPrivate", "barPublic", "barPublicIgnore");
    c.setFooMethod("SetFooMethod");
    c.barInterface("set barInterface");

    it ("serialize", function () {
        assert.deepEqual(
            JSON.parse(JSON.stringify(c)),
            {"barPublic":"barPublic","bar":"bar","fooProp":"fooPrivate","fooMethod":"SetFooMethod","barInterface":"set barInterface"}
        );
    });

    it ("deserialize", function () {

        const json = {"barPublic":"barPublic","bar":"bar","fooProp":"fooPrivate","fooMethod":"SetFooMethod","barInterface":"set barInterface"};
        const d = Json.Serializer.deserialize<MyClass>(MyClass, json);
        assert.equal(c.bar, d.bar);
        assert.equal(c.barPublic, d.barPublic);
        assert.equal(c.fooProp, d.fooProp, `c.fooProp(${c.fooProp}) !== d.fooProp(${d.fooProp})`);
        assert.equal(c.getFooMethod(), d.getFooMethod());
    });
});
