import request from '@/utils/request'





//学生处分-学生列表
export function queryXscfList(query) {
    return request({
      url: '/rcswWjcf/queryXscfList',
      method: 'post',
      
      data: query
    })
  }
  
 //修改处分结果
export function updateCfjg(query) {
    return request({
      url: '/rcswWjcf/updateCfjg',
      method: 'post',
      
      data: query
    })
  }
 
  //修改矫正状态
export function updateJzztm(query) {
    return request({
      url: '/rcswWjcf/updateJzztm',
      method: 'post',
      
      data: query
    })
  }
 
