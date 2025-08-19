<template>
   <div class="common-layout">
    <el-container>
      <el-aside width="collapse ? '14vh' : '50vh'" height="100%">
      <el-menu
        :default-active="active"
        :collapse="collapse"
        @select="handleSelect"
      >
      <div>
        <h5 style="text-align: center;">递达递</h5>
          </div>
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>管理端下单</span>
          </template>
            <el-menu-item index="1-1" @click="router.push('/orderBulid')">预下单</el-menu-item>
            <el-menu-item index="1-2" @click="router.push('/orderList')">下单列表</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="2"  @click="router.push('order')">
          <el-icon><Coin /></el-icon>
          <span>订单管理</span>
        </el-menu-item>
        <el-menu-item index="3"  @click="router.push('massagecenter')">
          <el-icon><Message /></el-icon>
          <span>信息中心</span>
        </el-menu-item>
        <el-menu-item index="4"  @click="router.push('setlist')">
          <el-icon><Setting /></el-icon>
          <span>配置信息</span>
        </el-menu-item>
      </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div class="header-left">
          <el-icon :size="25" v-if="!collapse" @click="isCollapse"><Fold /></el-icon>
          <el-icon :size="25" v-else="collapse" @click="isCollapse"><Expand /></el-icon>
            <el-breadcrumb separator="/">
            <!-- 遍历路由层级链 -->
            <el-breadcrumb-item 
              v-for="(route, index) in matched" 
              :key="index"
              :to="getRoutePath(route)"
              >
              {{ route.meta.title }}
            </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="header-right">
          <el-dropdown>
             <el-icon><arrow-down /></el-icon>
          <template #dropdown>
            <el-dropdown-menu>
            <el-dropdown-item  @click="router.push('/text')">性能测试</el-dropdown-item>
            <el-dropdown-item @click="router.push('/render')">渲染器</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            </el-dropdown-menu>
          </template>
          </el-dropdown>
          <button @click="router.push('/login')">退出登陆</button>
        </div>
        </el-header>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {ref ,onMounted,computed} from 'vue'
import { 
  Location, Document,User ,Coin,Fold,Expand
 } from '@element-plus/icons-vue'
 import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter , useRoute } from 'vue-router'
const router = useRouter()
const routes = useRoute()

//折叠侧边栏
const collapse = ref(false)
const isCollapse = ()=>{
  collapse.value = !collapse.value
}
// 保存侧边栏index信息
const active = ref('')
// 每次进入页面时候，都需要读取保存的index
onMounted(()=>{
    if (router.currentRoute.value.path !== '/orderBulid') {
    localStorage.setItem('active','1-1')
    router.push('/orderBulid')  // 跳转到默认页面
  }
  const saveIndex = localStorage.getItem('active')
  if(saveIndex){
    active.value = saveIndex
  } else {
    // 没有保存默认为第一个
    active.value = '1-1'
  }
})
// 在进行选择的时候保存index到localStorage上面
const handleSelect = (key, keyPath) => {
  // 实时更新高亮效果
  active.value = key 
  // 保存index到浏览器上
  localStorage.setItem('active',key)
}
// 实现面包屑功能
const matched = computed(()=>{
  return routes.matched.filter(item => item.meta.title)
})
//实现点击面包屑进行跳转
const getRoutePath = (route)=>{
  if(route.path === '/orderBulid'){
    active.value = '1-1'
    localStorage.setItem('active','1-1')
  }
  return route.path
}
</script>

<style lang="less" scoped>
body{
  margin: 0;
  padding: 0;
}

.header {
  display: flex;
  background-color: #f5f5f5;
  justify-content: space-between; /* 左右元素分别靠两端对齐 */
  align-items: center; /* 垂直方向居中对齐 */
  height: 5vh;
  line-height: 6vh;
  font-size: 2.5vh;
}
.common-layout{
  height: 100%;
    .el-container{
      height: 100%;
    }

}
.header-left{
  display: flex;
}
.el-breadcrumb {
  margin: 10px 0;
}
</style>