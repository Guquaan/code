<template>
    <h3>订单页面</h3>
    <!-- 信息搜索 --> 
    <div>
    <el-form v-model="data" class="searchStyle">
        <el-form-item label ="订单跟踪Id" style="width: 50vh;">
            <el-input v-model="data.trackId"  class="inputSea" placeholder="请输入" />
        </el-form-item>
        <el-form-item label ="收件人地址" style="width: 50vh;">
            <el-input v-model="data.reId" class="inputSea" placeholder="请输入" />
        </el-form-item>
        <el-form-item label ="订单状态码" style="width: 50vh;">
            <el-input v-model="data.sta" class="inputSea" placeholder="请输入" />
        </el-form-item>
    </el-form>
        <el-button @click="sousuo" class="button">搜索</el-button>
        <el-button @click="reset">重置</el-button>
    </div>
    <!-- 功能实现 -->
    <div style="margin-top: 2vh;margin-bottom: 2vh;">
    <h4>功能实现</h4>
    <el-button   
    :icon="Plus"
    type="primary"
    @click="open(null)"
    size="small"
    >
        新增
    </el-button>
    <el-button
    :icon="ShoppingCart" 
    size="small"
    @click="orderRefund"
    color="#f89898" 
    >
        退款
    </el-button>
    <el-button 
    :icon="Close"
    @click="cancel"
    size="small"
    type="warning">
        取消订单
    </el-button>
    <el-button 
    :icon="Promotion"
    size="small"
    color="#a0cfff"
    @click="showTrace" >
        查询快递轨迹
    </el-button>
    <el-button 
    type="danger" 
    :icon="Delete" 
    size="small"
    @click="deleConfirm"
    >删除
    </el-button>
    <el-button
    color="#95d475"
    :icon="WalletFilled"
    size="small"
    @click="returncou">
        退优惠券
    </el-button>
    <el-button
    size="small"
    color="#c8c9cc"
    :icon="Timer"
    @click="collStatus = true">
        更改状态码
    </el-button>
    </div>
    <!-- 信息展示 -->
     <div>
        <span style="font-size:1.5vh">状态码注释：
            -5：订单取消，-4：揽收取消，-3：已退款，-2:待退款，-1：订单异常，0：待支付<br>
            1:更换快递，2：已支付，3：待揽收，4：已揽收，5：待补差，6待退差，7：已补差<br>
            8:已退差，9：运输中，10：已送达
        </span>
     </div>
<el-card>
    <el-table v-loading="loading" :data="search" 
    stripe
     style="width: 100%" :border="true" size="small"
      @selection-change="handleSelectionChange"
      ref="tableRef">    
        <el-table-column type="selection" :selectable="selectable" width="55" />
        <el-table-column prop="trackId" label="订单跟踪Id"  />
        <el-table-column prop="uuid" label="用户唯一标识符"  />
        <el-table-column prop="nowStatus" label="订单状态码" />
        <el-table-column prop="senderAddressId" label="发件人地址Id" />
        <el-table-column prop="receiverAddressId" label="收件人地址Id" />
        <el-table-column prop="itemName" label="物品"/>
        <el-table-column prop="packageNum" label="包裹数量"/>
        <el-table-column prop="orderFrom" label="订单来源"/>
        <el-table-column prop="changeTimes" label="订单更改次数"/>
        <el-table-column prop="createAt" label="订单创建时间"/>
        <el-table-column label="其他信息展示">
            <template #default="scope" >
                <el-button 
                @click="showInfo(scope.row)"
                size="small"
                type="info">
                详细信息
                </el-button>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button
                color="#626aef"
                size="small"
                 @click="open(scope.row)"
                 :icon="Edit">
                 编辑
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination 
    background 
    v-model:page-size="orderlist.pageSize"
    v-model:current-page="currentPage"
    layout="total, prev, pager, next, jumper" 
    :total="total"
    @update:current-page="handlePageChange"
    />
