<template>
   <div class="common-layout">
    <el-container>
      <el-aside width="collapse ? '14vh' : '50vh'" class="el-aside">
        <el-col style="width: 100%;">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse="collapse"
      >
      <div>
            <h5 style="text-align: center;">递达递</h5>
          </div>
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><user /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4"  @click="router.push('/order')">
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
          Header
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
  line-height: 60px;
  font-size: 16px;
}
</style>