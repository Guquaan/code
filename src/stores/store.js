// 进行组件通信
import { defineStore } from 'pinia'

//对外进行暴露数据

// 进行预订单数据生成列表
export const getFormData = defineStore('FormData',{
    //状态
    state:()=>({
        formData:null,
    }),
    //行为
    actions:{
        //设置
        setfromData(data){
            this.formData = data.formData
        }
    }
})

// 进行创建订单之后的列表
export const getorderData = defineStore('orderData',{
    // 状态
    state:()=>({
        orderData:null,
        // 控制是否创建
        collCreatList:false,
    }),
    //行为
    actions:{
        //获取数据
        setorderData(data){
            this.orderData = data.orderData
            this.collCreatList = data.collCreatList
        }
    }
})

// 实现面包屑功能
 export const selectMenu = defineStore('',{
    state:()=>({
        // 面包屑列表
        selectList:[],
    }),
    actions:{
        setselectList(data){
            
        }
    }
 })

//转换类型 
export const getType = (data) =>{
    const type = 
        {
            '1':'信息报错',
            '2':'系统报错'
        }
    return type[data] || '未知'
}

// 转换等级
export const getLevel = (data) =>{
    const level = {
        '1':'轻微',
        '2':'中等',
        '3':'严重'
    }
    return level[data] || '未知程度'
}

//转换状态
export const getStatus = (data)=>{
    const status = {
    '0':'未处理',
    '1':'处理中',
    } 
    return status[data] || '未知'
}