
# JSON

**JSON 的值不能是 函数， 日期， undefined 之间的一种**

## JSON.parse

```js
JSON.stringify({
  a: undefined,
  b: new Date(),
  c: function() {}
});
// 转换后得到的结果是 '{"b":"2021-12-08T13:31:35.941Z"}' 虽然日期能够转换成功，但是通过 JSON.parse({ date }) 后得到的是Date字符串，而不是Date对象
```

1. 处理 date
```js
// 想要获取Date对象，使用 new Date(date)， 
{
  const dateObj = {
    val: new Date()
  };
  const result = JSON.parse(JSON.stringify(dateObj));
  result.val = new Date(result.val);
}

// 或者使用 JSON.parse 的第二个参数
{
  const res = JSON.parse(JSON.stringify({
    d: new Date(),
    a: 123
  }), function(key, value) {
    if(key === 'd') {
      return new Date(value);
    }
    // 这里记得要返回
    return value;
  });
  console.log(res, typeof res.d);
}
```

2. 处理函数
```js
// 要想parse函数，处理的函数必须是一个字符串函数
// 函数 this 会丢失
const o = '{ "fn": "function() { return 11 }" }';
const result = JSON.parse(o);
result.fn = eval("(" + result.fn + ")");
console.log(result);
```


## json.stringify

1. 对象，数组
2. 日期会被转换为字符串，如果想转换为Date对象，请看上面
3. 函数会被删除（包括key value），想stringify函数，只能先把函数变为字符串，再调用 stringify，如果想恢复为函数，请看上面