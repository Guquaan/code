import request from '../utils/request'

//登陆
export const login = (data)=>{
    return request.post('/admin/login/validate',data)
}
// token过期校验的api
export const refreshtoken = (data)=>{
  return request.post('/admin/login/checkToken',data)
}

//订单列表
export const orderList = (data,params)=>{
  return request.post('/admin/order/list',data,{params})
}

// 删除订单
export const orderdel = (data)=>{
  return request.post('/admin/order/delete',data)
}

//退款功能
export const refund = (data)=>{
  return request.post('/admin/order/refund',data)
}

// 取消订单
export const cancelorder = (data,params)=>{
  return request.post('/admin/order/cancel',data,{params})
}

// 查询快递轨迹
export const ordertrace = (data,params)=> {
  return request.post('/admin/order/trace',data,{params})
}

//实现优惠券退款
export const returnCoupon = (data)=>{
  return request.post('/admin/order/returnCoupon', data)
}

//改变订单状态
export const statusChange = (data) =>{
  return request.post('/admin/order/status',data)
}

//订单预下单
export const orderPrepare = (data) =>{
  return request.post('/admin/payorder/prepare',data)
}

//订单创建
export const orderCreate = (data) =>{
  return request.post('/admin/payorder/create',data)
}

// 绑定下单图片
export const orderImg = (data,params) =>{
  return request.post('/admin/payorder/bindPhoto', data,{params})
}

// 预定单订单详细
export const orderDetail = (data) =>{
  return request.post('admin/payorder/detail',data)
}

//重新补差或支付
export const repayOrder = (data) =>{
  return request.post('/admin/payorder/repay',data)
}

// 信息中心更新状态
export const statusUpdate = (data ,params) =>{
  return request.post('/admin/msg/update' ,data,{params})
}

// 获取消息列表
export const msgGet = (data,params) =>{
  return request.post('/admin/msg/get',data,{params})
}

// 获取配置信息
export const getSet = (data) =>{
  return request.post('/admin/setting/get',data)
}

// 更新配置信息
export const updateSet = (data ,params) =>{
  return request.post('/admin/setting/update',data ,{params})
}

//新增配置信息
export const postSet = (data,params) =>{
  return request.post('/admin/setting/post',data, {params})
}

//上传图片
export const imgPost = (data, params) =>{
  return request.post('/admin/setting/uploadFile' , data, {params})
}