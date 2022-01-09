## 回调函数

**$.Callbacks** -> 观察者模式 add fire(trigger) remove
内部应用：

1. 异步队列模块 Deferred
2. 队列模块 _queueHooks
3. ajax
   外部应用
   自己使用

一些配置 once memory unique stopOnFalse

1. once

- 不执行的条件：执行过 && 有 once 这个配置

2. menory: 第一次调用该 fire()后，再次 add 会将 add 的回调函数执行一变，参数为上次 fire 的参数

- 条件，保持上次 fire 的参数 && 立即执行该函数

3. unique：忽略 add 中重复的回调函数

- 判断 includes 就行

4. stopOnFalse： 回调返回 false，则不继续运行后面的回调

jQuery 常见使用是 once memory


# 数据缓存

对象之间的循环引用和对象引用自己并不会导致内存泄露

如果对象和 Dom 对象 || ActiveX 对象循环引用了，就会导致内存泄漏

1. Dom 对象有引用，但是 DOM 被 remove 了，内存中这个 DOM 对象是不会消失的（刷新浏览器即可释放）
2. 对象和 DOM 循环引用，DOM 被 remove 了，这时候是**真正的内存泄漏**，就算刷新浏览器也不会释放内存

补充下，在 jQuery 中，经常要处理数据（早期是事件情况下，后来也有动画），而要处理的数据往往是与 dom 紧密相连的，所以需要一个处理方式能够解决循环引用的问题

```js
const wrap1 = $('.wrap'),
  wrap2 = $('.wrap');

wrap1.data('b', 1);
wrap2.data('b', 2);
console.log(wrap1.data('b')); // 2
console.log(wrap1.data('b')); // 2

$.data(wrap1, 'a', 1);
$.data(wrap2, 'a', 2);
console.log($.data(wrap1, 'a')); // 1
console.log($.data(wrap2, 'a')); // 2
// 这里没有覆盖的原因是 jQuery.prototype.data 是直接作用在 wrap1 和 wrap2 上的
// 而 wrap1 !== wrap2 （所以不会覆盖）
// jQuery.data 是作用在 wrap1[0] 和 wrap2[0] 也就是真实dom上的，而 wrap[0] === wrap2[0]
```

简单实现

```js
(function () {
  Data.prototype = {
    constructor: Data,
    getKey(target) {
      var descriptor = {};
      var unlock = target[this.expando];
      if (!unlock) {
        unlock = Data.uid++;
        descriptor[this.expando] = { value: unlock };
        Object.defineProperties(target, descriptor); // 这里就给每个对象设置了 jqueryxxxx: uid
      }
      if (!this.cache[unlock]) {
        this.cache[unlock] = {};
      }
      return unlock;
    },
    get(key) {
      const unlock = this.getKey(key);
      return this.cache[unlock];
    },
    set(target, key, value) {
      var unlock = this.getKey(target);
      this.cache[unlock] = value;
    },
    assess(target, key, value) {
      if (value === undefined) {
        return this.get(target, key);
      } else {
        this.set(target, key, value);
      }
    },
  };
  function Data() {
    Object.defineProperty((this.cache = {}), '0', {
      get() {
        return {};
      },
    });
    this.expando = 'jQuery' + Math.random();
  }

  Data.uid = 1;

  const user_data = new Data();

  window._ = {
    data: function (target, key, value) {
      return user_data.assess(target, key, value);
    },
  };
})();

let obj = {};
_.data(obj, 'lala', {
  a: 1,
  b: 2,
});
console.log('=====');
console.log(obj, _.data(obj, 'lala'));
```

