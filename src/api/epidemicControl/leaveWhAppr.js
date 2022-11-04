import request from "@/utils/request.js"
//离汉申请列表查询
export function getQuerylist(query) {
  return request({
      url: '/yqgkLhsq/queryYqgkLhsqList',
      method: 'post',
      data: query
  })
}
//离汉详情
export function getDetail(query) {
  return request({
      url: '/yqgkLhsq/selectYqgkLhsqDetail',
      method: 'post',
      data: query
  })
}
//离汉列表导出
export function exp(query) {
  return request({
      url: '/yqgkLhsq/excelExport',
      method: 'post',
      data: query,
      responseType:'blob'
  })
}