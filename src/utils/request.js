//拦截器的建立
import axios from 'axios'
import { ElMessage } from 'element-plus';
import { refreshtoken } from '../api/index'
const request = axios.create({
    baseURL:'https://api.dda.vyitec.com',
    timeout:10000,
    headers:{
        Accept: "application/json, text/plain, */*",
        'Content-Type': "application/json",
        token:localStorage.getItem('token')

    }
})


// 添加请求拦截器
request.interceptors.request.use(function (config)  {
    console.log('请求拦截器的config',config)
    // 在发送请求之前做些什么
    //获取之前缓存在浏览器上的token
    const token = localStorage.getItem('token')
    //对于不需要添加token
    const whiteUrl = [
      '/admin/login/validate', 
      '/admin/login/checkToken',
      '/admin/order/delete',
      '/admin/order/refund',
      '/admin/order/returnCoupon',
      '/admin/order/status',
    ]
    if(token&&!whiteUrl.includes(config.url)){
        config.headers['token'] = token
        console.log('对于需要token接口的token',config.url,token)
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    //接口异常的数据
    if(response.data.code === 512)
    {
        ElMessage.error(response.data.msg)
    }
    else if(response.data.code === 403) //token过期的，需要续约
    {
        ElMessage.error(response.data.msg)
        //过期先清除相应的token
        const token = localStorage.getItem('token')
        localStorage.removeItem('token')
        //对相应的token进行续约
      refreshtoken({token:token}).then(({data})=>{
      if(data.code === 200){
        ElMessage.success(data.msg)
        localStorage.setItem('token',token)
      } else if(data.code === 403){
        ElMessage.error(data.msg)
        console.log('调用的是request中的续约')
        localStorage.removeItem('token')
        window.location.href = '/#/login'
      }
    })
    }
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log('相应的error',error)
    return Promise.reject(error);
  });
export default request