
import { Json } from "../lib";

@Json.Serializable()
class MyClass {

    constructor (
        private foo: string,
        @Json.serializeParam() public arg: string = "default",
        private _class?: MyClass
    ) {}

    @Json.serializeProperty("barbar", Json.transformers.OverrideValue("999"))
    public bar = "12345";

    @Json.serializeMethod()// "foo", Json.transformers.IsRequired)
    public getFoo () {
        return this.foo;
    }

    @Json.serializeMethod()
    public getClass () {
        return this._class;
    }
}

let c = new MyClass(undefined);
c.bar = "9876";
let d = new MyClass("bar", "arguments", new MyClass("foobar"));
d.arg = "newDefault";

console.log("JSON =>", JSON.stringify((c as any).toJSON()));
console.log("JSON =>", JSON.stringify(d));
