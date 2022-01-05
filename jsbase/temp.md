```js
const obj = {
  a: 1,
  b: fetch('http://localhost:1234').then(res => res.json()).then(res => res.data),
  c: 3,
  d: fetch('http://localhost:1234/user').then(res => res.json()).then(res => res.data),
};

function test(target) {
  const temp = {},
    promises = [];
  Object.keys(target).forEach(key => {
    if(typeof target[key].then === 'function') {
      // 这里是包了一层
      promises.push(target[key].then(res => {
        temp[key] = res;
      }))
    } else {
      temp[key] = target[key];
    }
  });
  return Promise.all(promises).then(res => temp)
}

test(obj).then(res => console.log(res, res.b));
```

# 捕获错误
1. try catch 捕获同步错误(将某些异步错误转换为同步错误捕获)
2. 实在不能转换为同步的异步错误使用 catch 捕获