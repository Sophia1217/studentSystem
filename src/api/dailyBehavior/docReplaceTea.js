import request from '@/utils/request'

//证件补办待审核列表查询
export function queryZjbbFlowList(query) {
    return request({
      url: '/zjbbFlow/queryZjbbFlowList',
      method: 'post',
      data: query
    })
  }

  
  //证件补办已处理列表查询
export function queryZjbbFlowedList(query) {
    return request({
      url: '/zjbbFlow/queryZjbbFlowedList',
      method: 'post',
      data: query
    })
  }

  //根据选中节点退回
export function htFlow(query) {
  return request({
    url: '/zjbbFlow/htFlow',
    method: 'post',
    data: query
  })
}

//拒绝操作
export function jjFlow(query) {
  return request({
    url: '/zjbbFlow/jjFlow',
    method: 'post',
    data: query
  })
}
// 证件补办审核详情
export function queryZjbbFlowInfo(query) {
  return request({
    url: '/zjbbFlow/queryZjbbFlowInfo',
    method: 'post',
    data: query
  })
}

//同意操作
export function tyFlow(query) {
  return request({
    url: '/zjbbFlow/tyFlow',
    method: 'post',
    data: query
  })
}

//待审核列表导出
export function excelExportZjbbFlow(query) {
  return request({
    url: '/zjbbFlow/excelExportZjbbFlow',
    method: 'post',
    responseType:'blob',
    data: query
  })
}
////待审核列表导出
export function excelExportZjbbFlowed(query) {
  return request({
    url: '/zjbbFlow/excelExportZjbbFlowed',
    method: 'post',
    responseType:'blob',
    data: query
  })
}
//可退回列表查询
export function backFlow(query) {
  return request({
    url: '/zjbbFlow/queryNodeFlowed',
    method: 'get',
    params: query
  })
}
