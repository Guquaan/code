<template>
  <div class="operation">
    <span>操作</span>
    <el-button 
    icon="plus"
    size="small"
    style="width:3rem"
    @click="iscollAdd = true"
    >
    新增
  </el-button>
  <div>
    <el-select 
    name="模块"
    v-model="formData.module"
    :options="moduleData"
    size="small"
    style="width: 10rem"
    />
    <el-button type="primary" @click="formData.module = 'banner' ; formData.current = 1" size="small"> 重置</el-button>
  </div>
</div> 
<div>
<el-table 
    :data="setData"
    :key="formData.module"
>  
    <h4>模块表</h4>
    <el-table-column label="键值" prop="key" />
    <el-table-column label="类型" prop="type" />
    <el-table-column
     v-if="formData.module === 'eula'"
    label="答复" 
    class="module-column"
    :key="1"
    >
    <template #default="scope">
      <a :href="`${scope.row.value}`" target="_blank" >点击跳转</a>
    </template>
  </el-table-column>
    <el-table-column
     v-if = "formData.module === 'banner'"
    label="答复"
    class="module-column"
    :key="2"
    >
     <template #default="scope">
      {{ scope.row.value }}
     </template>
    </el-table-column>
    <el-table-column
     v-if = "formData.module === 'orderTips'"
    label="答复"
    class="module-column"
    :key="3"
    >
     <template #default="scope">
      <el-button size="small" @click="showAnser(scope.row.value)">点击</el-button>
     </template>
    </el-table-column>
        <el-table-column
     v-if = "formData.module === 'question'"
    label="答复"
    class="module-column"
    :key="4"
    >
     <template #default="scope">
      <el-button size="small" @click="showAnser(scope.row.value)">点击</el-button>
     </template>
    </el-table-column>
    <el-table-column
     v-if = "formData.module === 'serviceCode'"
    label="答复"
    class="module-column"
    :key="5"
    >
     <template #default="scope">
      <img :src="scope.row.value" style="width: 100%;" />
     </template>
    </el-table-column>
    <el-table-column label="管理员" prop="adminId">
      <template #default="scope">
        {{ scope.row.adminId || 'null' }}
      </template>
    </el-table-column>
    <el-table-column label="操作">
        <template #default="scope">
          <el-button 
          size="small"
          @click="updateMsg(scope.row)"
          type="primary"
          >更新</el-button>
        </template>
    </el-table-column>

</el-table>    
 <el-pagination 
    v-if="setData && setData.length > 0"
    v-model:page-size="formData.pageSize"
    v-model:current-page="formData.current"
    layout="total, prev, pager, next, jumper" 
    size="small"
    :total="total || 100"
    @size-change="handleSizeChange" 
    @current-change="handlePageChange"
    />
  </div>
  <!-- 控制答复信息 -->
   <el-dialog
   v-model="collAnser"
   style="width: 70%;">
    <div 
    v-if="formData.module === 'orderTips'"
    v-html="anser" ></div>
    <div v-if="formData.module === 'question'" class="popup-content">
      问题：{{anser.question}}<br/>
      <p>回答：  {{
          typeof anser?.answer === 'string'
            ? anser.answer.replace(/\[(\d+)\]/g, '\n[$1]')
            : (anser?.answer || '')
              }}
  </p>
    </div>
   </el-dialog>
<!-- 控制新增的弹窗 -->
  <el-dialog
  v-model="iscollAdd"
  title="新增配置信息"
  class="addStyle"
  >
  <input
  accept="image/*" 
   type="file"
   ref="fileInput"
  @change="handleFileSelect"
  v-if="formData.module === 'serviceCode'"
  />
  <br/>
  <el-select v-model="typeSelect" placeholder="类型" style="width: 10rem;">
    <el-option v-for="item in options" 
    :key="item.value"
    :label="item.label"
    :value="item.value" />
  </el-select>
  <div class="value" v-if="formData.module === 'eula'">
  <el-input v-model="valueInput" style="width: 20vh;" placeholder="请输入网址连接"/>
  </div>
  <div class="value" v-if="formData.module==='banner'">
    <el-input v-model="valueInput" style="width: 20vh; " placeholder="请输入value值"/>
  </div>
    <div class="value" v-if="formData.module==='question' || formData.module === 'orderTips'">
    <el-input v-model="valueInput" type="textarea" style="width: 50vh; " placeholder="请输入描述"/>
  </div>
  <br/>
  <img :src="iscollAdd ?imageUrl : ''" style="width: 70%;" v-if="formData.module === 'serviceCode'"/>
  <br/>
  <br/>
  <el-button @click="reset">取消</el-button>
  <el-button 
  v-if="formData.module === 'banner'||formData.module === 'eula'||formData.module === 'question' ||formData.module === 'orderTips'"
  @click="addSet(formData.module,typeSelect,valueInput)">创建</el-button>
  <el-button v-if="formData.module === 'serviceCode'" @click="addSet(formData.module,typeSelect,imageUrl)">创建</el-button>
  </el-dialog>
