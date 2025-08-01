<template>

  <el-dialog
    v-model="visible"
    :before-close="handleClose"
    style="width:90%">
    {{ returnData }}
    <h4>创建订单下单</h4>
    <el-table :data="props.returnData" border style="width: 100%">
    <el-table-column prop="trackId" label="订单跟踪Id"  />
    <el-table-column prop="ratio" label="比率"  />
    <el-table-column prop="calcFeeRule" label="折扣规则"  />
    <el-table-column prop="calcFeeWeight" label="折扣免费重量" />
    <el-table-column prop="officialMoney" label="官方资金"  />
    <el-table-column prop="totalMoney" label="总金额"  />
    <el-table-column prop="channelMoney" label="渠道资金" />
    <el-table-column prop="pdPlatform" label="快递平台"  />
    <el-table-column prop="orderFrom" label="订单来源"  />
    <el-table-column prop="pdCompanyId" label="快递公司ID" />
    <el-table-column prop="pdName" label="快递名字" />
    <el-table-column prop="pdCompanyName" label="快递公司名字" />
  </el-table>
  <div class="buttonStyle">
    <el-button size="small" @click="handleClose">取消</el-button>
    <el-button size="small" @click="creatOrder">创建</el-button>
  </div>
  </el-dialog>
</template>

<script setup>
import { watch, ref } from 'vue'
import {orderCreate} from '../../api/index'
const props = defineProps(['collCreat','returnData'])
const emit = defineEmits(['closeDialog'])

const visible = ref(props.collCreat)

// 监听父组件传来的值，保持同步
watch(() => props.collCreat, (val) => {
  visible.value = val
})

// 关闭弹窗时通知父组件
const handleClose = () => {
  visible.value = false
  emit('closeDialog')
}
//创建订单
const creatOrder = ()=>{
    orderCreate({trackId:props.returnData.value[0].trackId}).then(()=>{

    })
}
</script>

<style scoped>
.buttonStyle{
    display: flex;              
    justify-content: center;    
    gap: 1vh;                  
    margin-top: 2vh;            
    margin-bottom: 2vh;        
    padding: 10px 0; 
}
</style>