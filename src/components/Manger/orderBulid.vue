<template>
<h4>预下单处理</h4>
{{ formData }}
{{ formData.recRef}} + {{ formData.senRef }}

<el-form
    ref="formRef"
    :model="formData"
    :rules="rules">
    <div class="main">
    <!-- 收件人的信息 -->
    <div class="left">
    <h4>收件人信息</h4>
    <el-form-item label="收件人详细地址:" prop="receiverAddress">
        <el-input v-model="formData.receiverAddress" style="width:40vh" size="small"/>
    </el-form-item>
    <el-form-item label="收件人电话:" prop="receiverMobile">
        <el-input v-model="formData.receiverMobile" style="width:40vh" size="small"/>
    </el-form-item>
    <el-form-item label="收件人姓名:" prop="receiverName">
        <el-input v-model="formData.receiverName" style="width:40vh" size="small"/>
    </el-form-item>
    <el-form-item label="收件人的所在地:" prop="recRef" >
    <el-cascader
      :options="address"
      v-model="formData.recRef"
      placeholder="所在地"
      size="small"
    />
    </el-form-item>
    </div>
    <!-- 发件人的信息 -->
    <div class="right">
    <h4>发件人信息</h4>
    <el-form-item label="发件人详细地址:" prop="senderAddress">
        <el-input v-model="formData.senderAddress" style="width:40vh" size="small" />
    </el-form-item>
    <el-form-item label="发件人电话:" prop="senderMobile">
        <el-input v-model="formData.senderMobile" style="width:40vh" size="small" />
    </el-form-item>
    <el-form-item label="发件人的名字:" prop="senderName">
        <el-input v-model="formData.senderName" style="width:40vh" size="small" />
    </el-form-item>
    <el-form-item label="发件人的所在地:" prop="senRef">
    <el-cascader
      :options="address"
      v-model="formData.senRef"
      placeholder="所在地"
      :value-on-clear="() => null"
      size="small"
    />
    </el-form-item>
    </div>
    </div>
    <!-- 快递数据 --> 
    <h4>快递数据信息</h4>
    <div class="express">
    <el-form-item label="物品类型:" prop="goods">
        <el-select 
        v-model="formData.goods" 
        style="width:10vh" 
        size="small" 
        placeholder="物品类型"
        >
        <el-option
        v-for="item in goodsOption"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
        </el-select>
    </el-form-item>
    <el-form-item label="包裹数量:" prop="packageCount">
        <el-input-number :min="1" v-model="formData.packageCount"  size="small" >
        <template #suffix>个</template>
        </el-input-number>
    </el-form-item>
    <el-form-item label="重量:" prop="weight" >
        <el-input v-model="formData.weight" style="width:12vh" size="small" placeholder="重量" disabled>
        <template #append>kg</template>
        </el-input>
    </el-form-item>
    <!-- <el-form-item label="长度:" prop="vLong">
        <el-input-number :min="0" v-model="formData.vLong" style="width:15vh" size="small" >
        <template #suffix>m/米</template>
        </el-input-number>
    </el-form-item>
    <el-form-item label="宽度:" prop="vWidth">
        <el-input-number :min="0" v-model="formData.vWidth" style="width:15vh" size="small" >
        <template #suffix>m/米</template>
        </el-input-number>
    </el-form-item>
    <el-form-item label="高度:" prop="vHeight">
        <el-input-number :min="0" v-model="formData.vHeight" style="width:15vh" size="small" >
        <template #suffix>m/米</template>
        </el-input-number>
    </el-form-item> -->
    <el-form-item label="物品数据:" prop="allData">
        <el-input v-model="formData.allData" size="small" placeholder="长度x宽度x高度" style="width:20vh">
            <template #suffix>m<sup>3</sup>/米<sup>3</sup></template>
        </el-input>
    </el-form-item>
    <el-form-item label="支付平台:" prop="platform">
        <el-select v-model="formData.platform" style="width:15vh" size="small" placeholder="支付方式">
        <el-option
        v-for="item in platformOption"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
        </el-select>
    </el-form-item>
    <el-form-item label="总类型:" prop="pdType">
        <el-input v-model="formData.pdType" style="width:5vh" size="small" />
    </el-form-item>
</div>
</el-form>
    <el-button @click="confirmOrder(formRef)">确认预下单</el-button>
    <el-button @click="reset(formRef)">重置数据</el-button>
