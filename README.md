[![Build Status](https://travis-ci.org/patrimart/jack-of-all-decorators-ts.svg?branch=master)](https://travis-ci.org/patrimart/jack-of-all-decorators-ts)
[![Coverage Status](https://coveralls.io/repos/github/patrimart/jack-of-all-decorators-ts/badge.svg?branch=master)](https://coveralls.io/github/patrimart/jack-of-all-decorators-ts?branch=master)
[![GitHub version](https://badge.fury.io/gh/patrimart%2Fjack-of-all-decorators-ts.svg)](https://badge.fury.io/gh/patrimart%2Fjack-of-all-decorators-ts)
[![npm version](https://badge.fury.io/js/jack-of-all-decorators.svg)](https://badge.fury.io/js/jack-of-all-decorators)

# Jack-of-All-Decorators (beta)

Is a **TypeScript** library that contains may useful class decorators to help remove some of the tiresome boiler-plate from TypeScript/JavaScript development.
- **Jsonables** adds JSON Serialization/Deserialization to classes.
- **Decorators** wraps class members with convenient transformers, like **lodash** functions and others.

### Contents
- [**Installation and Usage**](#installation-and-usage)
- [**Jsonables Module**](#jsonables-module)
    - [Default Configuration](#default-configuration)
    - [Advanced Configuration Decorators](#advanced-json-serialization-configuration)
    - [Transformers](#transformers)
- [**Decorators Module**](#decorators-module)
    - [Arrays](#arrays) -- `difference, differenceWith, filterTruthy, flatten, fromTuples, intersection, intersectionWith, iterator, mean, reverse, sample, shuffle, sort, sum, takeWhile, union, unionWith, unique, uniqueWith, xor, xorWith, zip, unzip`
    - [Dates](#dates) -- `dateFormat`
    - [Functions](#functions) -- `curry, defensiveCopy, delay, debounce, defer, iterable, lazy, memoize, partial, rearg, throttle, tryCatch`
    - [Objects](#objects) -- `at, defaults, extend, includes,  mapKeys, mapValues, omit, orderBy, toTuples, toValues`
    - [Properties](#properties) -- `getterSetter, setterGetter`
    - [Strings](#strings) -- `cast, escape, pad, padLeft, padRight, repeat, runcate, trim, camelCase, kebabCase, snakeCase, startCase, titleCase, words`

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
---

# Jsonables Module

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

.

##### `@Json.Serializable ( configs: IClassConfig )`

The `@Json.Serializable` class decorator can be passed a configuration object with the following properties:
- `defaultConstruction: string[]` will pass the given values to a class during deserialization.
- `autoNameGetters: boolean = true` will identify get*/set* methods and pair them. For example `getFoo()` and `setFoo()` from above.
- `undefinedToNull: boolean = true` will change any `undefined` values to `null`.
- `ignoreNulls: boolean = false` will drop JSON properties that are `null`.
- `toCamelCase: boolean = false` will force class members to camelCase in the JSON.
- `toKebabCase: boolean = false` will force class members to kebab-case in the JSON.
- `toSnakeCase: boolean = false` will force class members to snake_case in the JSON.

.

##### `@serializeMethod ( name?: string, ...transformers: ITransformerResponse[] )`
##### `@deserializeMethod ( name?: string, ...transformers: ITransformerResponse[] )`

Add these decorators to class methods you want to serialize and deserialize respectively.

- `name: string` overrides the default JSON key.
- `...transformers: ITransformerResponse[]` can affect the JSON value. See below.


##### `@serializeParam ( name?: string, ...transformers: ITransformerResponse[] )`
##### `@deserializeParam ( name?: string, ...transformers: ITransformerResponse[] )`

Add these decorators to constructor parameters you want to serialize and deserialize respectively.

.

##### `@Json.serializeProperty ( name?: string, ...transformers: ITransformerResponse[] )`
##### `@Json.deserializeProperty ( name?: string, ...transformers: ITransformerResponse[] )`

Add these decorators to class properties (variables) you want to serialize and deserialize respectively.

.

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

#### Deserialization Notes
- Deserialization does NOT invoke class constructors. Unless, `@Json.Serializable` has been configured with `defaultConstruction` or `Json.Serializer.deserialize()` is passed constructor param values.
- Deserialization DOES invoke setters and methods. This is unavoidable.

---
---

# Decorators Module
Class method decorators will allow you modify the behavior and/or return values of your methods. Primarily, this ability is pleasant when it can let the developer (1) avoid boiler-plate code or (2) add obvious functionality.

Ultimately, the goal of the **Decorators** module is to allow developers to create more readable code faster.

### Compound Decorators
It is possible (and desirable) to put more than one decorator on a method. The order in which the decorators are applied to the return value can be critical in many combinations.

**Execution order is from bottom-to-top!** If it helps, think of the value leaving the method and rising up through the decorators.

**In this example, the value "string" will hit decorators `@a()`, `@b()` and `@c()` in that order:**
```ts
@c()
@b()
@a()
public getValue () {
    return "string";
}
```

#### A Note on Decorators and Types
TypeScript does not (yet?) support Decorator-Type-Inference. Meaning: if a decorator changes the return type of a method, the TypeScript compiler will expect the original return type, not recognizing the new return type. Now, since the point of using TypeScript is the benefits of strict typing, we need to solve this.

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
let i: number = myClass.getArray1Sum() as number;
let j: number = <number>myClass.getArray1Sum();
let k: number = myClass.getArray2Sum() as any as number;
```

Personally, I prefer the `getArray1Sum()` example. It at least includes the ultimate return type and any IDE should show it as an option in code hints.

The TypeScript compiler is happy with either work-around. (I should confess that I have not tested these work-arounds exhaustively.)

Let's hope that an official fix (feature) is coming soon.

### Arrays

The arrays module contains the following decorators:
`difference, differenceWith, filterTruthy, flatten, fromTuples, intersection, intersectionWith, iterator, mean, reverse, sample, shuffle, sort, sum, takeWhile, union, unionWith, unique, uniqueWith, xor, xorWith, zip, unzip`

**Import Examples:**
```ts
import { decoratorName } from "jack-of-all-decorators";
import { decoratorName } from "jack-of-all-decorators/decorators";
import { decoratorName } from "jack-of-all-decorators/decorators/arrays";
```
.
#### `@difference`
`difference<T>: (v: T[][]) => T[]`

Creates a new array of array values not included in the other given arrays.

**Example:**
```ts
@difference
public getDifference () {
    return [[1, 2, 3, 4], [3, 4, 5, 6]];
}
// Returns: [1, 2]
```
**lodash docs**: https://lodash.com/docs/4.15.0#difference

.
#### `@differenceWith()`
`differenceWith<T> (f: (a: T, b: T) => boolean): (v: T[][]) => T[]`

This decorator is like `@difference` except that it accepts comparator which is invoked to compare elements of array to values.

**Example:**
```ts
@differenceWith((a: any, b: any) => a.x === b.x)
public getDifferenceWith() {
    return [[{x:1}, {x:2}, {x:3}, {x:4}], [{x:3}, {x:4}, {x:5}, {x:6}]];
}
// Returns: [{x:1}, {x:2}]
```
**lodash docs**: https://lodash.com/docs/4.15.0#differenceWith

.
#### `@filterTruthy`
`filterTruthy<T>: (v: T[]) => T[]`

This decorator creates an array with all falsey values removed.

**Example:**
```ts
@filterTruthy
public getTruthy() {
    return [1, 2, 0, undefined, 3, null, NaN, 4, false, 5];
}
// Returns: [1, 2, 3, 4, 5]
```
**lodash docs**: https://lodash.com/docs/4.15.0#compact

.
#### `@flatten`
`flatten<T>: (v: T[] & T[][]) => T[]`

Recursively flattens array.

**Example:**
```ts
@flatten
public getFlatten () {
    return [1, 2, [3], [4, [5]]];
}
// Returns: [1, 2, 3, 4, 5]
```
**lodash docs**: https://lodash.com/docs/4.15.0#flattenDeep

.
#### `@fromTuples`
`fromTuples<T>: (v: [string, T][]) => {[key:string]: T}`

The inverse of `toTuples`. This method returns an object composed from key-value pairs.

**Example:**
```ts
@fromTuples
public getFromTuples () {
    return [["a", 1], ["b", 2], ["c", 3]];
}
// Returns: { a: 1, b: 2, c: 3 }
```
**lodash docs**: https://lodash.com/docs/4.15.0#fromPairs

.
#### `@intersection`
`intersection<T>: (v: T[][]) => T[]`

Creates an array of unique values that are included in all given arrays.

**Example:**
```ts
@intersection
public getIntersection () {
    return [[1, 2, 3, 4], [3, 4, 5, 6]];
}
// Returns: [3, 4]
```
**lodash docs**: https://lodash.com/docs/4.15.0#intersection

.
#### `@intersectionWith()`
`intersectionWith<T> (f: (a: T, b: T) => boolean): (v: T[][]) => T[]`

This decorator is like `@intersection` except that it accepts comparator which is invoked to compare elements of array to values.

**Example:**
```ts
@intersectionWith((a: any, b: any) => a.x === b.x)
public getIntersectionWith() {
    return [[{x:1}, {x:2}, {x:3}, {x:4}], [{x:3}, {x:4}, {x:5}, {x:6}]];
}
// Returns: [{x:3}, {x:4}]
```
**lodash docs**: https://lodash.com/docs/4.15.0#intersectionWith

.
#### `@iterator`
`iterator<T>: (v: T[]) => Iterator<T>`

Returns an Iterator of the array. Target must be `ES6` to use `for...of`.

**Example:**
```ts
@iterator
public getIterator() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}
const it = myClass.getIterator();
for (let i of it) {
    console.log(i);
}
// Returns: 1 2 3 4 5 6 7 8 9 10
```

.
#### `@mean`
`mean<T>: (v: number[]) => number`

Computes the mean of the values in array.

**Example:**
```ts
@mean
public getMean () {
    return [2, 4, 6, 8, 10, 12];
}
// Returns: 7
```
**lodash docs**: https://lodash.com/docs/4.15.0#mean

.
#### `@reverse`
`reverse<T>: (v: T[]) => T[]`

Reverses to order of items in the given array.

**Example:**
```ts
@reverse
public getReverse () {
    return [1, 2, 3, 4, 5];
}
// Returns: [5, 4, 3, 2, 1]
```
**lodash docs**: https://lodash.com/docs/4.15.0#reverse

.
#### `@sample`
`sample<T>: (v: T[]) => T`

Gets a random element from collection.

**Example:**
```ts
@reverse
public getSample () {
    return [1, 2, 3, 4, 5];
}
// Returns: 1 || 2 || 3 || 4 || 5
```
**lodash docs**: https://lodash.com/docs/4.15.0#reverse

.
#### `@shuffle`
`shuffle<T>: (v: T[]) => T[]`

Creates an array of shuffled values, using a version of the Fisher-Yates shuffle.

**Example:**
```ts
@shuffle
public getShuffle () {
    return [1, 2, 3, 4, 5];
}
// Returns: [3, 1, 5, 2, 4]
```
**lodash docs**: https://lodash.com/docs/4.15.0#shuffle

.
#### `@sort`
`sort<T> (...keys: string[]) => void: (v: T[]) => T[]`

Creates an array of elements, sorted in ascending order by the results of running each element in a collection thru each iteratee.

**Example:**
```ts
@sort("x")
public getSort () {
    return [{x:7}, {x:2}, {x:6}, {x:8}, {x:3}, {x:4}, {x:1}, {x:5}];
}
// Returns: [{x:1}, {x:2}, {x:3}, {x:4}, {x:5}, {x:6}, {x:7}, {x:8}]
```
**lodash docs**: https://lodash.com/docs/4.15.0#sortBy

.
#### `@sum`
`sum<T>: (v: number[]) => number`

Computes the sum of the values in array.

**Example:**
```ts
@sum
public getSum () {
    return [1, 2, 3, 4, 5];
}
// Returns: 15
```
**lodash docs**: https://lodash.com/docs/4.15.0#sum

.
#### `@takeWhile()`
`takeWhile<T> (p: T[]) => boolean: (v: T[]) => T[]`

Creates a slice of array with elements taken from the beginning. Elements are taken until predicate returns false.

**Example:**
```ts
@takeWhile((v: number) => v < 5)
public getTakeWhile () {
    return [1, 2, 3, 4, 5, 6, 7, 8];
}
// Returns: [1, 2, 3, 4]
```
**lodash docs**: https://lodash.com/docs/4.15.0#takeWhile

.
#### `@union`
`union<T>: (a: T[][]) => T[]`

Creates an array of unique values, in order, from all given arrays.

**Example:**
```ts
@union
public getUnion () {
    return [[1, 2, 3, 4], [3, 4, 5, 6]];
}
// Returns: [1, 2, 3, 4, 5, 6]
```
**lodash docs**: https://lodash.com/docs/4.15.0#union

.
#### `@unionWith()`
`unionWith<T> (c: (a: T, b: T) => boolean): (a: T[][]) => T[]`

This decorator is like `@union` except that it accepts a comparator which is invoked to compare elements of arrays.

**Example:**
```ts
@unionWith((a: any, b: any) => a.x === b.x)
public getUnionWith () {
    return [[{x:1}, {x:2}, {x:3}, {x:4}], [{x:3}, {x:4}, {x:5}, {x:6}]];
}
// Returns: [{x:1}, {x:2}, {x:3}, {x:4}, {x:5}, {x:6}]
```
**lodash docs**: https://lodash.com/docs/4.15.0#unionWith

.
#### `@unique`
`unique<T>: (a: T[][]) => T[]`

Creates a duplicate-free version of an array in which only the first occurrence of each element is kept.

**Example:**
```ts
@unique
public getUnique () {
    return [1, 2, 3, 4, 1, 2, 3, 4];
}
// Returns: [1, 2, 3, 4]
```
**lodash docs**: https://lodash.com/docs/4.15.0#uniq

.
#### `@uniqueWith()`
`uniqueWith<T> (c: (a: T, b: T) => boolean): (a: T[][]) => T[]`

This decorator is like `@unique` except that it accepts comparator which is invoked to compare elements of array.

**Example:**
```ts
@uniqueWith((a: any, b: any) => a.x === b.x)
public getUniqueWith () {
    return [{x:1}, {x:2}, {x:3}, {x:4}, {x:3}, {x:4}, {x:5}, {x:6}];
}
// Returns: [{x:1}, {x:2}, {x:3}, {x:4}, {x:5}, {x:6}]
```
**lodash docs**: https://lodash.com/docs/4.15.0#uniqWith

.
#### `@xor`
`xor<T>: (a: T[][]) => T[]`

Creates an array of unique values that is the symmetric difference of the given arrays.

**Example:**
```ts
@xor
public getXor () {
    return [[1, 2, 3, 4, 5] , [4, 5, 6, 7, 8]];
}
// Returns: [1, 2, 3, 6, 7, 8]
```
**lodash docs**: https://lodash.com/docs/4.15.0#xor

.
#### `@xorWith()`
`xorWith<T> (c: (a: T, b: T) => boolean): (a: T[][]) => T[]`

This decorator like `@xor` except that it accepts comparator which is invoked to compare elements of arrays.

**Example:**
```ts
@xorWith((a: any, b: any) => a.x === b.x)
public getXorWith () {
    return [[{x:1}, {x:2}, {x:3}, {x:4}], [{x:3}, {x:4}, {x:5}, {x:6}]];
}
// Returns: [{x:1}, {x:2}, {x:5}, {x:6}]
```
**lodash docs**: https://lodash.com/docs/4.15.0#xorWith

.
#### `@unzip`
`unzip<T>: (a: T[][]) => T[][]`

This decorator is like `@zip` except that it accepts an array of grouped elements and creates an array regrouping the elements to their pre-zip configuration.

**Example:**
```ts
@unzip
public getUnzip () {
    return [ [ 1, true, "a" ], [ 2, false, "b" ], [ 3, true, "c" ] ];
}
// Returns: [[1, 2, 3], [true, false, true], ["a", "b", "c"]]
```
**lodash docs**: https://lodash.com/docs/4.15.0#unzip

.
#### `@zip`
`zip<T>: (a: T[][]) => T[][]`

Creates an array of grouped elements, the first of which contains the first elements of the given arrays, the second of which contains the second elements of the given arrays, and so on.

**Example:**
```ts
@zip
public getZip () {
    return [[1, 2, 3], [true, false, true], ["a", "b", "c"]];
}
// Returns: [ 1, true, "a" ], [ 2, false, "b" ], [ 3, true, "c" ]
```
**lodash docs**: https://lodash.com/docs/4.15.0#zip

---

### Dates

The dates module contains the following decorator:
`dateFormat`

**Import Examples:**
```ts
import { dateFormat } from "jack-of-all-decorators";
import { dateFormat } from "jack-of-all-decorators/decorators";
import { dateFormat } from "jack-of-all-decorators/decorators/dates";
```

.
#### `@dateFormat()`
`dateFormat<T> (f: string): (d: Date) => string`

Formats a Date object into a string.

**Example:**
```ts
@dateFormat("dddd, mmmm dS, yyyy, h:MM:ss TT", true)
public getDate () {
    return new Date(1472965878944);
}
// Returns: "Sunday, September 4th, 2016, 5:11:18 AM"
```
**dataformat docs**: https://github.com/felixge/node-dateformat

---

### Functions

The functions module contains the following decorators:
`curry, defensiveCopy, delay, debounce, defer, iterable, lazy, memoize, partial, rearg, throttle, tryCatch`

**Import Examples:**
```ts
import { decoratorName } from "jack-of-all-decorators";
import { decoratorName } from "jack-of-all-decorators/decorators";
import { decoratorName } from "jack-of-all-decorators/decorators/functions";
```

.
#### `@debounce()`
`debounce (wait: number, maxWait = wait * 4, leading = true, trailing = ! leading): () => void`

Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked. See the **lodash** docs for more.

**Example:**
```ts
@debounce(100, 100, true, false)
public callDebounce () { ... }
```
**lodash docs**: https://lodash.com/docs/4.15.0#debounce

.
#### `@curry`
`curry<T>: (...a: any[]) => (...a: any[]) => T`

Creates a method that accepts arguments and either invokes returning its result, if at least arity number of arguments have been provided, or returns a function that accepts the remaining func arguments, and so on.

**Example:**
```ts
...
@curry
public callCurry (a: string, b: string, c: string, d: string) {
    return a + b + c + d;
}
...
myCLass.callCurry("a")("b")("c")("d");
// Returns: "abcd"
```
**lodash docs**: https://lodash.com/docs/4.15.0#curry

.
#### `@defer`
`defer<T>: (...a: T[]) => void`

Defers invoking the method until the current call stack has cleared. Basically, wraps the method in `setImmediate()`.

**Example:**
```ts
@defer
public callDefer () { ... }
```
**lodash docs**: https://lodash.com/docs/4.15.0#defer

.
#### `@delay()`
`delay (wait: number): (...any[]) => void`

Invokes method after `wait` milliseconds.

**Example:**
```ts
@delay(500)
public callDelay () { ... }
```
**lodash docs**: https://lodash.com/docs/4.15.0#delay

.
#### `@defensiveCopy`
`defensiveCopy<T>: (...any[]) => T`

Makes a deep copy of the return value.

**Example:**
```ts
@defensiveCopy
public callDefensiveCopy (): Date {
    return this._date;
}
// Returns a new Date object.
```
**lodash docs**: https://lodash.com/docs/4.15.0#cloneDeep

.
#### `@iterable()`
`iterable<T> (limit = Number.MAX_SAFE_INTEGER): (...any[]) => Iterator<T>`

Turns a method into an Iterable\<T>, invoking it on each iteration. Requires target `ES6` to use with `for...of`.

**Example:**
```ts
...
@iterable(10)
public getIterable () {
    return Math.random();
}
...
const it = myClass.getIterable():
for (const rand of it) {
    console.log(rand);
}
// Loops 10 times, returning a new random number each iteration.
```
**Learn More:** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators

.
#### `@memoize`
`memoize<T>: (...any[]) => T`

Creates a method that memoizes the result of the first invocation. Subsequent invocations return the same result with no side effects.

**Example:**
```ts
@memoize
public getMemoize (count: number) {
    return this.counter = count;
}
// Returns the count value on each invocation while only assigning this.counter once.
```
**lodash docs**: https://lodash.com/docs/4.15.0#cloneDeep

.
#### `@partial()`
`partial<T> (...a: any[]): (b: any) => T`

Creates a method that invokes with partials prepended to the arguments it receives.

**Example:**
```ts
...
@partial("a", "b", "c")
public callPartial (a: string, b: string, c: string, d: string) {
    return a + b + c + d;
}
...
myCLass.callPartial("d");
// Returns: "abcd"
```
**lodash docs**: https://lodash.com/docs/4.15.0#partial

.
#### `@rearg()`
`rearg<T> (...n: number[]): (...any[]) => T`

Creates a method that invokes with arguments arranged according to the specified indexes.

**Example:**
```ts
...
@rearg(3, 2, 1, 0)
public getReArg (a: string, b: string, c: string, d: string) {
    return a + b + c + d;
}
...
myClass.getReArg("a", "b", "c", "d")
// Returns: "dcba"
```
**lodash docs**: https://lodash.com/docs/4.15.0#rearg

.
#### `@throttle()`
`throttle (wait: number, leading = true, trailing = ! leading): (...any[]) => void`

Creates a throttled method that only invokes at most once per every `wait` milliseconds. See docs for more.

**Example:**
```ts
@throttle(100)
public callThrottle () {...}
```
**lodash docs**: https://lodash.com/docs/4.15.0#throttle

.
#### `@tryCatch`
`tryCatch<T>: (...any[]) => T`

Wraps the method in a `try...catch()` block. Returns `undefined` if an error is thrown.

**Example:**
```ts
@tryCatch
public getTryCatch () {
    throw new Error("Try and catch this!");
}
// Returns: undefined
```

---


### Objects

The objects module contains the following decorators:
`at, defaults, extend, includes, mapKeys, mapValues, omit, orderBy, toTuples, toValues`

**Import Examples:**
```ts
import { decoratorName } from "jack-of-all-decorators";
import { decoratorName } from "jack-of-all-decorators/decorators";
import { decoratorName } from "jack-of-all-decorators/decorators/objects";
```

.
#### `@at()`
`at (...a: string[]): (o: Object) => any[]`

Creates an array of values corresponding to paths of object.

**Example:**
```ts
@at(['a[0].b.c', 'a[1]'])
public getAt () {
    return { 'a': [{ 'b': { 'c': 3 } }, 4] };
}
// Returns: [3, 4]
```
**lodash docs:** https://lodash.com/docs/4.15.0#at

.
#### `@defaults()`
`defaults<T extends Object> (...s: Object[]): (o: Object) => T`

Assigns own and inherited enumerable string keyed properties of source objects to the destination object for all destination properties that resolve to undefined. Source objects are applied from left to right. Once a property is set, additional values of the same property are ignored.

**Example:**
```ts
@defaults({b: 2}, {d: {d2: 2}}, {a: 4})
public getDefaults () {
    return { a: 1, c: 3, d: {d1: 1, d3: 3}};
}
// Returns: { a: 1, b: 2, c: 3, d: {d1: 1, d2: 2, d3: 3}}
```
**lodash docs:** https://lodash.com/docs/4.15.0#defaults

.
#### `@extend()`
`extend<T extends Object> (...s: Object[]): (o: Object) => T`

Assigns own enumerable string keyed properties of source objects to the destination object. Source objects are applied from left to right. Subsequent sources overwrite property assignments of previous sources.

**Example:**
```ts
@extend({b: 2}, {d: {d2: 2}}, {a: 4})
public getExtend() {
    return { a: 1, c: 3, d: {d1: 1, d3: 3}};
}
// Returns: { a: 4, b: 2, c: 3, d: {d2: 2}}
```
**lodash docs:** https://lodash.com/docs/4.15.0#assign

.
#### `@includes()`
`includes<T extends any[] | Object | string> (searchValue: any, offset = 0): (o: T) => T`

Checks if value is in collection. If collection is a string, it's checked for a substring of value. If `offset` is negative, it's used as the offset from the end of collection.

**Example:**
```ts
@includes(2)
public getIncludesObj () {
    return {x: 1, y: 2, z: 3};
}
// Returns: true
```
**lodash docs:** https://lodash.com/docs/4.15.0#includes

.
#### `@mapKeys()`
`mapKeys (i: (v: any, k: string) => string): (o: Object) => Object`

The opposite of `@mapValues`. This decorator creates an `Object` with the same values as `o` and keys transformed by the iteratee.

**Example:**
```ts
@mapKeys((v: number, k: string) => k + v)
public getMapKeys () {
    return {x: 1, y: 2, z: 3};
}
// Returns: {x1: 1, y2: 2, z3: 3}
```
**lodash docs**: https://lodash.com/docs/4.15.0#mapKeys

.
#### `@mapValues()`
`mapKeys (i: (v: any, k?: string) => any): (o: Object) => Object`

The opposite of `@mapKeys`. This decorator creates an `Object` with the same keys as `o` and values transformed by the iteratee.

**Example:**
```ts
@mapValues((v: number) => v * v)
public getMapValues () {
    return {x: 1, y: 2, z: 3};
}
// Returns: {x: 1, y: 4, z: 9}
```
**lodash docs**: https://lodash.com/docs/4.15.0#mapValues

.
#### `@omit()`
`omit (p: (v: any, k?: string) => boolean): (o: Object) => Object`

`omit (...keys: string[]): (o: Object) => Object`

This decorator creates an object with properties removed by predicate or key array.

**Example:**
```ts
@omit((v: any, k: string) => v % 2 === 0)
public getOmit1 () {
    return {x: 1, y: 2, z: 3};
}
// Returns: {x: 1, z: 3}
@omit(["x", "y"])
public getOmit2 () {
    return {x: 1, y: 2, z: 3};
}
// Returns: {z: 3}
```
**lodash docs**: https://lodash.com/docs/4.15.0#omit

**lodash docs**: https://lodash.com/docs/4.15.0#omitBy

.
#### `@orderBy()`
`orderBy<T> (keys: string, order: string): (a: T[]) => T[]`

This decorator orders an array of objects by key. `keys` is a space-delimited list. `order` is a space-delimited list of order direction: `asc` or `desc`.

**Example:**
```ts
@orderBy("age name", "desc asc")
public getOrderBy () {
    return [{name: "Bob", age: 25}, {name: "Jane", age: 18}, {name: "Chris", age: 20}];
}
// Returns: [{name: "Bob", age: 25}, {name: "Chris", age: 20}, {name: "Jane", age: 18}]
```
**lodash docs**: https://lodash.com/docs/4.15.0#orderBy

.
#### `@toTuples`
`toTuples<T>: (o: {[key:string]: T) => [string, T][]`

The opposite of `fromTuples`. This decorator transforms an object into an array of key/value pairs.

**Example:**
```ts
@toTuples
public getToTuples () {
    return {x: 1, y: 2, z: 3};
}
// Returns: [["x", 1], ["y", 2], ["z", 3]]
```
**lodash docs**: https://lodash.com/docs/4.15.0#toPairsIn

.
#### `@toValues`
`toValues<T>: (o: {[key:string]: T) => T[]`

The opposite of `Object.keys()`. This decorator returns the Object values as an array.

**Example:**
```ts
@toValues
public getToValues () {
    return {x: 1, y: 2, z: 3};
}
// Returns: [1, 2, 3]
```
**lodash docs**: https://lodash.com/docs/4.15.0#valuesIn

---

### Properties

The properties module contains the following decorators:
`getterSetter, setterGetter`

**Import Examples:**
```ts
import { getterSetter, setterGetter } from "jack-of-all-decorators";
import { getterSetter, setterGetter } from "jack-of-all-decorators/decorators";
import { getterSetter, setterGetter } from "jack-of-all-decorators/decorators/properties";
```

.
#### `@getterSetter()`
`getterSetter<T> (...decorators: any[]): () => T`

This decorator converts the class property into a getter/setter. Optionally, other decorators can applied to the getter. Choose `@getterSetter` if "gets" will be less than "sets" on this variable.

**Example:**
```ts
class MyClass {
    @getterSetter(
        reverse,
        words
    )
    public decorateGetter = "This is a getter";
}
// Returns: ["getter", "a", "is", "This"]
```

.
#### `@setterGetter()`
`setterGetter<T> (...decorators: any[]): () => T`

This decorator converts the class property into a getter/setter. Optionally, other decorators can applied to the setter. Choose `@setterGetter` if "gets" will be more than "sets" on this variable.

**Example:**
```ts
class MyClass {
    @setterGetter(
        reverse,
        words
    )
    public decorateSetter = "And this is a setter";
}
// Returns: ["setter", "a", "is", "this", "And"]
```

---

### Strings

The strings module contains the following decorators:
`cast, escape, pad, padLeft, padRight, repeat,  truncate, trim, camelCase, kebabCase, snakeCase, startCase, titleCase, words`

**Import Examples:**
```ts
import { decoratorName } from "jack-of-all-decorators";
import { decoratorName } from "jack-of-all-decorators/decorators";
import { decoratorName } from "jack-of-all-decorators/decorators/strings";
```

.
#### `@cast()`
`cast<T> (c: (v: string) => T): (v: string) => T`

This decorator applies a function to the return value.

**Example:**
```ts
@cast(parseInt)
public getCastInt () {
    return "1234";
}
// Returns: 1234
@cast(Boolean)
public getCastBoolean () {
    return "";
}
// Returns: false
@cast((v: string) => `prefix${v}`)
public getCastCustom () {
    return "1234";
}
// Returns: "prefix1234"
```


.
#### `@escape`
`escape: (s: string) => string`

Converts the characters "&", "<", ">", '"', "'", and "`" in string to their corresponding HTML entities.

**Example:**
```ts
@escape
public getEscape () {
    return `<strong>Escape & "Escape"</strong>`;
}
// Returns: "&lt;strong&gt;Escape &amp; &quot;Escape&quot;&lt;/strong&gt;"
```
**lodash docs**: https://lodash.com/docs/4.15.0#escape

.
#### `@pad()`
`pad (len: number, chars = ""): (v: string) => string`

Pads `string` on the left and right sides if it's shorter than length. Padding characters are truncated if they can't be evenly divided by length.

**Example:**
```ts
@pad(10, "_")
public getPad () {
    return "string";
}
// Returns: "__string__"
```
**lodash docs**: https://lodash.com/docs/4.15.0#pad

.
#### `@padLeft()`
`padLeft (len: number, chars = ""): (v: string) => string`

Pads `string` on the left side if it's shorter than length. Padding characters are truncated if they exceed length.

**Example:**
```ts
@padLeft(10, "_")
public getPadLeft () {
    return "string";
}
// Returns: "____string"
```
**lodash docs**: https://lodash.com/docs/4.15.0#padStart

.
#### `@padRight()`
`padRight (len: number, chars = ""): (v: string) => string`

Pads `string` on the right side if it's shorter than length. Padding characters are truncated if they exceed length.

**Example:**
```ts
@padRight(10, "_")
public getPadRight () {
    return "string";
}
// Returns: "string____"
```
**lodash docs**: https://lodash.com/docs/4.15.0#padStart

.
#### `@repeat()`
`repeat (n: number): (v: string) => string`

Repeats the string `n` times.

**Example:**
```ts
@repeat(5)
public getRepeat () {
    return "a";
}
// Returns: "aaaaa"
```
**lodash docs**: https://lodash.com/docs/4.15.0#repeat

.
#### `@truncate()`
`truncate (length: number, omission = "...", separator: RegExp | string = " "): (v: string) => string`

Truncates `string` if it's longer than the given maximum string length. The last characters of the truncated string are replaced with the omission string.

**Example:**
```ts
@truncate(10)
public getTruncate () {
    return "abcdefg hijklmn opqrstu vwxyz";
}
// Returns: "abcdefg..."
```
**lodash docs**: https://lodash.com/docs/4.15.0#truncate

.
#### `@trim`
`trim: (s: string) => string`

Removes leading and trailing whitespace.

**Example:**
```ts
@trim
public getTrim () {
    return "   string   ";
}
// Returns: "string"
```
**lodash docs**: https://lodash.com/docs/4.15.0#trim

.
#### `@words`
`words: (s: string) => string[]`

Splits string into an array of its words.

**Example:**
```ts
@words
public getWords () {
    return "foo bar & fooBar";
}
// Returns: ["foo", "bar", "foo", "Bar"]
```
**lodash docs**: https://lodash.com/docs/4.15.0#words

.
#### `@camelCase @kebabCase @snakeCase @startCase @titleCase`
`____Case: (s: string) => string`

Converts string to the specified case.

**Example:**
```ts
@____Case
public getCase () {
    return "foo bar fooBar";
}
// camelCase: "fooBarFooBar"
// kebabCase: "foo-bar-foo-bar"
// snakeCase: "foo_bar_foo_bar"
// startCase: "Foo Bar Foo Bar"
// titleCase: "Foo bar fooBar"
```
**lodash docs**: https://lodash.com/docs/4.15.0#camelCase

---

## Special Thanks

I stand upon the shoulders of giants

### lodash -- https://github.com/lodash/lodash/
The **lodash** library is used extensively in the **Decorators** module.

### dateformat -- https://github.com/felixge/node-dateformat
The **dateformat** library is used by the **dateFormat** decorator.

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
