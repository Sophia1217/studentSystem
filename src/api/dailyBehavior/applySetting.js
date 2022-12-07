

import request from '@/utils/request'

//申请开关列表
export function querySqkgList(query) {
    return request({
      url: '/rcswSqkg/querySqkgList',
      method: 'post',
      data: query
    })
  }
  
//申请其他设置
  export function updateQt(query) {
    return request({
      url: '/rcswSqkg/updateQt',
      method: 'post',
      data: query
    })
  }
  

//申请开关时间设置
  export function updateSqkgsjsz(query) {
    return request({
      url: '/rcswSqkg/updateSqkgsjsz',
      method: 'post',
      data: query
    })
  }
