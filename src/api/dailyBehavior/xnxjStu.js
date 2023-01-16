




import request from '@/utils/request'

//获取基本信息
export function getbascic(query) {
    return request({
      url: '/rcswXnxj/getXsJbxx',
      method: 'post',
      data: query
    })
  }
  
//学年小结列表
  export function queryList(query) {
    return request({
      url: '/rcswXnxj/queryXnxjList',
      method: 'post',
      data: query
    })
  }

//学年学期公共接口
  export function getXnxq(query) {
    return request({
      url: '/commonMethod/queryXn',
      method: 'post',
      data: query
    })
  }

//新增修改
export function edit(query) {
    return request({
      url: '/rcswXnxj/AddXnxj',
      method: 'post',
      data: query
    })
  }

  
  //提交
  export function tj(query) {
    return request({
      url: '/rcswXnxj/tjXnxjById',
      method: 'post',
      data: query
    })
  }


  //撤回
  export function back(query) {
    return request({
      url: '/rcswXnxj/XnxjcxById',
      method: 'post',
      data: query
    })
  }

   //删除
   export function del(query) {
    return request({
      url: '/rcswXnxj/deleteXnxj',
      method: 'post',
      data: query
    })
  }


  