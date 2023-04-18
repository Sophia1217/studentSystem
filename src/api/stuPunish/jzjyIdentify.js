

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
  
//教师端-已处理列表
export function queryYclDbjz(query) {
    return request({
      url: '/rcswJzjyjd/queryYclDbjz',
      method: 'post',
     
      data: query
    })
  }