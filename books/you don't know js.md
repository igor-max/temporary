
## 作用域
1. 变量提升
  - js引擎会在解释执行js前对代码进行编译（找到所有的声明（变量声明和函数声明），将声明的变量与作用域关联起来）
  - **函数声明优先于变量声明**
2. 闭包
  - 函数记住并访问所在词法作用域，并在所在词法作用域之外执行
```js
foo();   // output 2, 而不是报错TypeError
var foo = 1;   // function foo 先被提升，var foo会被忽略，因为在词法解析的时候重复的声明会被忽略
function foo() {
    console.log(2);
}
```

## 第三章：对象

1. `const str = ‘hello world’` 这是一个字符串，当我们对它进行 str.length 等操作的时候 js 引擎会将它临时转换为对象进行操作
2. 对象中的属性名只能是字符串（不是字符串的会转为字符串）
3. 数组的下标只能是数字（不是数字的会转为数字）（转换不了的添加不进去数据，即数长度不会发生变化，但是数组也是对象，也可以通过访问对象属性的方式访问数组的属性）

```js
const arr = [1, 2, 3];
arr.a = 'a';
console.log(arr.length === 3, arr.a); // true, 'a'
```

4. copy object

- shallow copy： Object.assign
- deep copy: 没有明确答案（1. 如果对象循环引用了 2. copy function 不同引擎的解释不同 ）**看下第三方库是怎么实现的**
  - JSON.parse(JSON.stritfy(obj))

5. 属性描述符
   writable value configurable enumerable
6. 不变性： 设置 writable: false and configurable: false 即可
   Object.preventExtensions() -> 不能拓展对象（即不能添加新属性）（可以修改）
   Object.seal()。 ->. 在 Object.preventExtensions 基础上对对象的每个属性设置 configurable: false
   Object.freeze() -> 在 Object.seal 的基础上设置 writable: false
   以上三个方法都是 shallow，
7. [[GET]]

- 访问对象的属性会看对象本身是否有同名属性
- 没有，则在原型查找
- 原型也没有，则返回 undefined（那么如何判断 undefined 是对象的属性值为 undefined 还是未找到该属性而返回的 undefined 呢）

8. [[PUT]]

- 属性是否有访问描述符 set， 是调用 set
- 否：看 writable 是否为 true
- 否，添加键值对

10. 存在性
    判断对象属性为 undefined 是没有这个属性还是这个属性就是 undefined

- key in obj. 包括原型 有这个属性，属性值为 undefined 也为 true. (‘1’ in [4, 4, 4] 数组就是下标)
- hasOwnProperty 不包括原型
- for in 不能遍历 enumerable 为 false 的属性， 可以遍历原型的属性
- obj.propertyIsEnumerable boolean 是否是可 enum 的
- Object.keys() 只能遍历非原型链且 enumerable 为 true 的属性
- Object.getOwnPropertyNames(obj) 只能遍历非原型的所有属性（返回值是一个数组）

## 第五章：原型

`for in` and `in` 都会在原型链上寻找，但是 for in 不会获取 enumerable: false 的属性，而 in 不管你是否可枚举都会获取

以下笔记不需要重新理解，只需要判断其是否正确

### 对象属性的设置和屏蔽（设置 foo 属性）

1. 对象和原型链都没有 foo 属性，则会给对象添加屏蔽属性 foo
2. 对象有 foo 属性，那这个属性就是屏蔽属性，不会再往原型链上寻找
3. 对象没 foo 属性，原型链上有该属性，

- 如果原型链上的是个普通属性（没有设置 writable:false）则会在对象中添加一个屏蔽属性
- 原型链上这个属性设置了 writable: false，则无法在对象上创建屏蔽属性，且无法修改原型属性（赋值语句会被忽略）在严格模式下会报错
- 原型链这个属性是个 setter（会运行该 setter），该对象不会添加该屏蔽属性（可用 hasOwnProperty 判断）但是会影响原型的值

由于存在这些问题，所以我们设置对象属性的时候，不要修改到了原型的属性

### 类：继承，多态，封装

js 的原型是 对象关联（即多个实例的原型方法地址相同）
真正的类是 对象复制（开辟一块空间，将父类方法 copy 到实例，且父类再修改方法而子元素不受影响）

为什么会将 js 的委托当成类（反驳 js 有类的其他观点）

1. 向大多数语言一样使用 new 调用（js 说是因为是 new 调用，而被当成构造函数，而不是因为是构造函数而使用 new 操作，也就是说这个函数是不是是普通函数还是构造函数取决于调用放松）
2. 函数名大些（对引擎来说没有任何意义，仅仅是对开发者而言有更明确的意义）
3. 把 constructor 错误的理解为 由...构造 (函数在定义时就会有个 prototype 属性，该属性是个对象，对象中有 construction 属性，值为该对象)

- 实际上实例的 constructor 属性用的是原型链的 constructor

```js
Test.prototype = {};
function Test() {}

const test = new Test();

console.log(test.constructor === Test); // false
console.log(test.constructor === Object); // true

// 如果你认为 constructor 表示由谁构造的话， test的constructor应该是Test，而不是Object
// 这都是JS设计的时候为了能够像类而发生的糟糕操作
// 一般我们需要使用 Object.defineProperty 重新设置constructor

Object.defineProperty(Test.prototype, 'constructor', {
  value: Test,
  writable: true,
  enumerable: false,
  configurable: true,
});

console.log(test.constructor === Test); // true
console.log(test.constructor === Object); // false

// 修复 constructor 需要这些操作的原因都是为了解决把 constructor 错误的理解为 由...构造
// 正确的理解是 constructor 并不是表示 对象被（它）构造
// constructor 不可靠，所以最好不要用它
```

### 原型继承

```js
Father.prototype.sayFather = function () {};
function Father(name) {
  this.name = name;
}

function Son(name, age) {
  Father.call(this, name);
  this.age = age;
}

Son.prototype.saySon = function () {}
Object.setPrototypeOf(Son.prototype, Father.prototype);

// 下面的这种写法书写位置要正确（要设置constructor）
// Son.prototype = Object.create(Father.prototype);
// Son.prototype.saySon = function () {};
// Object.defineProperty(Son.prototype, 'constructor', {
//   value: Son,
//   enumerable: false,
// });

const son = new Son('Jack', 11);
console.log(son);
```

类关系

1. 如何检查对象和委托对象的关系

- obj instanceof func obj 的原型链上是否有 func.prototype

2. 检查对象和对象之间的关联

- 不要使用 instanceof，因为如果我们使用 Object.create() 创建对象，是没有 prototype 这个属性的

```js
// 使用 isPrototypeOf  一个对象是否在另一个对象的原型上
const aa = { a: 1 };
const bb = Object.create(aa);
console.log('lalala', aa.isPrototypeOf(bb), bb.isPrototypeOf(aa)); // true, false
```

```js
// 对象关联：除了构造函数， 还有 Object.create（相比构造函数，少了prototype和constructor一些麻烦）

function create(proto) {
  function Foo() {}
  Foo.prototype = proto;
  return new Foo();
}

const res = create({ a: 1 });
console.log(res);

// 看起来 [[prototype]] 是处理对象关联关系的一种备用选项，但这不是 [[prototype]] 的本质

// 这种委托的模式会让API设计很神奇，可以考虑使用proxy
```
