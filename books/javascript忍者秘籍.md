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

3.3
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

4. arrow function（1.简化函数写法，2. 弥补原生函数缺陷） param => param
5. 形参(paramter)，实参(argument)，剩余参数, 默认参数

## 第四章

函数中两个隐含的参数：arguments 和 this

调用函数的不同方式（对 this 的影响）

处理函数上下文的问题


1. argument

2. this (代表函数调用相关联的对象, 通常称之为函数上下文。)

this指向由 **定义函数的位置，方式，** 和 **调用函数的方式** 决定

函数调用方式
1. 直接调用   foo()
2. 方法调用  obj.foo()   ->   关联在一个对象上，实现面向对象编程
3. new
4. call， apply