<template>

</template>

<script setup>
//框架构建函数
function Render(obj, root){
    const el = document.createElement(obj.tag)
    if(typeof obj.children === 'string'){
        const text = document.createTextNode(obj.children)
        el.appendChild(text)
    } else if(obj.children){
        // 数组 ，递归调用Render， 使用el作为Root的参数
        obj.children.forEach((child)=>Render(child ,el))
    }
    //将元素添加到root
    root.appendChild(el)
}
// 调用Compiler编译得到树形结构的数据对象
function Compiler(html) {
  // 去除HTML字符串中的空白字符（简化处理）
  const trimmedHtml = html.trim().replace(/\s+/g, ' ');
  let index = 0;
  const length = trimmedHtml.length;
  const stack = [];
  let root = null;

  // 辅助函数：检查当前位置是否是标签开始
  const isStartTag = () => trimmedHtml[index] === '<' && trimmedHtml[index + 1] !== '/';
  
  // 辅助函数：检查当前位置是否是标签结束
  const isEndTag = () => trimmedHtml[index] === '<' && trimmedHtml[index + 1] === '/';
  
  // 辅助函数：解析标签名
  const parseTagName = () => {
    index++; // 跳过 '<' 或 '</'
    let tagName = '';
    while (index < length && trimmedHtml[index] !== '>') {
      tagName += trimmedHtml[index];
      index++;
    }
    index++; // 跳过 '>'
    return tagName;
  };
  
  // 辅助函数：解析文本内容
  const parseText = () => {
    let text = '';
    while (index < length && !isStartTag() && !isEndTag()) {
      text += trimmedHtml[index];
      index++;
    }
    return text.trim(); // 去除文本前后空白
  };

  // 主解析循环
  while (index < length) {
    if (isStartTag()) {
      // 解析开始标签
      const tagName = parseTagName();
      // 创建元素节点
      const element = {
        tag: tagName,
        children: []
      };
      
      // 如果栈为空，说明是根节点
      if (stack.length === 0) {
        root = element;
      } else {
        // 否则添加到父节点的children中
        stack[stack.length - 1].children.push(element);
      }
      
      // 将当前元素压入栈，作为后续元素的父节点
      stack.push(element);
    } else if (isEndTag()) {
      // 解析结束标签
      const tagName = parseTagName();
      // 弹出栈顶元素（当前标签解析完成）
      stack.pop();
    } else {
      // 解析文本节点
      const textContent = parseText();
      if (textContent) { // 忽略空文本
        const textNode = {
          children: textContent
        };
        // 添加到当前父节点的children中
        if (stack.length > 0) {
          stack[stack.length - 1].children.push(textNode);
        }
      }
    }
  }

  return root;
}


// 纯运行时候框架
console.time('obj')
const obj = {
    tag:'div',
    children:[
        {tag:'span',children:'性能比较'},
        {tag:'h4',children:'这个是命令式代码，运行效率高'},
        {tag:'span',children:'Hello ,world,obj'},
    ]
}

// 对元素进行渲染
Render(obj,document.body)
console.timeEnd('obj')
// 编译和运行结合的框架
console.time('obj1')
const html = `
<div>
    <h4>这个是编译加运行的代码</h4>
    <span>hello,world,obj1</span>
</div>
    `
const obj1 = Compiler(html)
Render(obj1,document.body)
console.timeEnd('obj1')
// 纯编译的结果
    console.time('obj2')
    const div = document.createElement('div')
    const h4 = document.createElement('h4')
    h4.innerText = '这个是纯编译的结果'
    const span = document.createElement('span')
    span.innerText = 'Hello, world,obj2'
    div.appendChild(h4)
    div.appendChild(span)
    document.body.appendChild(div)
    console.timeEnd('obj2')
</script>

<style lang="css" scoped>

</style>