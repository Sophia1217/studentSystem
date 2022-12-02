import request from '@/utils/request'

//火车乘车优惠待审核列表查询
export function queryDshList(data){
  return request({
    url: '/ChyhFlow/queryChyhFlowList',
    method: 'post',
    data: data
  })
}
//已处理列表查询
export function queryYshList(data){
  return request({
    url: '/ChyhFlow/queryChyhFlowedList',
    method: 'post',
    data: data
  })
}
//火车乘车优惠同意操作
export function tyFlow(data){
  return request({
    url: '/ChyhFlow/tyFlow',
    method: 'post',
    data: data
  })
}
//拒绝操作
export function jjFlow(data){
  return request({
    url: '/ChyhFlow/jjFlow',
    method: 'post',
    data: data
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
//乘车优惠根据选中节点退回
export function thFinal(query) {
  return request({
    url: '/ChyhFlow/htFlow',
    method: 'post',
    data: query
  })
}
//乘车优惠待审核列表导出
export function exportZjbbFlow(query) {
  return request({
    url: '/ChyhFlow/excelExportZjbbFlow',
    method: 'post',
    responseType:"blob",
    data: query
  })
}
//乘车优惠已处理列表导出
export function exportZjbbFlowed(query) {
  return request({
    url: '/ChyhFlow/excelExportZjbbFlowed',
    method: 'post',
    responseType:"blob",
    data: query
  })
}
//乘车优惠待审核详情基本信息
export function queryDshDetail(query) {
  return request({
    url: '/ChyhFlow/RcswChyhFlowInfo',
    method: 'post',
    data: query
  })
}
//乘车优惠待审核详情历史列表
export function queryDshDetailList(query) {
  return request({
    url: '/ChyhFlow/RcswChyhFlowInfoList',
    method: 'post',
    data: query
  })
}