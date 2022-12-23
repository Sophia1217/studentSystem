import request from '@/utils/request'

//学期注册列表查询
export function queryXqzcList(data){
  return request({
    url: '/rcswXqzc/queryXqzcList',
    method: 'post',
    data: data
  })
}
//学期未注册详情基本信息
export function queryXqzcDetail(query) {
  return request({
    url: '/rcswXqzc/queryXqzcDetail',
    method: 'post',
    data: query
  })
}
//学期未注册列表导出
export function exportXqzcUnReg(query) {
  return request({
    url: '/rcswXqzc/excelExportRcswXqzcUnReg',
    method: 'post',
    responseType:"blob",
    data: query
  })
}
//学期已注册列表导出
export function exportXqzcReg(query) {
  return request({
    url: '/rcswXqzc/excelExportRcswXqzcReg',
    method: 'post',
    responseType:"blob",
    data: query
  })
}
// 学期注册-修改(新增)
export function zcFlow(data){
  return request({
    url: '/rcswXqzc/importXqzc',
    method: 'post',
    data: data
  })
}
