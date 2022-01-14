```js
<el-form>
  <el-form-item>
    <el-input></el-input>
  </el-form-item>
</el-form>
```

不希望篇幅太长, 有个整体的认知
一些基础的东西不会讲（如 provide，inject， $on, $emit）
方法细节不会讲
一些我认为不重要的不会讲（如 label）

## 组件设计

1. form 就做一些对整个 form 都有影响的配置（并提供对外的 API， validate， validateField...）

2. 错误显示 和 label 放在了 form-item 中 （ 这样做比较好，input 只处理 input 的事情，form-item 相当于一个处理其他事情的 中间层）

3. input 组件只做了 input 相关的内容，如 input 本身，前置内容，头部内容，后置内容，尾部内容这些东西是在 input 组件上扩展的，这些是属于 input 中的

那么他们之间的接口是怎么样暴露给用户使用的 ?? 以及怎么样维护自己内部的状态 ??

## api 设计

1. 大多数时候我们想对整个 form 进行操作，如校验，重置等，那么 form 就要提供一些可操作的API（resetFields clearValidate validate validateField）

```js
resetFields() {
  if (!this.model) {
    console.warn('[Element Warn][Form]model is required for resetFields to work.');
    return;
  }
  this.fields.forEach(field => {
    field.resetField();
  });
}
```

数据和方法操作放在那一层，el-form-item

阅读源码发现，这四个方法无非是先进行边界处理，然后```循环this.fields```，对```每个fied进行校验，重置，清除校验信息```等操作, 就是说实际上进行``校验，重置等```操作的还是 el-form-item

数据是属于el-form-item的。所以改变状态也应该由el-form-itme
实际开发中，大家也经常这么做，父组件通过props提供数据，子组件通过emit触发事件让夫组件修改数据
这里也类似，只不过是子组件```el-form-item```提供数据，父组件```el-form```调用子组件```el-form-item```的方法改变数据(刚好和我们开发情况反了过来)


```js
created() {
  this.$on('el.form.addField', (field) => {
    if (field) {
      this.fields.push(field);
    }
  });
}
```

通过 created hook 发现在 elForm 中注册了 ```el.form.addField```,  


属性是写在 form-item 上的，所以要 form 要获取到 field，供 resetFields clearValidate validate 操作

1. 在 form 的 created 中 $on 事件，在 form-item 中 $emit form 提供的事件，将 field 给 form

form-item
mounted： 触发 **dispatch（相当于 emit）**, 将 filed 传给 form, 将
 { o: elform-model;
k: prop;
v: prop-value;} 挂载到 this.initialValue 上

合并规则，注册 $on('el.form.blur') and $on('el.form.blur') 事件 （form-item 的子组件调用）

