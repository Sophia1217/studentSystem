

import request from '@/utils/request'





//教师端-待处理列表
export function queryDclDbjz(query) {
    return request({
      url: '/rcswJzjyjd/queryDclDbjz',
      method: 'post',
      
      data: query
    })
  }
  //教师端-待处理列表
export function excelExportRcswDbjzDcl(query) {
    return request({
      url: '/rcswJzjyjd/excelExportRcswDbjzDcl',
      method: 'post',
      responseType:'blob',
      data: query
    })
  }
  //教师端-yi处理列表导出
export function excelExportRcswDbjzYcl(query) {
  return request({
    url: '/rcswJzjyjd/excelExportRcswDbjzYcl',
    method: 'post',
    responseType:'blob',
    data: query
  })
}
//教师端-已处理列表
export function queryYclDbjz(query) {
    return request({
      url: '/rcswJzjyjd/queryYclDbjz',
      method: 'post',
     
      data: query
    })
  }
  //教师端-拒绝
export function jjFlow(query) {
  return request({
    url: '/rcswJzjyjd/jjFlow',
    method: 'post',
   
    data: query
  })
}
//根据选中节点退回
export function htFlow(query) {
  return request({
    url: '/rcswJzjyjd/htFlow',
    method: 'post',
   
    data: query
  })
}
//教师端-同意
export function tyFlow(query) {
  return request({
    url: '/rcswJzjyjd/tyFlow',
    method: 'post',
   
    data: query
  })
}



//矫正教育结果-详情
export function JzjyjdInfo(query) {
  return request({
    url: '/rcswJzjyjd/JzjyjdInfo',
    method: 'post',
   
    data: query
  })
}