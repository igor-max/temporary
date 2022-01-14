## 第三章：对象
1. ```const str = ‘hello world’``` 这是一个字符串，当我们对它进行 str.length 等操作的时候js引擎会将它临时转换为对象进行操作
2. 对象中的属性名只能是字符串（不是字符串的会转为字符串）
3. 数组的下标只能是数字（不是数字的会转为数字）（转换不了的添加不进去数据，即数长度不会发生变化，但是数组也是对象，也可以通过访问对象属性的方式访问数组的属性）
```js
const arr = [1, 2, 3];
arr.a = 'a';
console.log(arr.length === 3, arr.a);  // true, 'a'
```
4. copy object
- shallow copy： Object.assign
- deep copy: 没有明确答案（1. 如果对象循环引用了 2. copy function 不同引擎的解释不同 ）**看下第三方库是怎么实现的**
	- JSON.parse(JSON.stritfy(obj))
5. 属性描述符
writable value configurable enumerable
6. 不变性： 设置writable: false and configurable: false 即可
Object.preventExtensions()   -> 不能拓展对象（即不能添加新属性）（可以修改）
Object.seal()。 ->.   在Object.preventExtensions基础上对对象的每个属性设置 configurable: false 
Object.freeze() ->  在Object.seal的基础上设置 writable: false 
以上三个方法都是 shallow，
7. [[GET]]
  - 访问对象的属性会看对象本身是否有同名属性
  - 没有，则在原型查找
  - 原型也没有，则返回undefined（那么如何判断undefined是对象的属性值为undefined还是未找到该属性而返回的undefined呢）
8. [[PUT]]
  - 属性是否有访问描述符 set， 是调用set
  - 否：看writable是否为true
  - 否，添加键值对
10. 存在性
判断对象属性为undefined是没有这个属性还是这个属性就是undefined
- key in obj.   包括原型 有这个属性，属性值为undefined也为true.      (‘1’ in [4, 4, 4] 数组就是下标)
- hasOwnProperty 不包括原型
- for in 不能遍历 enumerable为false的属性， 可以遍历原型的属性
- obj.propertyIsEnumerable   boolean 是否是可enum的
- Object.keys() 只能遍历非原型链且 enumerable 为 true 的属性
- Object.getOwnPropertyNames(obj)   只能遍历非原型的所有属性（返回值是一个数组）





  /*
      自身 不存在 foo属性 ，原型存在
      
      1. 原型 没有 设置 writable: false, 则会在该对象中添加屏蔽属性 foo
      2. 原型 有 设置 writable: false, 则添加无效，且严格模式下会报错
      3. 原型 有 且是一个 setter，就会调用该 setter，但不会将 foo 属性添加到 该对象上

      通过 Object.defineProperty 可以解决 2， 3 的问题

      第二点为什么会这样：可以看作模拟类的继承（复制），所以也是只读的，但是实际上不会发生复制，JS语言设计有很多奇怪的问题
    */

    /*
      类是将对象复制：js是将对象关联
      js把这种叫做继承（或原型继承），但继承应该是对象复制，而不是对象关联
      继承意味着复制操作，JS是在两个对象之间创建一个关联，通过委托访问另一个对象的属性和函数


      构造函数当且仅当调用的时候才是构造函数
    */

    function Foo() {}
    function Bar() {}

    // Bar.prototype = Foo.prototype  直接 new Foo 就行了
    // Bar.prototype = new Foo()  // foo实例不能有副作用，要不然会影响Bar实例
    // Bar.prototype = Object.create(Foo.prototype)  // 会创建一个新对象（推荐）
    Object.setPrototypeOf(Bar.prototype, Foo.prototype);  // es6 不会创建新对象，且 constructor 也指向正确 （更推荐）

    console.log(new Bar());

    /*
      A instanceof B   对象A的原型链中是否指向 函数 B 的prototype  
    
    */


    /*
      读JS面向对象的理解
        1. 对象与对象之间的引用关系  [[GET]]  [[SET]]
        2. new 引用  Object.create 引用   Object.setPrototype 引用
        3. 多态
    */
    