</el-card>
    <!-- 编辑数据 -->
     <el-dialog 
     v-model="dialogFormVisable"
     title="数据操作"
     >
    <el-form
        ref="formRef"
        label-width="100px"
        label-position="left"
        :model="form"
    >
    <el-form-item v-show="false" prop="id">
        <el-input v-model="form.trackId"/>
    </el-form-item>
    <el-form-item label="状态码" prop="status">
        <el-input v-model="form.nowStatus" placeholder="请输入状态码"/>
    </el-form-item>
    <el-form-item label="发件人id" prop="sender">
        <el-input v-model="form.senderAddressId" placeholder="请输入发件人id"/>
    </el-form-item>
    <el-form-item label="收件人" prop="reciver">
        <el-input v-model="form.receiverAddressId" placeholder="请输入收件人id"/>
    </el-form-item>
    </el-form>
    <template #footer>
        <div class="dialog-footer">
            <el-button type="danger" 
            @click="dialogFormVisable = false"
            size="small"
            :icon="Close"
            >取消</el-button>
            <el-button type="primary" 
            @click="confirm(formRef)"
            :icon="Check"
            size="small">确认</el-button>
        </div>
    </template>
     </el-dialog>
     <!-- 展示其他信息 -->
      <el-dialog
      v-model = "infoShow"
      width="95%"
      > 
        <h4>发件人信息</h4>
        <el-table :data="[infoData.value.senderAddress]" size="small">
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
        <el-table :data="[infoData.value.receiverAddress]" size="small">
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
        <el-table :data="infoData.value.order_pays" size="small">
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
        </el-table>
        <h4>标准快递信息</h4>
        <el-table :data="infoData.value.order_pays">
            <el-table-column prop="orderArg.stdExpressInfo.pkg.goods" label="物品" />
            <el-table-column prop="orderArg.stdExpressInfo.pkg.vLong" label="长度" />
            <el-table-column prop="orderArg.stdExpressInfo.pkg.vWidth" label="宽度" />
            <el-table-column prop="orderArg.stdExpressInfo.pkg.weight" label="重量" />
            <el-table-column prop="orderArg.stdExpressInfo.pkg.vHeight" label="高度" />
            <el-table-column prop="orderArg.stdExpressInfo.pkg.packageCount" label="数量" />
        </el-table>
        <h4>发件人详细信息</h4>
        <el-table :data="infoData.value.order_pays">
            <el-table-column prop="orderArg.stdExpressInfo.sender.province" label="省份" />
            <el-table-column prop="orderArg.stdExpressInfo.sender.city" label="城市" />
            <el-table-column prop="orderArg.stdExpressInfo.sender.name" label="名字" />
            <el-table-column prop="orderArg.stdExpressInfo.sender.mobile" label="电话号码" />
            <el-table-column prop="orderArg.stdExpressInfo.sender.address" label="地区" />
            <el-table-column prop="orderArg.stdExpressInfo.sender.district" label="详细地址" />
        </el-table>
        <h4>收件人详细信息</h4>
        <el-table :data="infoData.value.order_pays">
            <el-table-column prop="orderArg.stdExpressInfo.receiver.province" label="省份" />
            <el-table-column prop="orderArg.stdExpressInfo.receiver.city" label="城市" />
            <el-table-column prop="orderArg.stdExpressInfo.receiver.name" label="名字" />
            <el-table-column prop="orderArg.stdExpressInfo.receiver.mobile" label="电话号码" />
            <el-table-column prop="orderArg.stdExpressInfo.receiver.address" label="地区" />
            <el-table-column prop="orderArg.stdExpressInfo.receiver.district" label="详细地址" />
        </el-table>
        <h4>确认产品详细数据</h4>
        <el-table :data="infoData.value.order_pays">
            <el-table-column prop="orderArg.confirmedPdData.id" label="产品数据Id" />
            <el-table-column prop="orderArg.confirmedPdData.pdId" label="产品Id" />
            <el-table-column prop="orderArg.confirmedPdData.ratio" label="比率" />
            <el-table-column prop="orderArg.confirmedPdData.pdName" label="产品名称" />
            <el-table-column prop="orderArg.confirmedPdData.totalMoney" label="总支付金额" />
            <el-table-column prop="orderArg.confirmedPdData.pdType" label="产品类型" />
            <el-table-column prop="orderArg.confirmedPdData.pdNotice" label="产品提示" />
            <el-table-column prop="orderArg.confirmedPdData.platform" label="平台" />
            <el-table-column prop="orderArg.confirmedPdData.pdPlatform" label="产品平台" />
            <el-table-column prop="orderArg.confirmedPdData.calcFeeRule" label="计算费用规则" />
            <el-table-column prop="orderArg.confirmedPdData.limitWeight" label="限制规则" />
            <el-table-column prop="orderArg.confirmedPdData.pdCompanyId" label="公司Id" />
            <el-table-column prop="orderArg.confirmedPdData.channelMoney" label="资金渠道" />
            <el-table-column prop="orderArg.confirmedPdData.calcFeeWeight" label="计算费用重量" />
            <el-table-column prop="orderArg.confirmedPdData.officialMoney" label="官方资金" />
            <el-table-column prop="orderArg.confirmedPdData.pdCompanyAbbr" label="公司简称" />
            <el-table-column prop="orderArg.confirmedPdData.pdCompanyName" label="公司全称" />
            <el-table-column prop="orderArg.confirmedPdData.serviceCharge" label="服务费" />
            <el-table-column prop="orderArg.confirmedPdData.platformChannel" label="平台频道" />
        </el-table>
        <h4>快递信息</h4>
        <el-table :data="[infoData.value.express_info]">
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
        </el-table>
        <h4>产品简介</h4>
         <el-table :data="[infoData.value.express_info.product]">
            <el-table-column prop="id" label="id" />
            <el-table-column prop="companyId" label="公司Id" />
            <el-table-column prop="type" label="类型" />
            <el-table-column prop="name" label="名字" />
            <el-table-column prop="platform" label="平台" />
            <el-table-column prop="priceStrategyId" label="价格类型Id" />
            <el-table-column prop="banOrder" label="banOrder" />
            <el-table-column prop="notice" label="提示" />
        </el-table>
        <h4>日志信息</h4>
        <el-table :data="infoData.value.order_logs" size="small">
            <el-table-column prop="id" label="目标日志Id" />
            <el-table-column prop="trackId" label="订单跟踪Id" />
            <el-table-column prop="status" label="变更后的状态码" />
            <el-table-column prop="msg" label="状态信息" />
            <el-table-column prop="updateAt" label="状态更新时间" />
        </el-table>
      </el-dialog>
      <!-- 快递轨迹 -->
       <el-dialog>

       </el-dialog>
        <!-- 修改订单状态 -->
       <el-dialog
       v-model="collStatus"
       size="small"
       width="50%">
       请输入新的状态码：
       <input v-model="newStatus" />
       <br><br>
       <div style="align-items: center;">
        <el-button @click="collStatus = false" size="small">取消</el-button>
       <el-button @click="changeStatus(newStatus)" size="small">确认</el-button>
       </div>
       </el-dialog>
