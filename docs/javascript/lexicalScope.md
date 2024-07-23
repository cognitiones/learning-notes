# 词法作用域 和 动态作用域

## 词法作用域（Lexical Scope）

词法作用域是指 作用域是由**代码中的函数声明的位置来决定的**，而不是**由函数调用的位置决定**。

而 JavaScript 引擎是采用 词法作用域

示例：

```javascript
let x = 10;

function outer() {
  let y = 20;
  function inner() {
    console.log(x, y);
  }

  inner();
}

outer(); // 10 20
```

在这个例子中，inner 函数可以访问 outer 函数的变量 y 与 全局变量 x, 这就是词法作用域的体现

## 动态作用域（Dynamic Scope）

虽然 JavaScript 不使用动态作用域，但理解它可以帮助我们更好地理解 词法作用域。

动态作用域是指 作用域是由**函数调用的位置来决定的**，而不是由函数声明的位置决定。

比较：

```javascript
let x = 10;

function foo() {
  console.log(x);
}

function bar() {
  let x = 20;
  foo();
}

bar();
```

在词法作用域中 会输出 10

在动态作用域中 会输出 20，因为 foo 函数是在 bar 函数内部调用的，所以它可以访问 bar 函数内部的 x 变量。

## 闭包与词法作用域

闭包是 JavaScript 中强大的特性之一，他基于词法作用域的概念。

闭包允许函数记住并访问它的词法作用域，即时当该函数在其原始作用域之外执行时（比如，当它作为参数传递给另一个函数时），闭包也能访问其作用域。

示例：

```javascript
function createCounter() {
  let count = 0;
  return function () {
    return ++count;
  };
}

let counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

这里返回的函数形成了一个闭包，他**记住**了 createCounter 函数的词法环境，因此可以访问和修改 count 变量。

## 块级作用域

Es6 引入的 **let** 和 **const** 关键字 允许创建块级作用域，进一步加强了 JavaScript 的 词法作用域特性

```javascript
if (true) {
  let blockScoped = "I am block scoped";
  var functionScoped = "I am function scoped";
}
console.log(typeof blockScoped); // "undefined"
console.log(typeof functionScoped); // "string"
```

## this 关键字 和 动态绑定

this 关键字是 JavaScript 中一个非常重要的概念，它用于引用当前执行上下文的对象。

虽然 JavaScript 使用词法作用域，但 this 关键字是动态绑定的，这常常会导致混淆 会在后续的文章中详细介绍。

```javascript
let obj = {
  name: "Object",
  sayHello: function () {
    console.log("Hello, " + this.name);
  },
};

let greet = obj.sayHello;
greet();
```

这里 this 的值 取决于函数如何被调用，而不是函数在哪里被定义。

## 最佳实践

1. 用 let 和 const 来创建块级作用域,避免变量提升带来的问题。
2. 理解闭包,但避免过度使用,因为它们可能导致内存泄漏。
3. 使用 IIFE 来创建私有作用域,避免全局作用域污染。

## 相关面试题

1. 以下代码会输出什么？为什么？

```javascript
let x = 10;

function foo() {
  let x = 20;
  console.log(x);
  bar();
}

function bar() {
  console.log(x);
}

foo();
```

答: 输出将是 20 和 10。foo()中的 console.log(x)输出 20,因为它使用了局部变量 x。bar()中的 console.log(x)输出 10,因为 bar()在其词法环境中没有找到 x 的定义,所以使用了全局变量 x。

2. 闭包，这段代码会输出什么？解释闭包是如何工作的。

```javascript
function createMultiplier(factor) {
  return function (number) {
    return number * factor;
  };
}

let double = createMultiplier(2);
let triple = createMultiplier(3);

console.log(double(5));
console.log(triple(5));
```

答: 输出将是 10 和 15。这是闭包的一个例子。createMultiplier 返回的函数形成了一个闭包,它可以访问 createMultiplier 的 factor 参数。即使在 createMultiplier 执行完毕后,返回的函数仍然保持对 factor 的引用。

3. 块级作用域 这段代码会输出什么？如何修改使其输出 0, 1, 2？

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

答: 这段代码会输出 3, 3, 3。因为 var 声明的变量没有块级作用域,循环结束后 i 的值为 3。要修复这个问题,可以使用 let 代替 var:

```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

4. 词法作用域与 this, 这段代码会输出什么？如何修改使其输出"Hello, Object"？

```javascript
const obj = {
  name: "Object",
  greet: function () {
    setTimeout(function () {
      console.log("Hello, " + this.name);
    }, 0);
  },
};

obj.greet();
```

答: 这段代码会输出"Hello, undefined"。因为 setTimeout 中的函数是作为普通函数调用的,this 指向全局对象（在浏览器中是 window）。要修复这个问题,可以使用箭头函数或者 bind:

```javascript
const obj = {
  name: "Object",
  greet: function () {
    setTimeout(() => {
      console.log("Hello, " + this.name);
    }, 0);
  },
};

obj.greet();
```

5. 变量提升 这段代码会输出什么？为什么？

```javascript
console.log(x);
var x = 5;

function foo() {
  console.log(x);
  var x = 10;
}

foo();
```
答: 全局的console.log(x)会输出undefined,foo()中的console.log(x)也会输出undefined。这是因为var声明的变量会被提升到其作用域的顶部,但初始化不会被提升。

6. 立即执行函数表达式(IIFE)和私有变量 这段代码会输出什么？解释IIFE如何创建私有变量。

```javascript
const counter = (function() {
  let count = 0;
  return {
    increment: function() {
      count++;
    },
    getCount: function() {
      return count;
    }
  };
})();

counter.increment();
counter.increment();
console.log(counter.getCount());
```

答: 输出将是2。IIFE创建了一个闭包,使得count变量成为私有变量,只能通过返回的对象的方法来访问和修改。