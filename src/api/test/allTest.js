

import request from "@/utils/request.js"
//综合测评设置
  export function getFdycpZhcpSz(query) {
    return request({
        url: '/fdycpZhcp/getFdycpZhcpSz',
        method: 'get',
        params: query
    })
  }


  //更新时间
  export function updateTime(query) {
    return request({
        url: '/fdycpZhcp/getGxsj',
        method: 'get',
        params: query
    })
  }
  

  //更新列表
  export function updateList(query) {
    return request({
        url: '/fdycpZhcp/updateZhcpList',
        method: 'get',
        params: query
    })
  }


  
//综合测评list
  export function queryZhcpList(query) {
    return request({
        url: '/fdycpZhcp/queryZhcpList',
        method: 'post',
        data: query
    })
  }
  
  //综合测评设置update
  export function updateFdycpZhcpSz(query) {
    return request({
        url: '/fdycpZhcp/updateFdycpZhcpSz',
        method: 'post',
        data: query
    })
  }
 
 
    
//导出
export function exp(query) {
  return request({
      url: '/fdycpZhcp/printByEasyExcelDwjdList',
      method: 'post',
      data: query,
      responseType:'blob'
  })
}