</template>

<script setup>
import { ref,reactive ,onMounted ,computed ,nextTick} from 'vue'
import {orderList , orderdel ,refund ,cancelorder ,ordertrace ,returnCoupon,statusChange} from '../../api/index'
import { ElMessage } from 'element-plus'
import { nanoid } from 'nanoid'
import {ShoppingCart,Delete,Edit, WalletFilled,Timer,Promotion,Plus ,Check , Close } from '@element-plus/icons-vue'
const order = ref([])
const loading = ref(true)
//懒加载页面数
const currentPage = ref()
const total = ref()
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
const data = reactive({
    trackId:'',
    reId:'',
    sta:''
})
const searchData = reactive({
    trackId:'',
    reciverid:'',
    status:''
})
//从接口中获取数据
const getorderlist = ()=>{
    orderList({
        current: orderlist.current,
        pageSize: orderlist.pageSize,
    },{token:token}).then(({data})=>{
        if(data.code === 200){
            order.value = data.data
            total.value = data.totals
        }
        else {
            ElMessage.error(data.msg)
        }
    })
}
//初始化数据
onMounted(()=>{
    setTimeout(()=>{
    loading.value = !loading.value
},500)
    getorderlist()
})
//列表搜索
const search = computed(()=>{
    if(searchData.senderId == '' && searchData.reciverid == '' && searchData.status == '')
    {
        return order.value
    }
    else {
        return order.value.filter(item=>{
            item.nowStatus = String(item.nowStatus)
        // //发件人地址搜索
        // if(item.senderAddressId !== searchData.senderId){
        //     console.log(item)
        //     return false
        // }
        // //收件人地址搜索
        // if(item.receiverAddressId !== searchData.reciverid){
        //     return false
        // }
        // //状态码搜索
        // if(item.nowStatus !== searchData.status){
        //     return false
        // }
        const s1 = searchData.trackId == '' || item.trackId.indexOf(searchData.trackId)!==-1
        const s2 = searchData.reciverid == '' || item.receiverAddressId == searchData.reciverid
        const s3 = searchData.status == '' || item.nowStatus == searchData.status
        return s1 && s2 && s3
    })
    }
})
//控制懒加载页面输出
const handlePageChange = (page)=>{
    orderlist.current = page
    currentPage.value = page
    getorderlist()
    
}
// 控制搜索数据
const sousuo = ()=>{
    searchData.trackId = data.trackId
    searchData.reciverid = Number(data.reId) 
    searchData.status = data.sta
}
//重置搜索数据
const reset = ()=>{
    searchData.trackId = data.trackId = ''
    searchData.reciverid = data.reId = ''
    searchData.status = data.sta = ''
}

