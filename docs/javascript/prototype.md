# 原型 与 原型链

## 1、什么是原型 与 原型链？

在 JavaScript 中 原型是一个对象 他作为其他对象的一个模板。 每个对象都有一个内部的链接指向他的原型对象。这个原型对象可能也有他自己的原型，这样会形成一个链条 就称之为 原型链。
原型用户实现属性和方法的继承

## 2、原型链的作用

原型链是 JavaScript 实现继承的机制。当我们尝试着去访问一个对象的属性或者方法时，JavaScript 引擎会沿着原型链的机制 向上查找，首先去检查当前对象本身，然后是对象的原型(prototype)，然后是原型的原型(x.prototype.prototype)，以此类推，直到找到匹配的属性/方法或到达原型链的末端(通常是 Object.prototype)。

## 3、代码举例

### prototype

```javascript
function Animal() {}
Animal.prototype.name = "Animal";
var cat = new Animal();
var dog = new Animal();

console.log(cat.name); // Animal
console.log(dog.name); // Animal
```

这里给 Animal 的 prototype 添加了一个 name 属性，然后创建了两个实例对象 cat 和 dog。打印 cat 和 dog 的 name 属性，结果都是 Animal。

Animal.prototype 指向的对象就是 Animal 的原型对象。

在我们用 new Animal() 创建对象时，JavaScript 引擎会自动为对象添加一个内部属性 [[prototype]]，指向它的原型对象。

### **proto**

```javascript
function Animal() {}
Animal.prototype.name = "Animal";
var cat = new Animal();
var dog = new Animal();

console.log(cat.__proto__); // Animal.prototype
console.log(dog.__proto__); // Animal.prototype
console.log(cat.__proto__ === dog.__proto__); // true
console.log(cat.__proto__ === Animal.prototype); // true
```

**proto** 是每个对象都有的属性，它指向了对象的原型对象。

当我们使用 对象实例 的时候 如果没有找到属性 它会沿着原型链向上查找(如 cat.**proto**)。他等同于 Animal.prototype

注：proto 现在来说是过时的 因为它不是 ECMAScript 标准的一部分，推荐用 Object.getPrototypeOf(obj) 来代替后续会讲到

### constructor

```javascript
function Animal() {}
Animal.prototype.name = "Animal";
var cat = new Animal();
console.log(Animal.prototype.constructor === Animal); // true
console.log(cat.constructor); // Animal
```

**constructor** 是每个原型对象都有的属性，它指向了这个原型对象的构造函数。

注：这里 cat 对象并没有 constructor 属性，是通过原型链 cat.**proto** 找到 Animal.prototype 然后找到 constructor 属性。

### 原型链的终点

```javascript
function Animal() {}
function Animal() {}
Animal.prototype.name = "Animal";
var cat = new Animal();
console.log(cat.__proto__.__proto__); // [Object: null prototype] {}
console.log(cat.__proto__.prototype); // undefined
```

此时 cat.**proto**.**proto** 指向的是 null ，因为它是原型链的终点。

cat.**proto**.prototype 指向的是 undefined ，因为它是一个普通对象，没有原型链。



