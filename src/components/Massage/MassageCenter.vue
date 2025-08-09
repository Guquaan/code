<template>
    <el-form v-model="formData" ref="formRef" class="formstyle">
        <el-form-item label="状态:">
            <el-select 
            prop="status"
            v-model="formData.status"
            placeholder="请选择" 
            size="small"
            style="width: 10rem ;"
            :options="status"/>
        </el-form-item>
        <el-form-item label="类型:">
            <el-select 
            prop="type"
            v-model="formData.type"
             placeholder="请选择" 
             size="small"
             style="width: 10rem"
             :options="type"/>
        </el-form-item>
        <el-form-item label="等级:">
            <el-select 
            prop="level"
            v-model="formData.level"
             placeholder="请选择" 
             size="small"
             style="width: 10rem" 
             :options="level"/>
            
        </el-form-item>
    </el-form>
    <el-table :data="returnData" size="small">
        <el-table-column label="id" prop="id" />
        <el-table-column label="类型" prop="type" />
        <el-table-column label="等级" prop="level" />
        <el-table-column label="状态" prop="status" />
        <el-table-column label="业务模块名称" prop="reportModule" />
        <el-table-column label="具体错误发生的功能点" prop="errorModule" />
        <el-table-column label="进程管理员Id" prop="" >
            <template #default="scope">
            {{scope.row.processAdminId || 'null'}}
        </template>
        </el-table-column>
        <el-table-column label="进程描述" prop="">
        <template #default="scope">
            {{scope.row.processDesc || 'null'}}
        </template>
        </el-table-column>
        <el-table-column label="进程管理员Id" prop="" >
            <template #default="scope">
            {{scope.row.processAdminId || 'null'}}
        </template>
        </el-table-column>
        <el-table-column label="过程时间" prop="" >
            <template #default="scope">
            {{scope.row.processAt || 'null'}}
        </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createAt" />
        <el-table-column label="错误信息" >
            <template #default="scope">
            <div style="display: flex;">
            <el-button 
            link
            size="small"
             type="primary"
             @click="showData(scope.row.errorMsg)">显示信息</el-button>
             <el-button 
             link
             type="primary"
             
             @click="getstatus(scope.row)"
             size="small"
             >处理</el-button>
            </div>
        </template>
        </el-table-column>    
        </el-table>
            <el-pagination 
            v-model:page-size="formData.pageSize"
            v-model:current-page="formData.current"
            layout="total, sizes, prev, pager, next, jumper" 
            size="small"
            :total="total || 100"
            @size-change="handleSizeChange" 
            @current-change="handlePageChange"
    />
    <!-- {{ returnData }} -->

    <el-dialog 
    v-model="showError"
    title="错误信息"
    >
    <template v-if="msgData.trackId">
        错误信息id:{{ msgData.trackId }}<br/><br/>
        现在状态：{{ msgData.nowStatus }}<br/><br/>
        保存状态：{{ msgData.toStatus }}<br/><br/>
        支付id：{{ msgData.payId || 'null' }}
    </template>
    <template v-else>
        {{ msgData }}
    </template>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted, reactive ,watch} from 'vue'
import { statusUpdate, msgGet } from '../../api/index'
import { getType , getLevel , getStatus  } from '../../stores/store'
import { ElMessage } from 'element-plus'

//获取token
const token = localStorage.getItem('token')

//接口数据
const formRef = ref()
const formData = reactive({
    current:1,
    pageSize:10,
    status: '1',
    type:'1',
    level:'1',
})
const level = [
    {
        label:'轻微',
        value:'1',
    },
    {
        label:'中等',
        value:'2',
    },
    {
        label:'严重',
        value:'3',
    }
]
const type = [
    {
        label:'系统报错',
        value:'0',
    },
    {
        label:'信息报错',
        value:'1',
    },
]


const status = [
    {
        label:'未处理',
        value:'0',
    },
    {
        label:'处理中',
        value:'1'
    }
]


const total = ref()
//获取返回的数据
const returnData = ref()
//向接口进行请求
const getstatus = (data) => {
    if(data.status === '处理中'){
         statusUpdate({ id:data.id, status: '1', processDesc: '已修复bug' }, { token: token }).then(({ data }) => {
          if(data.code === 200){
            ElMessage.success('处理' + data.msg)
            getmassage()
          }
     })
    }else if(data.status === '未处理') {
        statusUpdate({ id: id, status: '0', processDesc: '已修复bug' }, { token: token }).then(({ data }) => {
          if(data.code === 200){
            ElMessage.success('处理' + data.msg)
            getmassage()
          }
     })
    }
     
}
//获取消息列表
const getmassage = () => {
    msgGet({current:formData.current,pageSize:formData.pageSize,
        status:formData.status,
        type:formData.type,
        level:formData.level
    },{token:token}).then(({ data }) => {
        if(data.code === 200){
        returnData.value = data.data
        total.value = data.total
        for(let i = 0;i <returnData.value.length; i++){
            returnData.value[i].type = getType(returnData.value[i].type)
            returnData.value[i].level = getLevel(returnData.value[i].level)
            returnData.value[i].status = getStatus(returnData.value[i].status)
        }
        } else if(data.code === 430){
            ElMessage.error(data.msg)
        }
    })
}
watch(()=>formData,()=>{getmassage()},{deep:true})
onMounted(() => {
    getmassage()
})

const showError = ref(false)
const msgData = ref()
const showData = (data) =>{
    showError.value = !showError.value
    console.log(data)
    try{
        msgData.value = JSON.parse(data)
    } catch (e){
        msgData.value = data
    }
    
    
}
//控制懒加载页面输出
const handlePageChange = (page)=>{
    formData.current = page
    formData.current = page
    getmassage()
    
}
const handleSizeChange = (size) => {
  console.log('每页条数：', size);
  pageSize.value = size; // 更新每页条数
  formData.current = 1; // 重置到第一页
  // loadData({ page: 1, pageSize: size });
};
</script>

<style scoped>
.formstyle{
    display: flex;
}
</style>