//其他信息展示
const infoData = reactive({})
const infoShow = ref(false)
const showInfo = (data = {}) => {
    infoData.value = {...data}
    console.log(infoData.value.order_pays)
    infoShow.value = true
    
}

//功能实现
const dialogFormVisable= ref(false)
const selectTableData=ref([])
const cou = ref([])
const status = ref([])
//控制勾选可以使用
const selectable = () => true
const tableRef = ref()
const formRef = ref()
const form = reactive({
    trackId:'',
    nowStatus:'',
    senderAddressId:2000,
    receiverAddressId:2000,
})
const open = (rowData = {}) => {
    console.log(rowData)
    dialogFormVisable.value = true
    rowData = rowData || {}
    form.trackId = rowData.trackId || ''
    form.nowStatus = rowData.nowStatus || '0'
    form.senderAddressId = rowData.senderAddressId || 2000
    form.receiverAddressId = rowData.receiverAddressId || 2000
}
const confirm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            //判断是新增还是编辑
            if (form.trackId) {
                // 编辑
                const idx = order.value.findIndex(item => item.trackId === form.trackId)
                if (idx !== -1) {
                    order.value[idx] = {
                        ...order.value[idx],
                        ...form
                        }
                }
            } else {   //新增
                form.trackId = nanoid()
                form.value = {
                    ...order.value[1],
                    ...form 
                }
                console.log(form.value)
                order.value.unshift({ ...form.value })
            }
            dialogFormVisable.value = false
             // 重置表单
            nextTick(() => {
                formRef.value && formRef.value.resetFields()
            })
        }
    })
}

//获取勾选的信息
const handleSelectionChange = (val)=>{
    selectTableData.value = val.map(item=>({trackId:item.trackId}))
    cou.value = val.map(item => ({couponId:item.couponId}))
    status.value = val.map(item =>({nowstatus:item.nowStatus}))
}
//对数据进行删除
const deleConfirm = ()=>{
    if(!selectTableData.value.length){
        console.log(selectTableData.value.length)
       return ElMessage.warning("请选择一项数据")
    } else{
        console.log(selectTableData.value.length)
        //获取选中的跟踪id，获取新数组
        const idxId = selectTableData.value.map(item=>item.trackId)
        console.log(idxId)
        // 删除被选中的订单
        for(let i = 0 ; i < selectTableData.value.length ; i++){
            orderdel({trackId:idxId[i]}).then(({data})=>{
                console.log(data)
                if(data.code === 500){
                    //重置勾选框
                    selectTableData.value = []
                    tableRef.value.clearSelection()
                    ElMessage.error(`接口数据订单跟踪Id${idxId}删除失败，假数据进行删除`)
                }
                order.value = order.value.filter(item =>!idxId.includes(item.trackId))
                ElMessage.success('删除成功')
            })
        }
    }
}

//退款功能
const orderRefund = ()=>{
    if(!selectTableData.value.length){
        console.log(selectTableData.value.length)
       return ElMessage.warning("请勾选一项需要退款的数据")
    } else if(selectTableData.value.length > 1){
        selectTableData.value = []
        tableRef.value.clearSelection()
        return ElMessage.warning("只能选择一项退款")
    } else {
        const refundidxId = selectTableData.value.map(item => item.trackId)
        refund({trackId:refundidxId[0],force:1}).then(({data})=>{
            if(data.code === 200){ 
                //重置勾选框
                selectTableData.value = []
                tableRef.value.clearSelection()
                console.log(selectTableData.value)
                ElMessage.success(`订单id${refundidxId[0]}`+data.msg + '退款')
            } 
        })
    } 
}

