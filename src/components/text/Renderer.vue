<template>
<h4>使用js代码实现的描述UI就是虚拟DOM</h4>
<div>
    动态控制组件
    <ul id="item-list">
        <li class="item">动态1</li>
        <li>动态2</li>
    </ul>
</div>
</template>

<script setup>
import { onMounted} from 'vue';

// 动态组件控制添加事件
function handle(){
    document.getElementById('item-list').addEventListener('click',function(e){
        // 查找item的子组件
        console.log(e)
        const item = e.target.closest('.item')
        console.log(this)
        //确保存在在id为item-list的列表上
        if(item && this.contains(item)){
            alert('动态组建')
        }
    })
}

// 定义一个虚拟的Dom
const vnode = {
    tag:'div',
    props:{
        onClick:() => alert('虚拟DOM转换为真实DOM')
    },
    children:'点击按钮'
}
// 实现一个渲染器
function renderer(vnode , container){
    //使用vnode.tag作为标签名称进行创建DOM元素
    const el = document.createElement(vnode.tag)
    // 遍历vnode.props,将属性、事件添加到DOM元素
    for(const key in vnode.props){
        if(/^on/.test(key)){
            el.addEventListener(
                key.substring(2).toLowerCase(),
                vnode.props[key]  // 事件处理
            )
        }
    }

    // 处理children
    if(typeof vnode.children === 'string'){
        el.appendChild(document.createTextNode(vnode.children))
    } else if(Array.isArray(vnode.children)){
        vnode.children.forEach(child => renderer(child , el));
    }
    // 将元素挂载到页面上
    container.appendChild(el)
}
renderer(vnode , document.body)


// 动态追加元素
function addItem(text){
    const li = document.createElement('li')
    li.className = 'item'
    li.innerText = text
    document.getElementById('item-list').appendChild(li)
}
    
</script>

<style scoped>

</style>