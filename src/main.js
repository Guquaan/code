import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from '../src/routers/index'
import {refreshtoken} from './api/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

//路由守卫
router.beforeEach((to,from,next)=>{
    //获取之前缓存在浏览器上的token
    const token = localStorage.getItem('token')
    //没有token和页面不是登录页面
    if(!token&&to.path!=='/login'){
        next('/login')
    }
    //有token的情况下访问登录页面的情况
    else if(token&&to.path === '/login'){
        console.log('访问当前的页面是登陆页面',token)
        next()
    } 
    //有token访问其他页面的情况下
    else if(token && to.path === '/'){
        next('/orderBulid')
    } else {
        next()
    }
})

//引入路由
app.use(router)
//引入pinia
app.use(pinia)
app.use(ElementPlus)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.mount('#app')
