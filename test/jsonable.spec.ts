
import { Json } from "../lib";

@Json.Serializable({
    defaultConstruction: ["foo", "noDefault", "nothing to see here"]
})
class MyClass {

    constructor (
        private foo: string,
        @Json.serializeParam()
        @Json.deserializeParam()
        public arg: string = "default",
        public nothing?: string
    ) {}

    public set booboo (v: string) {

    }

    public get booboo (): string {
        return "h";
    }

    @Json.serializeProperty("barbar") // , Json.transformers.OverrideValue("999"))
    @Json.deserializeProperty("barbar")
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
console.log("nothing =>", c.nothing);
console.log("JSON =>", JSON.stringify(json));
// const a: typeof MyClass = MyClass.prototype;

const clazz = Json.Serializer.deserialize<MyClass>(MyClass, json, "foo", "noDefault", "nothing to see here");
console.log(clazz);
console.log("nothing =>", clazz.nothing);
console.log("bar=", clazz.bar, "getFoo=", clazz.getFoo(), "arg=", clazz.arg);
console.log(JSON.stringify((clazz as any).toJSON()));
