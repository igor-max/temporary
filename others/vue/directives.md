```js
directives = {
  copy: {
    // 事件只需绑定一次即可（不要做update中继续绑定，在update更新值就行），unbind的时候记得解除事件，
    // https://juejin.cn/post/6844903942321602568
    // Clipboard MDN 了解一下
    bind(el, { value }, vnode) {
      const vm = vnode.context;
      el.$value = value;
      el.handler = function () {
        // 1. 创建 input
        // 2. 设置 input 的 value
        // 3. 设置 input style
        // 4. 插入到 body
        // 5. 选中值并复制
        // 6. 删除元素
        const input = document.createElement('input');
        input.value = el.$value;
        input.style.position = 'absolute';
        input.style.zIndex = -999;
        document.body.appendChild(input);
        input.select(); // 选中值
        document.execCommand('Copy'); // 执行浏览器复制命令
        vm.$message.success('复制成功');
        input.remove();
      };
      el.addEventListener('click', el.handler, false);
    },
    update(el, { value }) {
      el.$value = value;
    },
    unbind(el) {
      el.removeEventListener('click', el.handler);
    },
  },
};
```
