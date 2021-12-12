# cancel request


- 按钮请求统一使用 loading
- 类似 “已通过”、“未通过” 和 “全部” 3 种查询条件来请求的
    1. 返回的数据会有状态，我们可以根据状态过滤，不需要重新请求（缺点：数据是不能变化的，如分页这种形式，）
    2. loading ？？
    3. axios 的 config 添加 **时间戳**
- tab 快速切换导致的请求
  1. keep-alive 缓存数据



## axios cancelToken
axios的cancel请求还是发送出去了，服务器也正常返回了，只是被浏览器拦截住了，
那axios的cancel有什么用 ？？
1. 处理 取消 的异常 
```js
(error) => { 
  if (axios.isCancel(error)) { 
    console.log('手动取消请求');
  } else {
    console.log('请求错误');
  }
}
```
2. 中后台切换菜单导航取消上个页面已发出的请求