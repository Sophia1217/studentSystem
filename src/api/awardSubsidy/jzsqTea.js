import request from '@/utils/request'

//教师端-待审核列表导出
export function exportDsh(query) {
  return request({
    url: '/rcswJzsq/excelExportRcswJzsqFlow',
    method: 'post',
    responseType:"blob",
    data: query
  })
}
//教师端-已处理列表导出
export function exportYsh(query) {
  return request({
    url: '/rcswJzsq/excelExportRcswJzsqFlowed',
    method: 'post',
    responseType:"blob",
    data: query
  })
}
//教师端-已审核列表查询
export function queryYshList(query) {
  return request({
    url: '/rcswJzsq/queryJzsqFlowedList',
    method: 'post',
    data: query
  })
}
//教师端-待审核列表查询
export function queryDshList(query) {
  return request({
    url: '/rcswJzsq/queryJzsqFlowList',
    method: 'post',
    data: query
  })
}
//同意操作
export function tyFlow(query) {
  return request({
    url: '/rcswJzsq/tyFlow',
    method: 'post',
    data: query
  })
}
//拒绝操作
export function jjFlow(query) {
  return request({
    url: '/rcswJzsq/jjFlow',
    method: 'post',
    data: query
  })
}
//退回操作
export function thFinal(query) {
  return request({
    url: '/rcswJzsq/htFlow',
    method: 'post',
    data: query
  })
}
//学生端教师端-奖助申请-详情查询
export function getDetail(query) {
  return request({
    url: '/rcswJzsq/queryJzsqDetail',
    method: 'post',
    data: query
  })
}





//教师端-评奖等级批量修改
export function pjdjUpdate(query) {
  return request({
    url: '/rcswPjpyFlow/teaUpdateByBatch',
    method: 'post',
    data: query
  })
}
//评奖评优-根据多个奖项获取等级
export function getPjdjByPjjx(query) {
  return request({
    url: '/rcswPjpyFlow/getPjdjByPjjx',
    method: 'post',
    data: query
  })
}
//教师端-页面单条数据新增
export function pjpyAdd(query) {
  return request({
    url: '/rcswPjpyFlow/importTeaInsertOne',
    method: 'post',
    data: query
  })
}
//教师端-导入
export function pjpyImport(query) {
  return request({
      url: '/rcswPjpyFlow/importExcel',
      method: 'post',
      data: query,
      responseType:'blob'
  })
}
 //教师端-模板下载
 export function mbDown(query) {
  return request({
    url: '/rcswPjpyFlow/downLoad',
    method: 'post',
    data: query,
    responseType:'blob'
  })
}














