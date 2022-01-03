# javascript忍者秘籍


# 理解函数

## 第三章
1. 除了全局 JavaScript 代码是在页面构建的阶段执行的，其他所有操作都是在函数内完成的
2. 函数具有对象的所有特征（特殊点：**可调用的** 即调用才会执行某操作）
3. 相比命令式（测试、扩展及模块化） 《JavaScript 函数式编程》，

-----

1. 回调函数（某个特定时间点执行）
  - 避免污染全局变量
  - 事件（特定时间点执行）
  - sort排序 （决定那个值在前，哪个值在后）

3.2. 函数作为对象的乐趣
1. 存储函数（可以在函数属性中存储另一个函数用于之后的引用和调用）   
场景： 某个操作后要调用回调函数集合（回调函数集合不能存在重复的函数）
2. 记忆函数，提升性能(优点：提升性能，缺点：占用内存, 缓存逻辑和业务逻辑应该分离（可以做到）)
```js
function memoization(param) {
  if(!memoization.cache) memoization.cache = {};
  if(!memoization.cache[param]) {
    const result = param..join('').split('2'); 
    memoization.cache[param] = result;  // cache computed result
  }
  return memoization.cache[param];
}
```

3.3. 函数定义
1. 函数声明
function funcName() {}

2. 函数表达式
const a = 123;   // 赋值表达式
const b = function() {}  // 这是函数表达式
function wrap() {
  return function() {}   // 函数表达式作为返回值
}
wrap(function() {});  // 函数表达式作为参数

3. 立即执行函数
(function() {})();  否则加（），为什么要加（），纯语法层面的，不加（），js解析器会认为这是一个函数声明
+function() {}();  函数有达式可以作为一元操作符的参数立即调用（给解析器使用）

4. arrow function（1.简化函数写法，2. 弥补原生函数缺陷（this）） param => param
5. 形参(paramter)，实参(argument)，剩余参数, 默认参数

## 第四章（理解函数调用this）

函数中两个隐含的参数：arguments 和 this

调用函数的不同方式（对 this 的影响）

处理函数上下文的问题

1. argument

2. this (

this指向由 **定义函数的位置，方式** 和 **调用函数的方式** 决定

函数调用方式
1. 直接调用   foo()
  - strict: this指向 undefined， 否则指向window
2. 方法调用  obj.foo()   ->   关联在一个对象上，实现面向对象编程
  - 该对象会成为函数的上下文,。这也是 JavaScript 实现面向对象编程的主要方式之一(构造函数是另外一种方式)
  
3. new
  - 1. 创建一个新的空对象。
  - 2. 该对象作为this参数传递给构造函数，从而成为构造函数的函数上下文。
  - 3. 新构造的对象作为new运算符的返回值
如果显示的返回一个对象，则 new 后得到的就是这个显示返回的对象，若返回一个基本值，则返回的还是构造函数的实例对象
4. call， apply
5. arrow function
6. bind



## 第五章（作用域和闭包）
1. 使用闭包简化代码
2. 使用执行上下文跟踪 JavaScript 程序的执行
3. 使用词法环境（Lexical Environment）跟踪变量的作用域
4. 理解变量的类型
5. 探讨闭包的工作原理

功能：
1. 减少代码数量和复杂度来添加高级特性
2. 能实现不太可能完成的功能


5.2 使用闭包
1. 封装私有变量（外界只能通过方法修改访问）
2. 回调函数

5.3 执行上下文(跟踪代码)
函数上下文指**this**，函数执行上下文指**Js引擎使用执行上下文来跟踪函数的执行**
使用debugger浏览器的控制台

5.4 词法环境

5.5. var let const
1. const 定义的值不可重新赋值，但是对象可以添加新的属性值
2. let, const 定义的有块级作用域(是在当前词法作用域)，var不会
3. 变量提升: JavaScript 引擎会访问并注册在当前词法环境中所声明的变量和函数(先提升函数声明，再提升变量声明，提升的变量值为undefined， let, const 定义的值不会提升)

5.6 闭包工作原理
闭包可以访问创建函数时所在作用域内的全部变量
下面这个也是闭包
```js
function Test() {
  const count = 0;
  this.getCount = function() {
    return count;
  }
  this.setCount = function() {
    count++;
  };
  this.getName = function() {
    return name;
  }
  const name = 'Jack';
}

const obj = { count: 333 };
const t = Test();
console.log(t.getCount(), t.getName());
```


**tip**
**词法环境 === 作用域**