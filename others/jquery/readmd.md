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
