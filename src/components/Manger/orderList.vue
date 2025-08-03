<template>
<span v-if="collCreat">创建的订单列表如下</span>
<span v-else>订单未创建，请返回预下单列表进行创建</span>
<el-table :data="orderData" style="width: 100%" size="small">
    <el-table-column prop="trackId" label="订单跟踪Id"   />
    <el-table-column prop="calcFeeRule" label="折扣规则"   />
    <el-table-column prop="totalMoney" label="总金额"  />
    <el-table-column prop="pdPlatform" label="快递平台"   />
    <el-table-column prop="orderFrom" label="订单来源"   />
    <el-table-column prop="pdCompanyId" label="快递公司ID"  />
    <el-table-column prop="pdName" label="快递名字"  />
    <el-table-column prop="pdCompanyName" label="快递公司名字" />
    <el-table-column label="操作">
        <template #default>
            <el-button link type="primary" @click="InfoShow  = true">查看收件人信息</el-button>
        </template>
    </el-table-column>
</el-table>
<el-dialog v-model="InfoShow">
    收件人姓名：{{formData.receiverName}}<br/>
    收件人电话：{{formData.receiverMobile}}<br/>
    收件人地区：{{`${formData.recRef[0]}-${formData.recRef[1]}-${formData.recRef[2]}`}}<br/>
    收件人详细地址：{{formData.receiverAddress}}<br/>
</el-dialog>
</template>

<script setup>
import {ref} from 'vue'
import { getFormData , getorderData } from '../../stores/store';
const formData = getFormData().formData
const collCreat = getorderData().collCreatList
const orderData = collCreat ? getorderData().orderData : []
const InfoShow = ref(false)
</script>

<style scoped>

</style>