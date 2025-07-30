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