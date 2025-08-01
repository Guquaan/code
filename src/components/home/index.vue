<template>
   <div class="common-layout">
    <el-container>
      <el-aside width="collapse ? '14vh' : '50vh'" class="el-aside">
        <el-col style="width: 100%;">
      <el-menu
        default-active=""
        class="el-menu-vertical-demo"
        :collapse="collapse"
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
        <el-menu-item index="2"  @click="router.push('/order')">
          <el-icon><Coin /></el-icon>
          <span>订单管理</span>
        </el-menu-item>
      </el-menu>
    </el-col>
      </el-aside>
      <el-container>
        <el-header class="header">
          <el-icon :size="25" v-if="!collapse" @click="isCollapse"><Fold /></el-icon>
          <el-icon :size="25" v-else="collapse" @click="isCollapse"><Expand /></el-icon>
        </el-header>
        <el-main><RouterView/></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import { 
  Location, Document,User ,Coin,Fold,Expand
 } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter()


//折叠侧边栏
const collapse = ref(false)
const isCollapse = ()=>{
  collapse.value = !collapse.value
}

</script>

<style scoped>
.common-layout {
  height: 100%;
}
.header {
  background-color: #f5f5f5;
  height: 5vh;
  line-height: 6vh;
  font-size: 2.5vh;
}
</style>