</template>

<script setup>
import {ref ,reactive, onMounted ,watch ,computed} from 'vue'
import { getSet , updateSet ,postSet ,imgPost} from '../../api'; 
import { ElMessage } from 'element-plus';
// 进行接口获取数据
const token = localStorage.getItem('token')

const formData = reactive({
    current:1,
    pageSize:10,
    module:'banner',
})
const total = ref()
// 控制选择信息
const moduleData = [
    {
      label:'eula',
      value:'eula',
    },
    {
      label:'旗帜',
      value:'banner',
    },
    {
      label:'订单提示',
      value:'orderTips'
    },
    {
      label:'问题',
      value:'question',
    },
    {
      label:'服务代号',
      value:'serviceCode'
    }
]
watch(()=>formData,()=>{getsetData()},{deep:true})
const setData = ref()

// 获取配置信息
const getsetData = () => {
  setData.value = [] // 先清空，防止闪现
  getSet({ 
    current: formData.current, 
    pageSize: formData.pageSize,
    module:formData.module 
  })
    .then(({ data }) => {
      if (data.code === 200) {
        // 动态获取外层唯一的键名
        const outerKey = Object.keys(data.data)[0];    
        setData.value = data.data[outerKey],
        total.value = data.total
      } else {
        // 接口返回错误时重置
        setData.value = []
      }
    })
    .catch(error => {
      setData.value = [] // 请求失败兜底
    });
}

onMounted(()=>{
    getsetData()
})

//控制懒加载页面输出
const currentPage = ref(1)
const handlePageChange = (page)=>{
    formData.current = page
    currentPage.value = page
    getsetData()
    
}
const handleSizeChange = (size) => {
  console.log('每页条数：', size);
  formData.pageSize = size; // 更新每页条数
  currentPage.value = 1; // 重置到第一页
  // loadData({ page: 1, pageSize: size });
};

//更新配置信息
const updateMsg = (data) =>{
  console.log(data.key)
  updateSet({key:data.key,value:2},{token:token}).then(({data})=>{
    if(data.code===200){
      ElMessage.success('更新'+data.msg)
    }else {
      ElMessage.error(data.msg)
    }
     getsetData()
  })
}

// 答复问题和订单提示信息显示
const collAnser = ref(false)
const anser = ref({})
const showAnser = (data) =>{

  collAnser.value = true
  if(formData.module === 'orderTips'){
    anser.value = data
  } else if(formData.module === 'question') {
    anser.value = JSON.parse(data)
  }  
  console.log(anser.value)
}
//新增
const iscollAdd = ref(false)
const options =[
  {
    label:'false',
    value:'0'
  },
  {
    label:'true',
    value:'1'
  }
]
const typeSelect = ref()

const valueInput = ref()

//新增事件
const addSet = (module,type,value) =>{
  if(module === '' || type === '' || value === ''){
    return ElMessage.error('填写信息为空或者不完整')
  }
  console.log(module,type,value)
  // 进行接口创建
  postSet({type:type,value:value,module:module}).then(({data})=>{
    if(data.code===200){
      ElMessage.success('添加'+data.msg) 
      getsetData()
    } else{
      ElMessage.error(data.msg)
    }
  })
  imageUrl.value = ''
  typeSelect.value = valueInput.value = null
  iscollAdd.value = false
}

const reset = () =>{
  iscollAdd.value = false
  imageUrl.value = ''
  typeSelect.value = valueInput.value = null
  iscollAdd.value = false
}

// 文件输入框引用
const fileInput = ref(null);
// 图片预览URL
const imageUrl = ref('');
// 处理文件选择
const handleFileSelect = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  // 验证是否为图片
  if (!file.type.startsWith('image/')) {
    alert('请选择图片文件');
    return;
  }
  
  // 读取文件并转换为图片文件，显示预览
  const reader = new FileReader();
  reader.onload = (event) => {
    imageUrl.value = event.target.result;
  };
  reader.readAsDataURL(file);
  imgPost({file:file},{token}).then(({data})=>{
    if(data.code === 200){
      ElMessage.success('上传'+data.msg)
    } else {
      ElMessage.error(data.msg)
    }
  })
  // 重置输入框，允许重复选择同一文件
  e.target.value = '';
};

</script>

<style lang="css" scoped>
.operation,.addStyle{
  display:flex ;
  flex-direction: column;
  gap: 1vh;
}

.module-column {
  transition: opacity 1s;
}
/* 利用Vue的v-if切换时的过渡类名 */
.v-enter-from, .v-leave-to {
  display: none;
}
.v-leave-active {
  position: absolute; /* 让旧列脱离文档流，避免占位 */
}

.popup-content {
  /* 核心：无论内容多特殊，强制换行 */
  word-break: break-all !important; 
  overflow-wrap: anywhere !important; 
  white-space: pre-wrap !important; 

  /* 限制容器最大高度 + 滚动（可选） */
  max-height: 50%;
  overflow-y: auto; 
}
.value{
  display: block;
  padding-top: 10px;
}
</style>