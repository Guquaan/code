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
export const cancelorder = (data,parms)=>{
  return request.post('/admin/order/cancel',data,{parms})
}
