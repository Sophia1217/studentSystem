import request from '@/utils/request'

//教师端-待审核列表导出
export function exportDsh(query) {
  return request({
    url: '/rcswJtknKnsq/excelExportTodo',
    method: 'post',
    responseType:"blob",
    data: query
  })
}
//教师端-已处理列表导出
export function exportYsh(query) {
  return request({
    url: '/rcswJtknKnsq/excelExportDone',
    method: 'post',
    responseType:"blob",
    data: query
  })
}
//教师端-已审核列表查询
export function queryYshList(query) {
  return request({
    url: '/rcswJtknKnsq/doneList',
    method: 'post',
    data: query
  })
}
//教师端-待审核列表查询
export function queryDshList(query) {
  return request({
    url: '/rcswJtknKnsq/toDoList',
    method: 'post',
    data: query
  })
}
//同意操作
export function tyFlow(query) {
  return request({
    url: '/rcswJtknKnsq/directAgreeJtkn',
    method: 'post',
    data: query
  })
}
//教师端-批量审核/单个审核
export function tyBatchFlow(query) {
  return request({
    url: '/rcswJtknKnsq/batchAgreeJtkn',
    method: 'post',
    data: query
  })
}

//拒绝操作
export function jjFlow(query) {
  return request({
    url: '/rcswJtknKnsq/rejectJtkn',
    method: 'post',
    data: query
  })
}
//退回操作
export function thFinal(query) {
  return request({
    url: '/rcswJtknKnsq/rebackJtkn',
    method: 'post',
    data: query
  })
}
//教师端-详情查询
export function queryDshDetail(query) {
  return request({
    url: '/rcswJtknKnsq/queryDetail',
    method: 'post',
    data: query
  })
}
//教师端-删除
export function del(query) {
  return request({
    url: '/rcswJtknKnsq/delete',
    method: 'post',
    data: query
  })
}
 //教师端-模板下载
 export function mbDown(query) {
  return request({
    url: '/rcswJtknKnsq/downLoad',
    method: 'post',
    data: query,
    responseType:'blob'
  })
}
//教师端-导入
export function jtknImport(query) {
  return request({
      url: '/rcswJtknKnsq/import',
      method: 'post',
      data: query,
      responseType:'blob'
  })
}
//教师端-评奖评优-新增
export function jtknAdd(query) {
  return request({
    url: '/rcswJtknKnsq/importInsertJtknKnssq',
    method: 'post',
    data: query
  })
}















