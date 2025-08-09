import {createRouter , createWebHashHistory} from 'vue-router'
import Login from '../components/login/index.vue'
import Home from '../components/home/index.vue'
import Order from '../components/order/index.vue'
import OrderBulid from '../components/Manger/orderBulid.vue'
import OrderList from '../components/Manger/orderList.vue'
import MassageCenter from '../components/Massage/MassageCenter.vue'
import SetList from '../components/Setting/setList.vue'
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
                meta:{name:'订单管理'}
            },
            {
                path:'/orderBulid',
                component:OrderBulid,
                meta:{name:'预下单创建'}
            },
            {
                path:'/orderList',
                component:OrderList,
                meta:{name:'预下单列表'}
            },
            {
                path:'/massagecenter',
                component:MassageCenter,
                meta:{name:'信息中心',}
            },
            {
                path:'/setlist',
                component:SetList,
                meta:{name:'配置信息'}
            }

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