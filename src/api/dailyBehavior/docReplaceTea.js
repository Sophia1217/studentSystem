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

  //火车乘车优惠根据选中节点退回
export function htFlow(query) {
  return request({
    url: '/ChyhFlow/htFlow',
    method: 'post',
    data: query
  })
}

//火车乘车优惠拒绝操作
export function jjFlow(query) {
  return request({
    url: '/ChyhFlow/jjFlow',
    method: 'post',
    data: query
  })
}
//火车乘车优惠详情基本信息
export function RcswChyhFlowInfo(query) {
  return request({
    url: '/ChyhFlow/RcswChyhFlowInfo',
    method: 'post',
    data: query
  })
}
//火车乘车优惠待审核详情历史列表
export function RcswChyhFlowInfoList(query) {
  return request({
    url: '/ChyhFlow/RcswChyhFlowInfoList',
    method: 'post',
    data: query
  })
}
//火车乘车优惠同意操作
export function tyFlow(query) {
  return request({
    url: '/ChyhFlow/tyFlow',
    method: 'post',
    data: query
  })
}

//火车乘车优惠待审核列表导出
export function excelExportZjbbFlow(query) {
  return request({
    url: '/ChyhFlow/excelExportZjbbFlow',
    method: 'post',
    responseType:'blob',
    data: query
  })
}
////火车乘车优惠待审核列表导出
export function excelExportZjbbFlowed(query) {
  return request({
    url: '/ChyhFlow/excelExportZjbbFlowed',
    method: 'post',
    responseType:'blob',
    data: query
  })
}
//可退回列表查询
export function backFlow(query) {
  return request({
    url: '/ChyhFlow/queryNodeFlowed',
    method: 'get',
    params: query
  })
}
