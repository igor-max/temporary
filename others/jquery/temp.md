```js
class Observe {
  constructor() {
    this.cbs = [];
  }

  add(watcher) {
    this.cbs.push(watcher);
  }

  fire(value) {
    this.cbs.forEach((watcher) => watcher(value));
  }
}

$.ajax("url", {
  success(res) {
    // 这没有解耦，干的事情还是在里面，只不过是把方法提出去了，如果要增加，移除方法还得修改里面的代码（回调函数的形式还是会有耦合性，没有分离）
    // 耦合度，维护性，扩展性?
    // 1. do something
    // 2. do something
    // 3. do something
  },
});

const pub = new Observe();
pub.add(function () {
  console.log(1);
});
pub.add(function () {
  console.log(2);
});
$.ajax("url", {
  success(res) {
    // 这才是真正的解耦，只要获取数据成功，对成功后的操作不需要改动里面的代码
    pub.fire(res);
  },
});

// 回调的形式，会造成回调地狱，还是会造成大量的耦合，
// 随让通过 Observe 可以解决这个问题，但引发了新的问题
// 1. 功能分开了，（获取数据和获取数据后的操作）
// 2. 写法也比较复杂，不够优美（当层次较深的时候，代码也比较混乱，所以 观察者模式 不适合解决这个问题（回调地狱））
pub.sub(() => {
  const pub2 = new Observe();
  pub.add((res) => console.log(res));
  $.ajax("url", {
    success(res) {
      pub2.fire(res);
    },
  });
});

// 所以需要一种模式（非回调），实现 功能聚合（观察者引发的问题） 和 操作简单(线性结构)（扁平化结构） 的问题
// promise
$.ajax("url").done().fail(); // 出现了
```

```js
//  1. [changeState, donCb, donCb, ...];
//       2. [changeState, failCb, failCb, ...];
//       3. [changeState, progressCb, progressCb, ...];

// $.Deferred    四大模块使用了 promise方法  DOM ready  Ajax模块  动画模块

// resolve | reject | notify  -》 执行 itemWith 方法 传入特定参数
// resolveWith | rejectWith | notifyWith -》 内部observer实例的 fireWith 方法

// 合并 promise 上的属性到 deferred

// promise prop
// state | always | then | promise | pipe(then)
// done | fail | progress  -> observer 的 add方法
```

```js
// CSS Tree + DOM Tree = Render Tree

// render tree的元素 与 dom tree的元素 相对应（非— —对应）
// 一个 dom元素可能会对应多个 render tree 中的元素
// 也有的dom元素会被 render tree 无视，如 display:none
```

### Callbacks

```js
class Observe {
  constructor(options) {
    this.options = options.split(" ");
    this.list = [];
    this.triggerd = false;
  }

  add(...args) {
    args.forEach((it) => {
      if (typeof it === "function") {
        // if(this.options.includes('unique')) {
        //   if(!this.list.includes(it)) {
        //     this.list.push(it);
        //   }
        // } else {
        //   this.list.push(it);
        // }
        if (!this.options.unique || !this.has(arg)) {
          // 这个判断很巧
          list.push(arg);
        }
      } else if (Array.isArray(it)) {
        this.add(...it);
      } else {
        console.warn("must be function");
      }
    });
  }

  fire(value) {
    if (this.options.includes("once")) {
      if (!this.triggerd) {
        this.list.forEach((it) => it(value));
      }
    } else {
      this.list.forEach((it) => it(value));
    }
    this.triggerd = true;
  }

  has(fn) {
    return !!this.list.includes(fn);
  }
}

const ob = new Observe("once unique");
const foo = (res) => console.log(1, res);
ob.add(foo, foo, foo, (res) => console.log(2, res));

ob.fire("a");
ob.fire("b");
```

### myDeffer

```js
class Observe {
  constructor() {
    this.items = [];
  }

  add(cb) {
    this.items.push(cb);
  }

  fire(value) {
    this.items.forEach((it) => it(value));
  }
}

(function () {
  window._ = {
    Deferred() {
      var temp = [
        ["resolve", "done", new Observe()],
        ["reject", "fail", new Observe()],
        ["notify", "progress", new Observe()],
      ];
      var promise = {
        promise(obj) {
          for (const key in promise) {
            if (Object.hasOwnProperty.call(promise, key)) {
              obj[key] = promise[key];
            }
          }
        },
      };
      var deferred = {};
      temp.forEach((item) => {
        deferred[item[1]] = function (cb) {
          item[2].add(cb);
          return this;
        };
        deferred[item[0]] = function (value) {
          setTimeout(() => item[2].fire(value), 0);
          return this;
        };
      });
      promise.promise(deferred);
      return deferred;
    },
  };
})();

const promise = _.Deferred();

promise.done((r) => console.log(1, r)).fail((err) => console.log("err1", err));
promise.done((r) => console.log(2, r)).fail((err) => console.log("err2", err));
promise.done((r) => console.log(3, r)).fail((err) => console.log("err3", err));

promise.resolve("a");
```
