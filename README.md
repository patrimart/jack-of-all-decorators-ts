[![Build Status](https://travis-ci.org/patrimart/jack-of-all-decorators-ts.svg?branch=master)](https://travis-ci.org/patrimart/jack-of-all-decorators-ts)
[![Coverage Status](https://coveralls.io/repos/github/patrimart/jack-of-all-decorators-ts/badge.svg?branch=master)](https://coveralls.io/github/patrimart/jack-of-all-decorators-ts?branch=master)
[![GitHub version](https://badge.fury.io/gh/patrimart%2Fjack-of-all-decorators-ts.svg)](https://badge.fury.io/gh/patrimart%2Fjack-of-all-decorators-ts)
[![npm version](https://badge.fury.io/js/jack-of-all-decorators.svg)](https://badge.fury.io/js/jack-of-all-decorators)

# Jack-of-All-Decorators (beta)

Is a **TypeScript** library that contains may useful class decorators to help remove some of the tiresome boiler-plate from TypeScript/JavaScript development.
- **Jsonables** adds JSON Serialization/Deserialization to classes.
- **Decorators** wraps class members with convenient transformers, like **lodash** functions and others.
- **Dependency Injection** handles instantiation/destruction of class dependencies at the global and/or module level.


## Installation

Install via `npm`:

`npm install jack-of-all-decorators`


## Documentation Wiki

View the docs at the [GitHub Wiki](https://github.com/patrimart/jack-of-all-decorators-ts/wiki).


---
### Brief Intro to the Library...

## Jsonables - JSON Serialization/Deserialization of Classes.
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


## Decorators - Wrap Class Members with Useful Transformers

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

## Dependency Injection - Handle Class Dependencies

The **Dependency Injection** module provides an easy way to manage class dependencies. Dependencies are instantiated as Singletons that are sandboxed to the global or given module namespace.

**Example Dependency Injection Usage:**
```ts
@DI.Injectable()
class Foo implements DI.IInjectable {

    public guid = Math.random().toString(36).substr(2);

    public destruct() {
        this.guid = null;
    }
}

@DI.Injectable()
class MyClass implements DI.IInjectable {

    constructor (
        @DI.Inject(Foo) public foo: Foo
    ) {}

    public destruct () {
        this.foo = null;
    }
}

const myClass = DI.Modularize<MyClass>(MyClass, "module.path");
console.log(myClass.foo.guid);
DI.Destruct("module.path");
```


---

## Special Thanks

I stand upon the shoulders of giants

### lodash -- https://github.com/lodash/lodash/
The **lodash** library is used extensively in the **Decorators** module.

### dateformat -- https://github.com/felixge/node-dateformat
The **dateformat** library is used by the **dateFormat** decorator.


---

## License

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
