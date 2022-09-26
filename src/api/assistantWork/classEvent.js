import request from "@/utils/request.js"
//家校联系列表查询
export function queryFdyBthdList(query) {
  return request({
      url: '/fdyBthd/queryFdyBthdList',
      method: 'post',
      data: query
  })
}
//班团活动详情查询
export function queryFdyBthdById(query) {
  return request({
      url: '/fdyBthd/queryFdyBthdById',
      method: 'get',
      params: query
  })
}
//班团活动新增修改
export function insertFdyBthd(query) {
  return request({
      url: '/fdyBthd/insertFdyBthd',
      method: 'post',
      data: query
  })
}
//班团活动列表导出
export function excelFdyBthd(query) {
  return request({
      url: '/fdyBthd/excelFdyBthd',
      method: 'post',
      responseType: 'blob',
      data: query
  })
}
//班团活动列表删除
export function deleteFdyBthd(query) {
  return request({
      url: '/fdyBthd/deleteFdyBthd',
      method: 'post',
      data: query
  })
}