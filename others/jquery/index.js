


// // 1.xx 版本使用这种
// (function(window) {
//   function jQuery() {}
//   window.jQuery = window.$ = jQuery;
// }(window));


// // 2.xx 版本将函数传入进去（目的是区分不同平台）
// (function(window, factory) {
//   if(typeof module === "object" && typeof module.exports === "object") {
//     module.exports = factory( global, true );
//   } else {
//     factory(window)
//   }
// }(this, function(window) {
//   function jQuery() {}
//   window.jQuery = window.$ = jQuery;
//   return jQuery;
// }))

/*
  好处：
    1. 使用立即执行函数，减少全局污染，
    2. 传入 window（减少作用域的查找） 和 undefined（浏览器bug）
    3. 2.xx 版本对其他平台的支持（支持AMD规范）
*/


// jQuery必须是一个工厂类，因为每次执行 $() 都会得倒不同的对象
// 但 jQuery 又不是通过 new 执行的，（通过new执行太麻烦了）
// jQuery() 执行后得倒的对象原型中有方法, 
// 1. jQuery本身是一个构造函数(x) 是直接jQuery()调用的
// function jQuery() {
  // return new jQuery();  // 自己调用自己会死循环
// }
// 2. jQuery 执行后返回一个构造函数的实例()


// jQuery.prototype = {
//   init: function () {
//     return this;
//   },
//   testFun: function() {
    
//   },
//   a: 1,
//   b: 2
// };
// jQuery.prototype.init.prototype = jQuery.prototype;
// function jQuery(selector) {
//   return  new jQuery.prototype.init();
// }

// const res = jQuery();
// console.log(res);


// // 链式调用（每个方法return this）
// // 好处，优雅，提升效率， 
// // 坏处：1. 所有的操作都返回this不适合所有的环境 2. 如何处理异步情况


// // 为jQuery提供扩展方法（提供接口 extend）（当然用户也可以通过 jQuery.xxx || jQuery.prototype.xxx 进行扩展）
// jQuery.extend = jQuery.fn.extend = function () {
//   var target = arguments[0] || {};
//   const length = arguments.length;

//   if(length === 1) {
//     target = this;   // 注意这个this，jQuery.extend() this 指向 jQuery，  jQuery.fn.extend() this 指向 jQuery.fn
//   }

//   for(let prop in arguments[0]) {
//     this[prop] = argument[0][prop];  
//   }
// }


// // 获取真实dom  $('.wrap').get(num) || $('.wrap')[num]
// function jQuery(selector) {
//   const doms = document.querySelectorAll(selector);
//   this.length = doms.length;
//   doms.forEach((dom, index) => {
//     this[index] = dom;
//   });
//   this.selector = selector;
//   this.context = document;
//   this.prevObject  = xxx;
//   this.get = function(num) { // 写在原型上
//     return this[num];
//   }
// }


// $.noConflict