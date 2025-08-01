// 进行组件通信
import { defineStore } from 'pinia'

//对外进行暴露数据

// 进行预订单数据生成列表
export const getFormData = defineStore('FormData',{
    //状态
    state:()=>({
        formData:null,
        orderData:null,
    }),
    //行为
    actions:{
        //设置
        setfromData(data){
            this.formData = data.formData
            this.orderData = data.orderData
        }
    }
})