<orderCreat
  v-model:collCreat="collCreat"
  v-model:returnData="returnData.value"
  @closeDialog="closeDialog"
/>
</template>

<script setup>
    import {ref ,reactive ,watch} from 'vue'
    import {useRouter} from 'vue-router'
    import orderCreat from '../Manger/orderCreate.vue'
    import { orderPrepare } from '../../api'
    import { ElMessage } from 'element-plus'
    import data from './address.json'
    import { getFormData } from '../../stores/store'
    const store = getFormData()
    //对表单数据进行初始化
    const formRef = ref()
    const formData = reactive({
        receiverAddress:'迪亚尔家是不是你家',
        receiverMobile:'13022047890',
        receiverName:'杨秀珍',
        receiverProvince:'',
        receiverCity:'',
        receiverDistrict:'',
        senderAddress:'洲心街道金茂家园一栋一楼100号商铺',
        senderMobile:'13022047890',
        senderName:'六小姐',
        senderProvince:'',
        senderCity:'',
        senderDistrict:'',
        goods:'',
        packageCount:Number(),
        get weight() {
        return this.vHeight * this.vLong * this.vWidth * 20
        },
        set weight(value) {
        // 保持API一致但不实际存储值,防止控制台重置数据的时候报错
        console.log(value)
        },
        vLong:Number(),
        vWidth:Number(),
        vHeight:Number(),
        allData:'',
        recRef:[],
        senRef:[],
        platform:'',
        pdType:'2',
    })
    const goodsOption = [
        {value:'服装',label:'服装'},
        {value:'日用品',label:'日用品'},
    ]
    const platformOption = [
    {value:'微信',value:'微信'},
    {value:'支付宝',value:'支付宝'}
    ]
    const address = data
    // 监听收件人的地区
    watch(() => formData.recRef , (data) => {
    if (Array.isArray(data) && data.length >= 3) {
        formData.receiverProvince = data[0]
        formData.receiverCity = data[1]
        formData.receiverDistrict = data[2]
    } else {
        formData.receiverProvince = ''
        formData.receiverCity = ''
        formData.receiverDistrict = ''
    }
    })
    // 监听发件人的数据
   watch(() => formData.senRef , (data) => {
    if (Array.isArray(data) && data.length >= 3) {
        formData.senderProvince = data[0]
        formData.senderCity = data[1]
        formData.senderDistrict = data[2]
    } else {
        formData.senderProvince = ''
        formData.senderCity = ''
        formData.senderDistrict = ''
    }
    })
    //监听物品的数据
    watch(()=>formData.allData,(data)=>{
        if((data.split('x')).length >= 3){
            formData.vLong = Number((data.split('x'))[0])
            formData.vWidth = Number((data.split('x'))[1])
            formData.vHeight = Number((data.split('x'))[2])
        } else {
            formData.vHeight = formData.vLong = formData.vWidth = null
        }
    })
    //控制子组件的显示
    const collCreat = ref(false)
    const returnData = reactive({})
    const closeDialog = () => {
    // 这里可以做弹窗关闭后的处理
    collCreat.value = false
    }
    //确认预下单
    //表单校验规则
    //电话号码校验规则
    const validatePhone = (rule , value, callback) => {
    //不能为空
    if (value === '') {
    callback(new Error('请输入电话号码'))
    } else {
     const phonereg = /^1(3[0-9]|4[01456789]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
     phonereg.test(value) ? callback() : callback(new Error('手机号码格式不对，请输入正确的手机号码'))
        }
    }
    // 对于物品数据的校验规则
    const validateData = (rule , value , callback) =>{
        //数据不能为空
        if(value === ''){
            callback(new Error('请输入物品的数据'))
        } else {
            const datareg = /^\s*(\d+(?:\.\d+)?)\s*[xX]\s*(\d+(?:\.\d+)?)\s*[xX]\s*(\d+(?:\.\d+)?)\s*$/
            datareg.test(value) ? callback() : callback(new Error('输入的格式不对，请重新输入'))
        }
    }
    const rules = reactive({
        receiverAddress:[{required:true,message:'请输入收件人的地址',trigger:'blur'}],
        receiverMobile:[{required:true,validator:validatePhone,trigger:'blur'}],
        receiverName:[{required:true,message:'请输入收件人的名字',trigger:'blur'}],
        senderAddress:[{required:true,message:'请输入发件人的地址',trigger:'blur'}],
        senderMobile:[{required:true,validator:validatePhone,trigger:'blur'}],
        senderName:[{required:true,message:'请输入发件人的名字',trigger:'blur'}],
        goods:[{required:true,message:'请输入物品类型',trigger:'change'}],
        packageCount:[{required:true,message:'请输入包裹总数量',trigger:'blur'}],
        weight:[{required:true,message:'请输入包裹重量',trigger:'blur'}],
        // vLong:[{required:true,message:'请输入包裹长度',trigger:'blur'}],
        // vWidth:[{required:true,message:'请输入包裹宽度',trigger:'blur'}],
        // vHeight:[{required:true,message:'请输入包裹高度',trigger:'blur'}],
        allData:[{required:true,validator:validateData,trigger:'blur'}],
        recRef:[{required:true,message:'请选择收件人的地区',trigger:'change'}],
        senRef:[{required:true,message:'请选择发件人的地区',trigger:'change'}]
    })

    // 提交预下单
    const confirmOrder = (formEl) =>{
        if(!formEl) return 
        formEl.validate((valid)=>{
            if(valid){
                // 有数据进行参数传递
                //传数据去后端接口
                // orderPrepare({...formData}).then((data)=>{
                //     console.log(data)
                // })
                returnData.value = [
                    {
                    ratio:12000,
                    calcFeeRule:"折扣0.89,单笔加收0",
                    calcFeeWeight:"1",
                    officialMoney:"13",
                    totalMoney:"11.57",
                    channelMoney:"11.57",
                    pdPlatform:"YD",
                    platformChannel:"10213",
                    orderFrom:"TEST",
                    pdCompanyId:1,
                    pdName:"顺丰标快(非标快原价)-限老户",
                    pdCompanyName:"顺丰",
                    pdCompanyAbbr:"SF",
                    },
                    {
                    ratio:6000,
                    calcFeeRule:"折扣0.71,单笔加收0",
                    calcFeeWeight:"1",
                    officialMoney:"10",
                    totalMoney:"7.10",
                    channelMoney:"7.10",
                    pdPlatform:"YD",
                    platformChannel:"10034",
                    orderFrom:"TEST",
                    pdCompanyId:2,
                    pdName:"德邦【P】-标准快递",
                    pdCompanyName:"德邦",
                    pdCompanyAbbr:"DOP",
                    },
                    {
                    ratio:6000,
                    calcFeeRule:"折扣0.71,单笔加收0",
                    calcFeeWeight:"1",
                    officialMoney:"14.0",
                    totalMoney:"9.940",
                    channelMoney:"9.940",
                    pdPlatform:"YD",
                    platformChannel:"10033",
                    orderFrom:"TEST",
                    pdCompanyId:2,pdName:"德邦【P】-360",
                    pdCompanyName:"德邦",
                    pdCompanyAbbr:"DOP",
                    },
                    {
                    ratio:8000,
                    calcFeeRule:"1-50公斤,价格5.34续1.1;",
                    calcFeeWeight:"1",
                    officialMoney:"8",
                    totalMoney:"5.34",
                    channelMoney:"5.34",
                    pdPlatform:"YD",
                    platformChannel:"10139",
                    orderFrom:"TEST",
                    pdCompanyId:6,
                    pdName:"圆通【BL】P-限重50KG",
                    pdCompanyName:"圆通",
                    pdCompanyAbbr:"YTO",
                    }]
                    //随机生成一个订单跟踪ID
                    for(let i = 0 ;i < returnData.value.length ;i++){
                        returnData.value = returnData.value.map((item, index) => ({
                        ...item,
                        trackId: `DDA202507060803106CV450${index}`
                        }))
                    }
                store.setfromData({
                    formData:formData,
                    orderData:returnData.value
                })
                console.log({...formData})
                collCreat.value = true
            }
        })
    }
    //重置数据
    const reset = (formEl)=>{
        if (!formEl) return
        formEl.resetFields()
    }
</script>

<style scoped>
.main{
    display: flex;              
    gap:  10vh;      
    padding: 10px 0; 
}
.express {
  display: flex;
  flex-wrap: wrap;
  gap: 1vh; 
}

.express .el-form-item {
  flex: 0 0 48%; 
  box-sizing: border-box;
}
</style>