<template>
    <el-form v-model="searchData">
        <el-form-item label ="发件人地址" >
            <el-input v-model="searchData.senderId"></el-input>
        </el-form-item>
    </el-form>
<el-card>
    <el-table v-loading="loading" :data="search" stripe style="width: 100%" :border="true" size="small">
        <el-table-column prop="trackId" label="订单跟踪Id"  />
        <el-table-column prop="uuid" label="用户唯一标识符"  />
        <el-table-column prop="nowStatus" label="订单状态码" />
        <el-table-column prop="senderAddressId" label="发件人地址Id" />
        <el-table-column prop="receiverAddressId" label="收件人地址Id" />
        <el-table-column prop="couponId" label="优惠券Id"/>
        <el-table-column prop="itemName" label="物品"/>
        <el-table-column prop="packageNum" label="包裹数量"/>
        <el-table-column prop="remark" label="订单备注"/>
        <el-table-column prop="orderFrom" label="订单来源"/>
        <el-table-column prop="changeTimes" label="订单更改次数"/>
        <el-table-column prop="createAt" label="订单创建时间"/>
        <el-table-column type="expand" label="其他信息展示">
            <template #default="scope">
                <div>
                <h4>日志信息</h4>
                 <el-table :data="scope.row.order_logs" size="small">
                    <el-table-column prop="id" label="目标日志Id" />
                    <el-table-column prop="trackId" label="订单跟踪Id" />
                    <el-table-column prop="status" label="变更后的状态码" />
                    <el-table-column prop="msg" label="状态信息" />
                    <el-table-column prop="updateAt" label="状态更新时间" />
                 </el-table>
                  <h4>发件人信息</h4>
                <el-table :data="[scope.row.senderAddress]" size="small">
                    <el-table-column prop="id" label="地址Id" />
                    <el-table-column prop="uuid" label="用户uud" />
                    <el-table-column prop="name" label="发件人名字" />
                    <el-table-column prop="mobile" label="发件人手机号" />
                    <el-table-column prop="province" label="省份" />
                    <el-table-column prop="city" label="城市" />
                    <el-table-column prop="district" label="区/县" />
                    <el-table-column prop="address" label="详细地址" />
                 </el-table>
                 <h4>收件人信息</h4>
                <el-table :data="[scope.row.receiverAddress]" size="small">
                    <el-table-column prop="id" label="地址Id" />
                    <el-table-column prop="uuid" label="用户uud" />
                    <el-table-column prop="name" label="发件人名字" />
                    <el-table-column prop="mobile" label="发件人手机号" />
                    <el-table-column prop="province" label="省份" />
                    <el-table-column prop="city" label="城市" />
                    <el-table-column prop="district" label="区/县" />
                    <el-table-column prop="address" label="详细地址" />
                 </el-table>
                 <h4>支付信息</h4>
                 <el-table :data="scope.row.order_pays" size="small">
                    <el-table-column prop="payId" label="支付Id" />
                    <el-table-column prop="trackId" label="订单跟踪Id" />
                    <el-table-column prop="thirdId" label="第三方支付Id" />
                    <el-table-column prop="payNo" label="支付流水号" />
                    <el-table-column prop="method" label="支付方式" />
                    <el-table-column prop="platform" label="平台标识" />
                    <el-table-column prop="status" label="支付状态" />
                    <el-table-column prop="money" label="支付金额" />
                    <el-table-column prop="refund" label="退款金额" />
                    <el-table-column prop="createAt" label="支付创建时间" />
                    <el-table-column label="订单参数" type="expand" >
                        <template #default="scope2">
                            <h4>标准快递信息</h4>
                            <el-table :data="[scope2.row.orderArg.stdExpressInfo.pkg]">
                                <el-table-column prop="goods" label="物品" />
                                <el-table-column prop="vLong" label="长度" />
                                <el-table-column prop="vWidth" label="宽度" />
                                <el-table-column prop="weight" label="重量" />
                                <el-table-column prop="vHeight" label="高度" />
                                <el-table-column prop="packageCount" label="数量" />
                            </el-table>
                            <h4>发件人信息</h4>
                            <el-table :data="[scope2.row.orderArg.stdExpressInfo.sender]">
                                <el-table-column prop="province" label="省份" />
                                <el-table-column prop="city" label="城市" />
                                <el-table-column prop="name" label="名字" />
                                <el-table-column prop="mobile" label="电话号码" />
                                <el-table-column prop="address" label="地区" />
                                <el-table-column prop="district" label="详细地址" />
                            </el-table>
                            <h4>收件人信息</h4>
                            <el-table :data="[scope2.row.orderArg.stdExpressInfo.receiver]">
                                <el-table-column prop="province" label="省份" />
                                <el-table-column prop="city" label="城市" />
                                <el-table-column prop="name" label="名字" />
                                <el-table-column prop="mobile" label="电话号码" />
                                <el-table-column prop="address" label="地区" />
                                <el-table-column prop="district" label="详细地址" />
                            </el-table>
                            <h4>确认产品数据</h4>
                            <el-table :data="[scope2.row.orderArg.confirmedPdData]">
                                <el-table-column prop="id" label="产品数据Id" />
                                <el-table-column prop="pdId" label="产品Id" />
                                <el-table-column prop="ratio" label="比率" />
                                <el-table-column prop="pdName" label="产品名称" />
                                <el-table-column prop="totalMoney" label="总支付金额" />
                                <el-table-column prop="pdType" label="产品类型" />
                                <el-table-column prop="pdNotice" label="产品提示" />
                                <el-table-column prop="platform" label="平台" />
                                <el-table-column prop="pdPlatform" label="产品平台" />
                                <el-table-column prop="calcFeeRule" label="计算费用规则" />
                                <el-table-column prop="limitWeight" label="限制规则" />
                                <el-table-column prop="pdCompanyId" label="公司Id" />
                                <el-table-column prop="channelMoney" label="资金渠道" />
                                <el-table-column prop="calcFeeWeight" label="计算费用重量" />
                                <el-table-column prop="officialMoney" label="官方资金" />
                                <el-table-column prop="pdCompanyAbbr" label="公司简称" />
                                <el-table-column prop="pdCompanyName" label="公司全称" />
                                <el-table-column prop="serviceCharge" label="服务费" />
                                <el-table-column prop="platformChannel" label="平台频道" />
                            </el-table>
                        </template>
                    </el-table-column>
                 </el-table>
                 <h4>快递信息</h4>
                 <el-table :data="[scope.row.express_info]">
                    <el-table-column prop="trackId" label="跟踪Id" />
                    <el-table-column prop="attachId" label="发送Id" />
                    <el-table-column prop="thirdId" label="第三Id" />
                    <el-table-column prop="expressId" label="快递Id" />
                    <el-table-column prop="weight" label="重量" />
                    <el-table-column prop="volume" label="容量" />
                    <el-table-column prop="length" label="长度" />
                    <el-table-column prop="width" label="宽度" />
                    <el-table-column prop="height" label="高度" />
                    <el-table-column prop="ratio" label="比率" />
                    <el-table-column prop="officialMoney" label="官方资金" />
                    <el-table-column prop="totalMoney" label="总金额" />
                    <el-table-column prop="channelMoney" label="资金渠道" />
                    <el-table-column prop="productId" label="产品Id" />
                    <el-table-column prop="appointFrom" label="预约发送时间" />
                    <el-table-column prop="appointTo" label="预计到达时间" />
                    <el-table-column label="产品简介"  type="expand">
                        <el-table :data="[scope.row.express_info.product]">
                            <el-table-column prop="id" label="id" />
                            <el-table-column prop="companyId" label="公司Id" />
                            <el-table-column prop="type" label="类型" />
                            <el-table-column prop="name" label="名字" />
                            <el-table-column prop="platform" label="平台" />
                            <el-table-column prop="priceStrategyId" label="价格类型Id" />
                            <el-table-column prop="banOrder" label="banOrder" />
                            <el-table-column prop="notice" label="提示" />
                        </el-table>
                    </el-table-column>
                 </el-table>
                 </div>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination 
    background 
    :page-size="orderlist.pageSize"
    :current-page="currentPage"
    layout="prev, pager, next, jumper, ->, " 
    :total="4370/orderlist.pageSize"
    @current-change="handlePage"
    />
