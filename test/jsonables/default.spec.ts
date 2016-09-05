
import assert = require("assert");

import { Json } from "../../lib/jsonables";

@Json.Serializable()
class MyClass {

    public foo: string;
    public bar = "bar";

    private _foo: string;
    private _bar: string;

    constructor (
       private _fooPrivate: string,
       public barPublic: string
    ){}

    public get fooProp () {
        return this._fooPrivate;
    }

    public set fooProp (v: string) {
        this._fooPrivate = v;
    }

    public getFooMethod () {
        return this._foo;
    }

    public setFooMethod (v: string) {
        this._foo = v;
    }

    public barInterface (v: string) {
        if (v === undefined) return this._bar;
        this._bar = v;
    }
}

describe ("Jsonables Default Serialization", function () {

    const c = new MyClass("fooPrivate", "barPublic");
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