//取消订单
const cancel = ()=>{
    if(!selectTableData.value.length){
        console.log(selectTableData.value.length)
       return ElMessage.warning("请选择一项数据")
    } else{
        console.log(selectTableData.value.length)
        //获取选中的跟踪id，获取新数组
        const idxId = selectTableData.value.map(item=>item.trackId)
        console.log(idxId)
        // 取消被选中的订单
        for(let i = 0 ; i < selectTableData.value.length ; i++){
            cancelorder({trackId:idxId[i]},{token:token}).then(({data})=>{
                console.log(data)
                if(data.code === 200){
                                    orderList({
                current: orderlist.current,
                pageSize: orderlist.pageSize,
                },{token:token}).then(({data})=>{
                console.log(data)
                if(data.code === 200){
                    order.value = data.data
                    total.value = data.totals
                }
                else {
                    ElMessage.error(data.msg)
                }
                })
                    //重置勾选框
                    selectTableData.value = []
                    tableRef.value.clearSelection()
                    ElMessage.success(`订单跟踪Id${idxId}取消${data.msg}`)
                }else if(data.code === 702){
                    ElMessage.error(idxId[i] + data.msg)
                }
            })
        }
    }
}

//查询快递轨迹
const traceData = ref([])
const traceColl = ref(false)
const showTrace = () =>{
    if(!selectTableData.value.length){
        console.log(selectTableData.value.length)
       return ElMessage.warning("请勾选一项需要退款的数据")
    } else if(selectTableData.value.length > 1){
        selectTableData.value = []
        tableRef.value.clearSelection()
        return ElMessage.warning("只能选择一项退款")
    } else {
        const traceidxId = selectTableData.value.map(item => item.trackId)
        console.log(traceidxId[0])
        ordertrace({trackId:traceidxId[0]},{token:token}).then(({data})=>{
            traceData.value = data.data
            ElMessage.error(data.msg)
        })
    }
}

//退优惠券
const returncou = () =>{
    if(!selectTableData.value.length){
        console.log(selectTableData.value.length)
       return ElMessage.warning("请选择一项数据")
    } else {
        const couponidxId = selectTableData.value.map(item=>item.trackId)
        const coupon = cou.value.map(item=>item.couponId)
        console.log(couponidxId,coupon)
        for(let i = 0 ; i<coupon.length ; i++){
            returnCoupon({trackId:couponidxId[0],couponId:coupon[0]}).then(({data})=>{
                if(data.code === 500){
                    ElMessage.error('退优惠券' + data.msg)
                    //重置勾选框
                    selectTableData.value = []
                    cou.value = []
                    tableRef.value.clearSelection()
                } else if(data.code === 200){
                    ElMessage.success('退优惠券' + data.msg)
                    //重置勾选框
                    selectTableData.value = []
                    cou.value = []
                    tableRef.value.clearSelection()
                }
            })
        }
    }
}

// 修改订单状态
const collStatus = ref(false)
const newStatus = ref('')
const changeStatus = (data)=>{
    console.log(data)
    if(!data){
        return ElMessage.error('请输入修改的状态码')
    }else {
    if(!selectTableData.value.length){
        console.log(selectTableData.value.length)
        return ElMessage.warning("请勾选一项需要修改状态码的数据")
    } else if(selectTableData.value.length > 1){
        selectTableData.value = []
        tableRef.value.clearSelection()
        return ElMessage.warning("只能选择一项")
    } else {
        const idxId = selectTableData.value.map(item => item.trackId)
        statusChange({trackId:idxId[0],status:data,force:1}).then(({data})=>{
            if(data.code === 200){ 
                orderList({
                current: orderlist.current,
                pageSize: orderlist.pageSize,
                },{token:token}).then(({data})=>{
                if(data.code === 200){
                    order.value = data.data
                    total.value = data.totals
                }
                else {
                    ElMessage.error(data.msg)
                }
                })
                //重置勾选框
                selectTableData.value = []
                tableRef.value.clearSelection()
                newStatus.value = ''
                ElMessage.success(`订单id${idxId[0]}`+data.msg + '修改')
            } 
        })
    } 
    }
    collStatus.value = false
}
</script>

<style lang="css" scoped>
.inputSea{
    width: 30vh;
}
.button{
    background-color: skyblue;
}
.searchStyle{
    display: flex;
    
}
</style>