![image-20240722150159605](http://cdn.chen-zeqi.cn/image-20240722150159605.png)



## 4、原型常用方法

### Object.create(proto, [propertiesObject])

创建一个新对象，使用现有的对象来作为新创建对象的原型。

```javascript
let animal = { eats: true };
let rabbit = Object.create(animal);
console.log(rabbit.eats); // true
console.log(rabbit.__proto__); // {eats: true}
```

### Object.freeze(Object.prototype)

冻结一个对象，防止对象被修改（包括其属性）。

当应用于 Object.prototype 时，可以防止全局原型污染。

```javascript
Object.freeze(Object.prototype);

// 尝试添加新方法会失败（在严格模式下会抛出错误）
Object.prototype.newMethod = function () {}; // 这将不会生效

// 尝试修改现有方法也会失败
Object.prototype.hasOwnProperty = function () {}; // 这也不会生效
```

Object.freeze(Object.prototype) 的使用是一种防御性编程的技巧，主要用于：

1. 防止原型污染攻击：阻止恶意代码向 Object.prototype 添加或修改方法。
2. 确保核心功能的完整性：防止无意中修改了基本对象的原型方法。
3. 在某些安全敏感的环境中增加额外的保护层。

需要注意的是，虽然 Object.freeze() 可以有效地防止直接修改，但它是浅冻结。这意味着如果原型上有嵌套的对象属性，那些嵌套对象的内容仍然可以被修改。

另外，使用 Object.freeze(Object.prototype) 可能会影响依赖于修改 Object.prototype 的某些库或旧代码，所以在应用到生产环境之前需要仔细测试。

### Object.getPrototypeOf(obj)

返回指定对象的原型 等同于 **proto**。

```javascript
console.log(Object.getPrototypeOf(rabbit)); // {eats: true}
```

### Object.setPrototypeOf(obj, proto)

设置一个指定的对象的原型到另一个对象或 null

```javascript
Object.setPrototypeOf(rabbit, {});
console.log(rabbit.__proto__); // {}

const obj = { a: 1 };
Object.setPrototypeOf(obj, { b: 2 });
console.log(obj.a); // 1
console.log(obj.b); // 2
```

### Object.prototype.isPrototypeOf(obj)

检查一个对象是否存在于另一个对象的原型链上

```javascript
console.log(animal.isPrototypeOf(rabbit)); // true
```

### instanceof

测试构造函数的 prototype 属性是否出现在对象的原型链上

```javascript
console.log(rabbit instanceof Animal); // true
```

### Object.prototype.hasOwnProperty(prop)

返回一个布尔值 表示对象自身是否具有指定的属性

```javascript
console.log(rabbit.hasOwnProperty("eats")); // true
console.log(rabbit.hasOwnProperty("name")); // false
```

### Object.getOwnPropertyNames(obj)

返回一个数组,包含对象自身的所有属性（包括不可枚举属性，但不包括 Symbol 值作为名称的属性）。

```javascript
console.log(Object.getOwnPropertyNames(rabbit)); // ["eats"]
```

### Object.getOwnPropertyDescriptor(obj, prop)

返回指定对象上一个自有属性对应的属性描述符。

```javascript
console.log(Object.getOwnPropertyDescriptor(rabbit, "eats")); // {value: true, writable: true, enumerable: true, configurable: true}
```

### Object.defineProperty(obj, prop, descriptor)

在一个对象定义一个新的属性，或修改一个对象的现有属性， 并返回此对象。

```javascript
Object.defineProperty(rabbit, "name", {
  value: "Rabbit",
  writable: false,
  enumerable: false,
  configurable: false,
});

console.log(rabbit.name); // Rabbit
console.log(Object.getOwnPropertyDescriptor(rabbit, "name")); // {value: "Rabbit", writable: false, enumerable: false, configurable: false}
```

### Function.prototype.call() 和 Function.prototype.apply()

```javascript
function add(a, b) {
  return a + b;
}

let result = add.call(null, 1, 2);
console.log(result); // 3

let arr = [1, 2];
let result = add.apply(null, arr);
console.log(result); // 3
```

## 常见面试题

### 解释 JavaScript 中的原型是什么?

1. 原型是一个对象，它作为其他对象的一个模板。
2. 每个对象都有一个内部的链接指向他的原型对象。这个原型对象可能也有他自己的原型，这样会形成一个链条 就称之为 原型链。
3. 原型用户实现属性和方法的继承。

### 请描述原型链的工作原理。

1. 当我们尝试着去访问一个对象的属性或者方法时，JavaScript 引擎会沿着原型链的机制 向上查找，首先去检查当前对象本身，然后是对象的原型(prototype)，然后是原型的原型(x.prototype.prototype)，以此类推，直到找到匹配的属性/方法或到达原型链的末端(通常是 Object.prototype)。

### 如何在 JavaScript 中实现继承?

1. 使用原型链实现继承。

```javascript
function Animal() {}
Animal.prototype.name = "Animal";
function Cat() {}
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
var cat = new Cat();
console.log(cat.name); // Animal
```

2. 使用构造函数继承。

```javascript
function Animal() {}
Animal.prototype.name = "Animal";
function Cat() {
  Animal.call(this);
}
var cat = new Cat();
console.log(cat.name); // Animal
```

3. 使用 Object.create()方法实现继承。

```javascript
function Animal() {}
Animal.prototype.name = "Animal";
function Cat() {}
Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;
var cat = new Cat();
console.log(cat.name); // Animal
```

4. 使用 class 关键字实现继承。

```javascript
class Animal {
  constructor() {
    this.name = "Animal";
  }
}

class Cat extends Animal {
  constructor() {
    super();
  }
}

const cat = new Cat();
console.log(cat.name); // Animal
```

### 解释 **proto** 和 prototype 的区别。

1. **proto**是每个对象都有的内部属性,指向该对象的原型。
2. prototype 是函数对象的一个属性,当这个函数被用作构造函数时,它会成为新创建对象的原型。

### 以下代码会输出什么?为什么?

```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.sayHello = function () {
  console.log("Hello, I'm " + this.name);
};

const person1 = new Person("Alice");
person1.sayHello();

Person.prototype = {
  sayHi: function () {
    console.log("Hi, I'm " + this.name);
  },
};

const person2 = new Person("Bob");
person2.sayHello();
person2.sayHi();
person1.sayHi();
```

```javascript
person1.sayHello(); // 输出: "Hello, I'm Alice"
person2.sayHello(); // 抛出错误: person2.sayHello is not a function
person2.sayHi(); // 输出: "Hi, I'm Bob"
person1.sayHi(); // 抛出错误: person1.sayHi is not a function

解释:
person1创建时,它的原型链上有sayHello方法。
之后Person.prototype被重新赋值,但这不影响已创建的对象。
person2创建时使用了新的原型,所以有sayHi但没有sayHello。
person1仍然使用旧的原型,所以有sayHello但没有sayHi。
```

### 如何实现一个 myInstanceOf 函数来模拟 instanceof 运算符的功能?

```javascript
function myInstanceOf(obj, constructor) {
  if (obj === null || typeof obj !== "object") return false;

  let proto = Object.getPrototypeOf(obj);
  while (proto) {
    if (proto === constructor.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}

// 测试
function Animal() {}
function Cat() {}
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
let cat = new Cat();
console.log(myInstanceOf(cat, Cat)); // true
console.log(myInstanceOf(cat, Animal)); // true
```

这个函数通过遍历对象的原型链,检查是否能找到与给定构造函数的 prototype 匹配的原型。

### 解释 Object.create() 方法的作用,并给出一个使用示例。

Object.create() 方法创建一个新对象,使用现有的对象来提供新创建的对象的**proto**。

```javascript
const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  },
};

const me = Object.create(person);
me.name = "Matthew";
me.isHuman = true;
me.printIntroduction(); // "My name is Matthew. Am I human? true"
```

### 什么是原型污染?如何防止原型污染?

原型污染是指攻击者通过恶意修改 JavaScript 对象的原型来影响应用程序行为的一种安全漏洞。

防止方法:

1. 使用 Object.create(null) 创建没有原型的对象
2. 冻结原型: Object.freeze(Object.prototype)
3. 使用 Map 代替普通对象存储用户输入的键值对
4. 在处理用户输入时,避免使用如 Object.assign() 等可能修改原型的方法

### 如何检查一个属性是对象自身的属性还是继承自原型链?

```javascript
obj.hasOwnProperty("propertyName");
// 或
Object.hasOwn(obj, "propertyName");
```

### 解释 hasOwnProperty 方法的作用,并说明它与 in 运算符的区别。

hasOwnProperty 只检查对象自身的属性,不检查原型链。

in 运算符检查对象的自身属性和原型链上的属性。

```javascript
let obj = { a: 1 };
console.log(obj.hasOwnProperty("a")); // true
console.log(obj.hasOwnProperty("toString")); // false
console.log("a" in obj); // true
console.log("toString" in obj); // true
```

### 实现一个深拷贝函数,考虑对象的原型。

```javascript
function deepClone(obj){
    if(obj === null || type obj !== 'object'){
        return obj
    }

    let clone = Object.create(Object.getPrototypeOf(obj))

    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            clone[key] = deepClone(obj[key])
        }
    }

    return clone
}
```

### 如何实现一个 Object.create 的 polyfill?

```javascript
if(typeof Object.create !== 'function'){
    Object.create = function(proto){
        if(typeof proto !== 'object' && typeof proto!== 'function'){
            throw new TypeError('Object prototype may only be an Object:'+ proto);
        }
        function F() {}
        F.prototype = proto;
    
        return new F();
    }
}
```

### 在 ES6 的 class 语法中,如何实现私有方法和属性?

```javascript
class Example {
  #privateField = 42;
  #privateMethod() {
    return 'private';
  }
}

const example = new Example();
console.log(example.#privateField); // 报错
console.log(example.#privateMethod()); // 报错
```

### 设计一个基于原型的继承系统,实现多重继承。

```javascript
function mixin(target, ...sources){
    Object.assign(target, ...sources)
}

function Mammal() {}
Mammal.prototype.breathe = function() { console.log('breathing'); };

function WingedAnimal() {}
WingedAnimal.prototype.fly = function() { console.log('flying'); };

function Bat() {}
mixin(Bat, Mammal.prototype, WingedAnimal.prototype);

let bat = new Bat();
bat.breathe(); // "breathing"
bat.fly(); // "flying"
```

### 以下代码会输出什么?为什么?
```javascript
var o = {
    fn: function(){
        console.log(this);
    }
}

o.fn()
var f = o.fn
f()

var newF = f.bind(o);
newF()
```

```javascript
// o
// window / global
// o
```

1. o.fn()
输出：对象 o

原因：当方法作为对象的属性被调用时，this 指向该对象。

2. var f = o.fn f()
输出：全局对象（在浏览器中是 window，在 Node.js 中是 global）

原因：f 是对函数的引用，但它是在全局作用域下被调用的。在非严格模式下，这种情况下 this 指向全局对象。

3. var newF = f.bind(o); newF()
输出：对象 o

原因：bind() 方法创建了一个新函数，并将 this 永久地绑定到了指定的对象（这里是 o）。

总结：

函数的 this 值取决于函数如何被调用，而不是函数如何被定义。

作为对象方法调用时，this 指向该对象。

作为独立函数调用时，在非严格模式下，this 指向全局对象。

bind() 方法可以创建一个新函数，其 this 值被永久绑定到指定对象，无论这个函数如何被调用。