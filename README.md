[![Build Status](https://travis-ci.org/patrimart/jack-of-all-decorators-ts.svg?branch=master)](https://travis-ci.org/patrimart/jack-of-all-decorators-ts)
[![Coverage Status](https://coveralls.io/repos/github/patrimart/jack-of-all-decorators-ts/badge.svg?branch=master)](https://coveralls.io/github/patrimart/jack-of-all-decorators-ts?branch=master)
[![GitHub version](https://badge.fury.io/gh/patrimart%2Fjack-of-all-decorators-ts.svg)](https://badge.fury.io/gh/patrimart%2Fjack-of-all-decorators-ts)


# Jack-of-All-Decorators (beta)

Is a **TypeScript** library that contains may useful class decorators to help remove some of the tiresome boiler-plate from TypeScript/JavaScript development.
- **Jsonables** adds JSON Serialization/Deserialization to classes.
- **Decorators** wraps class members with convenient transformers, like **lodash** functions and others.

### Jsonables - JSON Serialization/Deserialization of Classes.
Jsonable decorators make classes JSON serializable by adding the `toJSON()` method.

**Example Class with Basic JSON Serialization:**
```ts
@Json.Serializable()
class MyClass {

    constructor (
        public foo: string = "",
        private _bar: string = ""
    ) {}

    public getBar () {
        return this._bar;
    }

    public setBar (v: string) {
        this._bar = v;
    }
}

const myClass = new MyClass ("a", "b");
const json = myClass.toJSON();
console.log(JSON.stringify(myClass));
// Outputs: {"foo": "a", "bar": "b"}

```

**Example JSON Deserialization:**
```ts
const myNewClass = Json.Serializer.deserialize<MyClass>(MyClass, json);
assert.equals(myClass.foo, myNewClass.foo);
assert.equals(myClass.getBar(), myNewClass.getBar());
```

Note: **Jsonables** offers highly customizable JSON serialization options beyond the basic example above. Explore the docs to learn more.

### Decorators - Wrap Class Members with Useful Transformers

The **Decorators** module provides many decorators to augment the input and output of class members. Most deocrators use the amazing **lodash** library. A few others provide features beyond what **lodash** offers.

**Example Decorator Usage:**
```ts
class MyClass {

    private _createdOn = new Date();

    // Returns a copy of the _createdOn Date object.
    @defensiveCopy
    public get createdOn () {
        return this._createdOn;
    }

    // Returns the sum of the array: 15.
    @sum
    public getTotal () {
        return [1, 2, 3, 4, 5];
    }

    // Returns: &lt;strong&gt;TypeScript &amp; JavaScript&lt;/strong&gt;
    @escape
    pubic getHTMLSafe () {
        return "<strong>TypeScript & JavaScript</strong>";
    }

    // Returns: Saturday, June 9, 2007
    @dateFormat("fullDate")
    public getDate() {
        return new Date();
    }
}
```

---

## Installation and Usage

Install via `npm`:

`npm install jack-of-all-decorators`

To import the entire core set of functionality:

```ts
import * as Jack from "jack-of-all-decorators";

@Jack.Json.Serializable()
class MyClass {
    @Jack.repeat(5)
    public getValue() {
        return "value";
    }
}
```
```ts
import { Json, repeat } from "jack-of-all-decorators";

@Json.Serializable()
class MyClass {

    @repeat(5)
    public getValue() {
        return "value";
    }
}
```

To import what you need and use it with ES next function bind (best overall method, if possible):

```ts
import { Json } from "jack-of-all-decorators/jsonables";
import { repeat } from "jack-of-all-decorators/decorators";
import { repeat } from "jack-of-all-decorators/decorators/strings";
```

### TypeScript Compilation
The **TypeScript Compiler** must have the `experimentalDecorators` flag set to `true`.
FYI, the `emitDecoratorMetadata` flag is not necessary.

---

## Jsonables Module

The **Jsonables** decorators make a regular class JSON serializable and deserializable by adding a public `toJSON()` method and a hidden (by `Symbol`) deserialize method.

To mark a class as Jsonable, prefix the decorator `@Json.Serializable()` to the class declaration.

### Default Configuration

Simply adding the `@Json.Serializable()` decorator to a class will apply the basic confguration to the class. Take, for example, this pseudo-class.

```ts
@Json.Serializable()
class MyClass {
    public fooProp: string = ""
    public barProp: string;
    private _fooPrivateProp: string = "";

    constructor (
        public fooParam: string,
        public barParam: string = "",
        private _barPrivateParam: string = ""
    ) {}

    public get fooBar () { ... }
    public set fooBar () { ... }

    public getFoo () { ... }
    public setFoo (v: string) { ... }

    public barInterface (v?: string) {
        if (v === undefined) return this._barPrivateParam;
        this._barPrivateParam = v;
    }
}
```
The added `toJSON()` method will produce the following JSON:
```json
{
    "fooProp": "",
    "barParam": "",
    "fooBar": "...",
    "foo": "...",
    "barInterface": ""
}
```

This is how `@Json.Serializable()` handled the class:
- `fooProp` was seen because it has a default value.
- `barProp` was ignored because it has no default value.
- `_fooPrivateProp` was ignored because it begins with the underscore (`_`) character.
- The constructor params `fooParam`, `barParam` and `_barPrivateParam` were similarly handled.
- The getter/setter `fooBar` was seen and handled.
- The methods `getFoo()` and `setFoo()` were identified as related by removing the get/set prefixes. Their JSON property was assigned as `foo`. If the methods `getFooBar2` and `setFooBar2` were added, they would be assigned the `fooBar2` JSON property.
- `barInterface` was assigned as the getter and setter for the `barInterface` JSON property. All non-obviously paired methods will be treated this way.

"So," you ask, "What if these defaults don't work for me?"

"I'm glad you ask," he replied.

### Advanced JSON Serialization Configuration

There will be times when your class and JSON object will not so nicely mirror their properties. The **Jsonables** module provides other decorators to fine-tune your JSON serialization.

**Note: Adding even one Jsonables decorator to a member will stop all of the basic configuration setup. You're either all-in or all-out.**

To customize JSON serialization, you must explicitly add decorators to all class members you want to serialize. Unlike default configuration, class members with decorators will be seen regardless if they have default values or not.

##### `@Json.Serializable ( configs: IClassConfig )`
The `@Json.Serializable` class decorator can be passed a configuration object with the following properties:
- `defaultConstruction: string[]` will pass the given values to a class during deserialization.
- `autoNameGetters: boolean = true` will identify get*/set* methods and pair them. For example `getFoo()` and `setFoo()` from above.
- `undefinedToNull: boolean = true` will change any `undefined` values to `null`.
- `ignoreNulls: boolean = false` will drop JSON properties that are `null`.
- `toCamelCase: boolean = false` will force class members to camelCase in the JSON.
- `toKebabCase: boolean = false` will force class members to kebab-case in the JSON.
- `toSnakeCase: boolean = false` will force class members to snake_case in the JSON.

##### `@serializeMethod ( name?: string, ...transformers: ITransformerResponse[] )`
##### `@deserializeMethod ( name?: string, ...transformers: ITransformerResponse[] )`
Add these decorators to class methods you want to serialize and deserialize respectively.
- `name: string` overrides the default JSON key.
- `...transformers: ITransformerResponse[]` can affect the JSON value. See below.

##### `@serializeParam ( name?: string, ...transformers: ITransformerResponse[] )`
##### `@deserializeParam ( name?: string, ...transformers: ITransformerResponse[] )`
Add these decorators to constructor parameters you want to serialize and deserialize respectively.
- `name: string` overrides the default JSON key.
- `...transformers: ITransformerResponse[]` can affect the JSON value. See below.

##### `@Json.serializeProperty ( name?: string, ...transformers: ITransformerResponse[] )`
##### `@Json.deserializeProperty ( name?: string, ...transformers: ITransformerResponse[] )`
Add these decorators to class properties (variables) you want to serialize and deserialize respectively.
- `name: string` overrides the default JSON key.
- `...transformers: ITransformerResponse[]` can affect the JSON value. See below.

### Transformers
Transformers are simple functions that can affect the values of serializable members.
- `Json.transformers.DefaultValue ( value: any )` will replace `undefined` with the given value.
- `Json.transformers.OverrideValue ( value: any )` will change any value to the given value.
- `Json.transformers.IsRequired` will throw a `ReferenceError` if the value is `undefined`.
- `Json.transformers.ToBoolean` will cast the value as a `boolean`.
    - Strings with these values are `false`: `"false"`, `"0"`, `"no"`, `"off"` and `""`.
    - Arrays with zero length are `false`.
    - Empty objects are `false`.
    - Else, basic JavaScript truthiness will be enforced.
- `Json.transformers.ToNumber` will `parseFloat` the value.
- `Json.transformers.ToString` will cast the value as a string.

**Examples:**
```ts
@Json.Serializable({
    defaultConstruction: [ "fooParam value", "barParam value", "_barPrivateParam value" ],
    ignoreNulls: true,
})
class MyClass {

    @serializeProperty() @deserializeProperty()
    public fooProp: string = ""
    @serializeProperty() @deserializeProperty()
    public barProp: string;
    private _fooPrivateProp: string = "";

    constructor (
        @serializeParam() @deserializeParam()
        public fooParam: string,
        @serializeParam() @deserializeParam()
        public barParam: string = "",
        private _barPrivateParam: string = ""
    ) {}

    // Only put the decorators on the getter or setter. Not both.
    @Json.serializeMethod()
    @Json.deserializeMethod()
    public get fooBar () { ... }
    public set fooBar () { ... }

    // Changes the default key of "foo" to "isFoo".
    // Returns the value as a boolean.
    @Json.serializeMethod ( "isFoo", Json.transformers.ToBoolean )
    public getFoo () {...}

    // Changes the default key of "foo" to "isFoo"
    // Changes the JSON boolean to a string.
    @Json.deserializeMethod ( "isFoo", Json.transformers.ToString )
    public setFoo (v: string) { ... }

    // Explicitly adds the same behavior as basic config.
    @Json.serializeMethod()
    @Json.deserializeMethod()
    public barInterface (v?: string) { ... }

    // This method, with no decorators, will not be serialized.
    public excludedFromJSON () { ... }
}
```
**Note: Any class members without a decorator will not be serialized/deserialized.**

##### Deserialization Notes
- Deserialization does NOT invoke class constructors. Unless, `@Json.Serializable` has been configured with `defaultConstruction` or `Json.Serializer.deserialize()` is passed constructor param values.
- Deserialization DOES invoke setters and methods. This is unavoidable.

---

## Decorators Module



#### Decorators and Types

TypeScript does not (yet?) support Real-Time-Type-Inference. Meaning: if a decorator changes the return type of a method,
the TypeScript compiler will expect the original return type, not recognizing the new return type.

Here are two "work-arounds" to get around this in a not-too-painful way:

```ts
class MyClass {

    @sum
    public getArray1Sum (): number[] | number {
        return [1, 2, 3, 4, 5];
    }

    @sum
    public getArray2Sum (): number[] {
        return [6, 7, 8, 9];
    }
}

const myClass = new MyClass();
let i: number;
i = myClass.getArray1Sum() as number;
i = <number>myClass.getArray1Sum();
i = myClass.getArray2Sum() as any as number;
```

Personally, I prefer the `getArray1Sum()` example. It at least includes the ultimate return type and any IDE should show it as an option in code hints.

Ultimately, the TypeScript compiler is happy with either work-around. I should confess that I have not tested these work-arounds exhaustively.


### Arrays

### Dates

### Functions

### Objects

### Properties

### Strings

---

## Special Thanks

lodash

dateformat

---

License
-------
(The MIT License)

Copyright (c) 2016 Patrick Martin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the 'Software'), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
