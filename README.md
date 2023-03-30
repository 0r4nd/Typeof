Typeof class
=====================


Typeof() usage
---------------------
```javascript
if (Typeof([]) === 'array') console.log("it's an array");
```
| input             | result      |
|:------------------|:------------|
| Typeof() | 'undefined' |
| Typeof(undefined) | 'undefined' |
| Typeof(null) | 'null' |
| Typeof(false) | 'boolean' |
| Typeof(5) | 'number' |
| Typeof(NaN) | 'number' |
| Typeof(Infinity) | 'number' |
| Typeof(Number("123")) | 'number' |
| Typeof("one") | 'string' |
| Typeof({}) | 'object' |
| Typeof([]) | 'array' |
| Typeof(new Array(1)) | 'array' |
| Typeof(new Float32Array(1)) | 'float32array' |
| Typeof(new ArrayBuffer(1)) | 'arraybuffer' |
| Typeof("a"[Symbol.iterator]()) | 'string iterator' |
| Typeof(()=>{}) | 'function' |

Typeof.isPrimitive() usage
---------------------
```javascript
if (Typeof.isPrimitive(1)) console.log("primitive type!");
```
| input             | result      |
|:------------------|:------------|
| Typeof.isPrimitive(true) | 'true' |
| Typeof.isPrimitive(undefined) | 'true' |
| Typeof.isPrimitive() | 'true' |
| Typeof.isPrimitive(null) | 'true' |
| Typeof.isPrimitive(1) | 'true' |
| Typeof.isPrimitive(9007199254740991n) | 'true' |
| Typeof.isPrimitive("a") | 'true' |
| Typeof.isPrimitive(Symbol.iterator) | 'true' |
| Typeof.isPrimitive(new Boolean(true)) | 'false' |
| Typeof.isPrimitive(new Number(1)) | 'false' |
| Typeof.isPrimitive(BigInt("42")) | 'true' |
| Typeof.isPrimitive(new String("a")) | 'false' |

Typeof.isArray() usage
---------------------
```javascript
if (Typeof.isArray(new Array())) console.log("array!");
```
| input             | result      |
|:------------------|:------------|
| Typeof.isArray([]) | 'true' |
| Typeof.isArray(new Array(2)) | 'true' |
| Typeof.isArray("a") | 'false' |
| Typeof.isArray(new Float32Array(2)) | 'false' |

Typeof.isString() usage
---------------------
```javascript
if (Typeof.isString((_=>"a")())) console.log("im a string!");
```
| input             | result      |
|:------------------|:------------|
| Typeof.isString("a") | 'true' |
| Typeof.isString(new String("a")) | 'true' |
| Typeof.isString((_=>"a")()) | 'true' |

Typeof.isIterable() usage
---------------------
```javascript
if (Typeof.isIterable(new Int32Array(5)) console.log("iterable!");
```
| input             | result      |
|:------------------|:------------|
| Typeof.isIterable([]) | 'true' |
| Typeof.isIterable(new Array(2)) | 'true' |
| Typeof.isIterable(new Float32Array(2)) | 'true' |
| Typeof.isIterable("a") | 'true' |
| Typeof.isIterable(new String("a")) | 'true' |
| Typeof.isIterable(customiterator) | 'true' |

Primitives (or wrappers to them)
---------------------
| input       | result      | comment     |
|:------------|:------------|:------------|
| Typeof.types() | ['undefined','primitive'] | -- |
| Typeof.types(undefined) | ['undefined','primitive'] | -- |
| Typeof.types(null) | ['null','primitive'] | null¹ is a primitive |
| Typeof.types(false) | ['boolean','primitive'] | -- |
| Typeof.types(5) | ['number','primitive'] | -- |
| Typeof.types(NaN) | ['number','primitive'] | IEEE 754 floats include NaN |
| Typeof.types(Infinity) | ['number','primitive'] | -- |
| Typeof.types(Number("123")) | ['number','primitive'] | -- |
| Typeof.types("one") | ['string','primitive'] | -- |
| Typeof.types(new Boolean(1)) | ['boolean','object'] | -- |
| Typeof.types(new String("one")) | ['string','object'] | -- |
| Typeof.types(new Number("123")) | ['number','object'] | -- |

¹ (typeof null) return "object" only for legacy reasons.

Basic objects
---------------------
| input       | result      | comment     |
|:------------|:------------|:------------|
| Typeof.types({}) | ['object','object'] | -- |
| Typeof.types(new Object()) | ['object','object'] | -- |

Arrays, Set, Map, etc
---------------------
| input       | result      | comment     |
|:------------|:------------|:------------|
| Typeof.types([]) | ['array','object'] | -- |
| Typeof.types(new Array(1)) | ['array','object'] | -- |
| Typeof.types(new Float32Array(1)) | ['float32array','typedarray'] | -- |
| Typeof.types(new ArrayBuffer(1)) | ['arraybuffer','object'] | -- |
| Typeof.types(new DataView(new ArrayBuffer(2))) | ['dataview','object'] | -- |
| Typeof.types(new Set()) | ['set','object'] | -- |
| Typeof.types(new Map()) | ['map','object'] | -- |
| Typeof.types(new WeakSet()) | ['weakset','object'] | -- |
| Typeof.types(new WeakMap()) | ['weakmap','object'] | -- |
| Typeof.types((new Set(['a'])).values())) | ['set iterator','iterator'] | -- |
| Typeof.types((new Map([[1,'a']])).values()) | ['map iterator','iterator'] | -- |
| Typeof.types("a"[Symbol.iterator]()) | ['string iterator','iterator'] | -- |

Functions
---------------------
| input       | result      | comment     |
|:------------|:------------|:------------|
| Typeof.types(function(){}) | ['function','object'] | -- |
| Typeof.types(()=>{}) | ['function','object'] | -- |
| Typeof.types(new (function(){})) | ['object','object'] | -- |
| Typeof.types(class C {}) | ['function','object'] | -- |
| Typeof.types(new (class {constructor(){}})) | ['object','object'] | -- |
| Typeof.types(new Function("")) | ['function','object'] | -- |
| Typeof.types(function *(){}) | ['generatorFunction','generator'] | -- |
| Typeof.types((function(){return arguments})()) | ['arguments','object'] | -- |

Regexp
---------------------
| input       | result      | comment     |
|:------------|:------------|:------------|
| Typeof.types(/a/g) | ['regexp','object'] | -- |
| Typeof.types(new RegExp("a","g")) | ['regexp','object'] | -- |

Errors
---------------------
| input       | result      | comment     |
|:------------|:------------|:------------|
| Typeof.types(new Error("error")) | ['error','object'] | -- |
| Typeof.types(new TypeError("type error")) | ['error','object'] | -- |

Misc
---------------------
| input       | result      | comment     |
|:------------|:------------|:------------|
| Typeof.types(new Date()) | ['date','object'] | -- |
| Typeof.types(Promise.resolve()) | ['promise','object'] | -- |

User Classes
---------------------
```javascript
function Vector2(x=0,y=0){this.x=x;this.y=y;}
var PersonAnonym = function(name='',age=20){this.name=name;this.age=age;}

Typeof.removeType(Date);
Typeof.addType(Vector2);
Typeof.addType(PersonAnonym, 'To be,', 'or not to be');
```
| input       | result      | comment     |
|:------------|:------------|:------------|
| Typeof.types(new Vector2()) | ['vector2','object'] | -- |
| Typeof.types(new Date()) | ['object','object'] | because removed above |
| Typeof.types(new PersonAnonym()) | ['To be,','or not to be'] | -- |
