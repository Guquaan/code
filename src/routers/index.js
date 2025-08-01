import {createRouter , createWebHashHistory} from 'vue-router'
import Login from '../components/login/index.vue'
import Home from '../components/home/index.vue'
import Order from '../components/order/index.vue'
import OrderBulid from '../components/Manger/orderBulid.vue'
import OrderList from '../components/Manger/orderList.vue'
const routes = [
    {
        path:'/login',
        component:Login,
    },
    {
        path:'/', 
        component:Home,
        meta:{name:'控制页面'},
        children:[
            {
                path:'/order',
                component:Order,
                meta:{}
            },
            {
                path:'/orderBulid',
                component:OrderBulid,
                meta:{}
            },
            {
                path:'/orderList',
                component:OrderList,
                meta:{}
            },
        ]
       
    }
]

const router  = createRouter({
    //路由数据
    routes,
    //匹配规则
    history:createWebHashHistory(),
})

//向外暴露
export default router