import request from '@/utils/request'

//大病救助减免申请-撤销
export function cxByIdJmsq(data) {
  return request({
    url: '/rcswDbjzsq/cxByIdDbjzjmsq',
    method: 'post',
    data: data
  })
}
//大病救助申请-撤销
export function cxByIdJzsq(data) {
  return request({
    url: '/rcswDbjzsq/cxByIdDbjzsq',
    method: 'post',
    data: data
  })
}
//大病救助还款记录-删除
export function deleteHkjl(data) {
  return request({
    url: '/rcswDbjzsq/deleteDbjzhkjl',
    method: 'post',
    data: data
  })
}
//大病救助减免申请-删除
export function deleteJmsq(data) {
  return request({
    url: '/rcswDbjzsq/deleteDbjzjmsq',
    method: 'post',
    data: data
  })
}
//大病救助申请-删除
export function deleteJzsq(data) {
  return request({
    url: '/rcswDbjzsq/deleteDbjzsq',
    method: 'post',
    data: data
  })
}
//大病救助还款记录-新增或修改
export function importHkjl(data) {
  return request({
    url: '/rcswDbjzsq/importRcswDbjzhkjl',
    method: 'post',
    data: data
  })
}
//大病救助减免申请-新增或修改
export function importJmsq(data) {
  return request({
    url: '/rcswDbjzsq/importRcswDbjzjmsq',
    method: 'post',
    data: data
  })
}
//大病救助申请-新增或修改
export function importJzsq(data) {
  return request({
    url: '/rcswDbjzsq/importRcswDbjzsq',
    method: 'post',
    data: data
  })
}
//根据大病救助id查询还款记录-列表查询
export function queryHkjlList(data) {
  return request({
    url: '/rcswDbjzsq/queryDbjzhkjlList',
    method: 'get',
    params: data
  })
}
//根据大病救助申请id查询减免申请-列表查询
export function queryJmsqList(data) {
  return request({
    url: '/rcswDbjzsq/queryDbjzjmsqList',
    method: 'get',
    params: data
  })
}
//大病救助申请-列表查询
export function queryJzsqList(data) {
  return request({
    url: '/rcswDbjzsq/queryDbjzsqList',
    method: 'get',
    params: data
  })
}
//大病救助减免申请-提交
export function tjJmsq(data) {
  return request({
    url: '/rcswDbjzsq/tjByIdDbjzjmsq',
    method: 'post',
    data: data
  })
}
//大病救助申请-提交
export function tjJzsq(data) {
  return request({
    url: '/rcswDbjzsq/tjByIdDbjzsq',
    method: 'post',
    data: data
  })
}




























//毕业生待确认_列表导出
export function exportBysDqr(query) {
  return request({
    url: '/xsBysmd/printByEasyExcelBysmdDqrList',
    method: 'post',
    data: query,
    responseType: 'blob'
  })
}