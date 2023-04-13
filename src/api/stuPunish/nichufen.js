import request from '@/utils/request'

//违纪处分辅导员申请——新增
export function insertWjcfsq(query) {
  return request({
    url: '/rcswWjcf/importInsertWjcfsq',
    method: 'post',
    data: query
  })
}
//违纪处分辅导员申请详情
export function wjcfDetail(query) {
  return request({
    url: '/rcswWjcf/wjcfInfo',
    method: 'post',
    data: query
  })
}
//违纪处分辅导员申请列表
export function queryWjcfFdyList(query) {
  return request({
    url: '/rcswWjcf/queryWjcfFdyList',
    method: 'post',
    data: query
  })
}
//违纪处分辅导员申请删除
export function deleteWjcf(query) {
  return request({
    url: '/rcswWjcf/deletewjcfById',
    method: 'post',
    data: query
  })
}
//违纪处分辅导员申请提交审核
export function tjById(query) {
  return request({
    url: '/rcswWjcf/tjwjcfById',
    method: 'post',
    data: query
  })
}
//违纪处分辅导员申请撤回
export function cxById(query) {
  return request({
    url: '/rcswWjcf/wjcfcxById',
    method: 'post',
    data: query
  })
}

//学工部负责人修改
export function updateQgzxGw(query) {
  return request({
    url: '/rcswWjcf/updateXgbfzr',
    method: 'post',
    data: query
  })
}
//教师端-待审核列表
export function queryDshList(data) {
  return request({
    url: '/rcswWjcf/querywjcfFlowList',
    method: 'post',
    data: data
  })
}
//教师端-已审核列表
export function queryYshList(data) {
  return request({
    url: '/rcswWjcf/querywjcfFlowedList',
    method: 'post',
    data: data
  })
} 
//教师端-同意
export function tyFlow(data) {
  return request({
    url: '/rcswWjcf/tyFlow',
    method: 'post',
    data: data
  })
} 
//教师端-拒绝
export function jjFlow(data) {
  return request({
    url: '/rcswWjcf/jjFlow',
    method: 'post',
    data: data
  })
}
//退回操作
export function thFinal(query) {
  return request({
    url: '/rcswWjcf/htFlow',
    method: 'post',
    data: query
  })
}
//待审核列表导出
export function exportDsh(query) {
  return request({
    url: '/rcswWjcf/excelExportDsh',
    method: 'post',
    responseType: "blob",
    data: query
  })
}
//已处理列表导出
export function exportYsh(query) {
  return request({
    url: '/rcswWjcf/excelExportYsht',
    method: 'post',
    responseType: "blob",
    data: query
  })
}