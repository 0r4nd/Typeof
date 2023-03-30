      
'use strict';

var cumul = '';

function makeRangeIterator(start = 0, end = Infinity, step = 1) {
  var nextIndex = start;
  var i = 0;
  const rangeIterator = {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      var result;
      if (nextIndex < end) {
        result = { value: nextIndex, done: false }
        nextIndex += step;
        i++;
        return result;
      }
      return { value: i, done: true }
    }
  };
  return rangeIterator;
}



function check(input, obj, comment="") {
  var r = Typeof.types(obj);
  cumul += `| Typeof.types(${input}) | ['${r[0]}','${r[1]}'] | ${comment?comment:"--"} |\n`;
}
function checkTypeof(input, obj, comment="") {
  var r = Typeof(obj);
  cumul += `| Typeof(${input}) | '${r}' |\n`;
}
function checkIsPrimitive(input, obj, comment="") {
  var r = Typeof.isPrimitive(obj);
  cumul += `| Typeof.isPrimitive(${input}) | '${r}' |\n`;
}
function checkIsArray(input, obj, comment="") {
  var r = Typeof.isArray(obj);
  cumul += `| Typeof.isArray(${input}) | '${r}' |\n`;
}
function checkIsString(input, obj, comment="") {
  var r = Typeof.isString(obj);
  cumul += `| Typeof.isString(${input}) | '${r}' |\n`;
}
function checkIsTypedArray(input, obj, comment="") {
  var r = Typeof.isTypedArray(obj);
  cumul += `| Typeof.isTypedArray(${input}) | '${r}' |\n`;
}
function checkIsArrayOrString(input, obj, comment="") {
  var r = Typeof.isArrayOrString(obj);
  cumul += `| Typeof.isArrayOrString(${input}) | '${r}' |\n`;
}
function checkIsArrayOrTypedArray(input, obj, comment="") {
  var r = Typeof.isArrayOrTypedArray(obj);
  cumul += `| Typeof.isArrayOrTypedArray(${input}) | '${r}' |\n`;
}
function checkIsArrayOrStringOrTypedArray(input, obj, comment="") {
  var r = Typeof.isArrayOrStringOrTypedArray(obj);
  cumul += `| Typeof.isArrayOrStringOrTypedArray(${input}) | '${r}' |\n`;
}
function checkIsIterable(input, obj, comment="") {
  var r = Typeof.isIterable(obj);
  cumul += `| Typeof.isIterable(${input}) | '${r}' |\n`;
}
function checkIsIterator(input, obj, comment="") {
  var r = Typeof.isIterator(obj);
  cumul += `| Typeof.isIterator(${input}) | '${r}' |\n`;
}


