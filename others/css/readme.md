# css属性值的计算过程
概念：一个元素，从所有属性都没有值，到所有的属性都有值，这个计算过程叫做属性值计算过程
1. 确认冲突：程序员写的和浏览器默认的样式 **没有冲突** 的作为属性值
2. 重叠冲突：import > 普通样式（ 行内 > id > class > ** > * ）> 浏览器的默认样式 （级别一样谁在后面取谁）
3. 继承：继承父元素的值
4. 使用默认值