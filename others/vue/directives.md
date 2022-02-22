## copy

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

## drag

```js
directions = {
  drag: {
    // https://juejin.cn/post/6844903958633267208
    bind(el) {
      const dialogWrap = el.querySelector('.el-dialog'),
        dialogHeader = dialogWrap.querySelector('.el-dialog__header'); // 获取 dialog header
      dialogHeader.style.cursor = 'move'; // 鼠标手型

      dialogHeader.onmousedown = function (e) {
        // 记录按下时鼠标的坐标和目标元素的 left、top 值
        const currentX = e.clientX;
        const currentY = e.clientY;
        const left = dialogHeader.offsetLeft;
        const top = dialogHeader.offsetTop;

        document.onmousemove = function (e) {
          // 鼠标移动时计算每次移动的距离，并改变拖拽元素的定位
          const disX = e.clientX - currentX;
          const disY = e.clientY - currentY;

          let curX = left + disX;
          // curX = curX < 0 ? 0 : curX;
          let curY = top + disY;
          // curY = curY > 400 ? 400 : curY;

          dialogWrap.style.left = `${curX}px`;
          dialogWrap.style.top = `${curY}px`;

          // 阻止事件的默认行为，可以解决选中文本的时候拖不动
          return false;
        };

        // 鼠标松开时，拖拽结束
        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    },
    // 每次重新打开 dialog 时，要将其还原
    update(el, binding, { context }) {
      context.$nextTick(() => {
        // $nextTick 无效，还是会有闪动效果
        const dialogWrap = el.querySelector('.el-dialog');
        dialogWrap.style.left = '';
        dialogWrap.style.top = '';
      });
    },

    unbind(el) {
      const dialogHeader = el.querySelector('.el-dialog__header');
      dialogHeader.onmousedown = null;
    },
  },
};
```
