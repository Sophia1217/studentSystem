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
  export function updateQrztm(query) {
    return request({
      url: '/rcswWjcf/updateQrztm',
      method: 'post',
      
      data: query
    })
  }
 
  
//矫正教育鉴定审核_列表查询
  export function queryJdList(query) {
    return request({
      url: '/rcswJzjyjd/queryJdList',
      method: 'post',
      
      data: query
    })
  }
  
 // 矫正教育鉴定保存
  export function saveJd(query) {
    return request({
      url: '/rcswJzjyjd/saveJd',
      method: 'post',
      
      data: query
    })
  }
//矫正教育_录入_学生端列表
export function queryXSList(query) {
  return request({
    url: '/rcswJzjy/queryXSList',
    method: 'get',
    params: query
  })
}


 