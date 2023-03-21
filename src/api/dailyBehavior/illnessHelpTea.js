import request from '@/utils/request'

//教师端-待审核列表
export function queryDshList(data){
  return request({
    url: '/rcswDbjzsq/queryDshDbjz',
    method: 'post',
    data: data
  })
}
//教师端-已审核列表
export function queryYshList(data){
  return request({
    url: '/rcswDbjzsq/queryYshDbjz',
    method: 'post',
    data: data
  })
}
//教师端-同意
export function tyFlow(data){
  return request({
    url: '/rcswDbjzsq/tyFlow',
    method: 'post',
    data: data
  })
}
//教师端-拒绝
export function jjFlow(data){
  return request({
    url: '/rcswDbjzsq/jjFlow',
    method: 'post',
    data: data
  })
}
//根据选中节点退回
export function thFinal(query) {
  return request({
    url: '/rcswDbjzsq/htFlow',
    method: 'post',
    data: query
  })
}
//待审核列表导出
export function exportDsh(query) {
  return request({
    url: '/rcswDbjzsq/excelExportRcswDbjzDsh',
    method: 'post',
    responseType:"blob",
    data: query
  })
}
//乘车优惠已处理列表导出
export function exportYsh(query) {
  return request({
    url: '/rcswDbjzsq/excelExportRcswDbjzYsh',
    method: 'post',
    responseType:"blob",
    data: query
  })
}
//教师端-已审核新增
export function addFlow(data){
  return request({
    url: '/rcswDbjzsq/importRcswDbjzjmFlowsq',
    method: 'post',
    data: data
  })
}


