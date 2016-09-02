
import { Json } from "../lib";

@Json.Serializable()
class MyClass {

    constructor (
        private foo: string,
        @Json.serializeParam()
        public arg: string = "default"
    ) {}

    @Json.serializeProperty("barbar") // , Json.transformers.OverrideValue("999"))
    public bar = "12345";

    @Json.serializeMethod()// "foo", Json.transformers.IsRequired)
    public getFoo () {
        return this.foo;
    }

    @Json.deserializeMethod()
    public setFoo (v: string) {
        this.foo = v;
    }
}

let c = new MyClass(undefined);
c.bar = "9876";
let d = new MyClass("bar", "arguments");
d.arg = "newDefault";

const json = (c as any).toJSON();

console.log(c);
console.log("JSON =>", JSON.stringify(json));
// const a: typeof MyClass = MyClass.prototype;

const clazz = Json.Serializer.deserialize<MyClass>(MyClass, json);
console.log(clazz);
console.log("bar=", clazz.bar, "getFoo=", clazz.getFoo(), "arg=", clazz.arg);
console.log(JSON.stringify((clazz as any).toJSON()))