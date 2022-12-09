import request from '@/utils/request'

//住宿申请待审核列表查询
export function queryDshList(data){
  return request({
    url: '/rcswZssq/queryZssqFlowList',
    method: 'post',
    data: data
  })
}
//已处理列表查询
export function queryYshList(data){
  return request({
    url: '/rcswZssq/queryZssqFlowedList',
    method: 'post',
    data: data
  })
}
//住宿申请同意操作
export function tyFlow(data){
  return request({
    url: '/rcswZssq/tyFlow',
    method: 'post',
    data: data
  })
}
//住宿申请拒绝操作
export function jjFlow(data){
  return request({
    url: '/rcswZssq/jjFlow',
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
//住宿申请根据选中节点退回
export function thFinal(query) {
  return request({
    url: '/rcswZssq/htFlow',
    method: 'post',
    data: query
  })
}
//住宿申请待审核详情基本信息
export function queryDshDetail(query) {
  return request({
    url: '/rcswZssq/queryZssqFlowDetail',
    method: 'post',
    data: query
  })
}
//住宿申请待审核列表导出
export function exportZjbbFlow(query) {
  return request({
    url: '/rcswZssq/excelExportRcswZssqFlow',
    method: 'post',
    responseType:"blob",
    data: query
  })
}
//住宿申请已处理列表导出
export function exportZjbbFlowed(query) {
  return request({
    url: '/rcswZssq/excelExportRcswZssqFlowed',
    method: 'post',
    responseType:"blob",
    data: query
  })
}

//教师端-住宿申请-后勤负责人-新增修改楼栋房间信息
export function updateZssqFlow(query) {
  return request({
    url: '/rcswZssq/updateZssqFlow',
    method: 'post',
    data: query
  })
}