</el-card>
    <h3>订单页面</h3>
</template>

<script setup>
import { ref,reactive ,onMounted ,computed} from 'vue'
import {orderList} from '../../api/index'
import { ElMessage } from 'element-plus'
const order = ref([])
const loading = ref(true)
//懒加载页面数
const currentPage = ref()
//订单传params
const token = localStorage.getItem('token')
//订单传data
const orderlist = reactive({
    current:1,
    pageSize:10,
    status:'',
    trackId:'',
})
//搜索数据
const searchData = reactive({
    senderId:0,

})
//从接口中获取数据
const getorderlist = ()=>{
    orderList({
        current: orderlist.current,
        pageSize: orderlist.pageSize,
    },{token:token}).then(({data})=>{
        console.log(data)
        if(data.code === 200){
            order.value = data.data
        }
        else {
            ElMessage.error(data.msg)
        }
    })
}
onMounted(()=>{
    setTimeout(()=>{
    loading.value = !loading.value
},500)
    getorderlist()
})
//列表搜索
const search = computed(()=>{
    console.log(order.value)
    const arr = order.value.filter(item=>{
        return item.senderAddressId 
    })
    return arr
})
//控制懒加载页面输出
const handlePage = (page)=>{
    orderlist.current = page
    currentPage.value = page
    getorderlist()
    
}

</script>

<style lang="css" scoped>


</style>