function tests() {
  console.clear();
  cumul += '\n######## Typeof() ########\n';
  cumul += "| input             | result      |\n";
  cumul += "|:------------------|:------------|\n";
  checkTypeof(''); // undefined
  checkTypeof('undefined', undefined); // undefined
  checkTypeof('null', null); // null
  checkTypeof('false', false); // boolean
  checkTypeof('5', 5); // number
  checkTypeof('NaN', NaN); // number. 
  checkTypeof('Infinity', Infinity); // number
  checkTypeof('Number("123")', Number('123')); // number
  checkTypeof('"one"', 'one'); // string
  checkTypeof('{}', {});
  checkTypeof('[]', []);
  checkTypeof('new Array(1)', new Array(1));
  checkTypeof('new Float32Array(1)', new Float32Array(1));
  checkTypeof('new ArrayBuffer(1)', new ArrayBuffer(1));
  checkTypeof('"a"[Symbol.iterator]()', "a"[Symbol.iterator]());
  checkTypeof('()=>{}', ()=>{});

  cumul += '\n######## Typeof.isPrimitive() ########\n';
  cumul += "| input             | result      |\n";
  cumul += "|:------------------|:------------|\n";
  checkIsPrimitive("true", true);
  checkIsPrimitive("undefined", undefined);
  checkIsPrimitive("");
  checkIsPrimitive("null",null);
  checkIsPrimitive("1", 1);
  checkIsPrimitive("9007199254740991n", 9007199254740991n);
  checkIsPrimitive('"a"', "a");
  checkIsPrimitive("Symbol.iterator",Symbol.iterator);
  checkIsPrimitive("new Boolean(true)", new Boolean(true));
  checkIsPrimitive("new Number(1)", new Number(1));
  checkIsPrimitive('BigInt("42")', BigInt("42"));
  checkIsPrimitive('new String("a")', new String("a"));

  cumul += '\n######## Typeof.isArray() ########\n';
  cumul += "| input             | result      |\n";
  cumul += "|:------------------|:------------|\n";
  checkIsArray("[]", []);
  checkIsArray("new Array(2)", new Array(2));
  checkIsArray('"a"', "a");
  checkIsArray('new Float32Array(2)', new Float32Array(2));

  cumul += '\n######## Typeof.isString() ########\n';
  cumul += "| input             | result      |\n";
  cumul += "|:------------------|:------------|\n";
  checkIsString('"a"', "a");
  checkIsString('new String("a")', new String("a"));
  checkIsString('(_=>"a")()', (_=>"a")());


  const it = makeRangeIterator(1, 10, 2);

  cumul += '\n########\ Typeof.isIterable() ########\n';
  cumul += "| input             | result      |\n";
  cumul += "|:------------------|:------------|\n";
  checkIsIterable("[]", []);
  checkIsIterable("new Array(2)", new Array(2));
  checkIsIterable("new Float32Array(2)", new Float32Array(2));
  checkIsIterable('"a"', "a");
  checkIsIterable('new String("a")', new String("a"));
  checkIsIterable('customiterator', it);


  cumul += '\n######## Primitives (or wrappers to them) ########\n';
  cumul += "| input       | result      | comment     |\n";
  cumul += "|:------------|:------------|:------------|\n";
  check('',); // undefined
  check('undefined', undefined); // undefined
  check('null', null, "null¹ is a primitive"); // null
  check('false', false); // boolean
  check('5', 5); // number
  check('NaN', NaN, "IEEE 754 floats include NaN"); // number. 
  check('Infinity', Infinity); // number
  check('Number("123")', Number('123')); // number
  check('"one"', 'one'); // string
  //check('"9007199254740991n"', 9007199254740991n, "Firefox 68 / Chrome 67"); // bigint
  //check('BigInt("42")', BigInt("42"), "Firefox 68 / Chrome 67"); // bigint
  check('new Boolean(1)', new Boolean(1)); // boolean
  check('new String("one")', new String('one')); // string
  check('new Number("123")', new Number('123')); // number

  cumul += '\n¹ (typeof null) return "object" only for legacy reasons.\n';

  cumul += '\n######## Basic objects ########\n';
  cumul += "| input       | result      | comment     |\n";
  cumul += "|:------------|:------------|:------------|\n";
  check('{}', {}); // object
  check('new Object()', new Object()); // object

  cumul += '\n######## Arrays, Set, Map, etc ########\n';
  cumul += "| input       | result      | comment     |\n";
  cumul += "|:------------|:------------|:------------|\n";
  check('[]', []); // array
  check('new Array(1)', new Array(1)); // array
  check('new Float32Array(1)', new Float32Array(1)); // typedarray
  check('new ArrayBuffer(1)', new ArrayBuffer(1)); // arraybuffer
  check('new DataView(new ArrayBuffer(2))', new DataView(new ArrayBuffer(2))); // dataview
  check('new Set()', new Set()); // set
  check('new Map()', new Map()); // map
  check('new WeakSet()', new WeakSet()); // weakset
  check('new WeakMap()', new WeakMap()); // weakmap
  check("(new Set(['a'])).values())", (new Set(['a'])).values());
  check("(new Map([[1,'a']])).values()", (new Map([[1,'a']])).values());
  check('"a"[Symbol.iterator]()', "a"[Symbol.iterator]());

  cumul += '\n######## Functions ########\n';
  cumul += "| input       | result      | comment     |\n";
  cumul += "|:------------|:------------|:------------|\n";
  check('function(){}', function(){}); // function
  check('()=>{}', ()=>{}); // function
  check('new (function(){})', new (function(){})); // function
  check('class C {}', class C {}); // function
  check('new (class {constructor(){}})', new (class{constructor(){}})); // object

  check('new Function("")', new Function("")); // function
  check('function *(){}', function *(){}); // generatorfunction
  check('(function(){return arguments})()', (function(){return arguments})()); // arguments

  cumul += '\n######## Regexp ########\n';
  cumul += "| input       | result      | comment     |\n";
  cumul += "|:------------|:------------|:------------|\n";
  check('/a/g', /a/g); // regexp
  check('new RegExp("a","g")', new RegExp("a","g")); // regexp

  cumul += '\n######## Errors ########\n';
  cumul += "| input       | result      | comment     |\n";
  cumul += "|:------------|:------------|:------------|\n";
  check('new Error("error")', new Error("error")); // error
  check('new TypeError("type error")', new TypeError("type error")); // error

  cumul += '\n######## Misc ########\n';
  cumul += "| input       | result      | comment     |\n";
  cumul += "|:------------|:------------|:------------|\n";
  check('new Date()', new Date()); // date
  check('Promise.resolve()', Promise.resolve()); // promise


  cumul += '\n######## User Classes ########\n';
  function Vector2(x=0,y=0){this.x=x;this.y=y;}
  var PersonAnonym = function(name="",age=20){this.name=name;this.age=age;}
  cumul += '```javascript\n';
  cumul += "function Vector2(x=0,y=0){this.x=x;this.y=y;}\n"
  cumul += "var PersonAnonym = function(name='',age=20){this.name=name;this.age=age;}\n\n"
  cumul += "Typeof.removeType(Date);\n";
  cumul += "Typeof.addType(Vector2);\n";
  cumul += "Typeof.addType(PersonAnonym, 'To be,', 'or not to be');\n";
  cumul += '```\n';
  Typeof.addType(Vector2);
  Typeof.removeType(Date);
  Typeof.addType(PersonAnonym, 'To be,', 'or not to be');
  cumul += "| input       | result      | comment     |\n";
  cumul += "|:------------|:------------|:------------|\n";
  check('new Vector2()', new Vector2()); // vector
  check('new Date()', new Date(), 'because removed above'); // object
  check('new PersonAnonym()', new PersonAnonym()); // "To be,"


  console.log(cumul);
}