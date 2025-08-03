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
