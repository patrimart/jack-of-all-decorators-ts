
import { Json } from "../lib";

@Json.Serializable()
class MyClass {

    constructor (
        private foo: string,
        @Json.serializeParam() public arg: string = "default"
    ) {}

    @Json.serializeProperty("barbar", Json.transformers.OverrideValue("999"))
    public bar = "12345";

    @Json.serializeMethod()// "foo", Json.transformers.IsRequired)
    public getFoo () {
        return this.foo;
    }

}

let c = new MyClass(undefined);
c.bar = "9876";
let d = new MyClass("bar");
d.arg = "newDefault";

console.log("JSON =>", JSON.stringify((c as any).toJSON()));
console.log("JSON =>", JSON.stringify(d));
