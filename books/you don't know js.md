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