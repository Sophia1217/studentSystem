import request from "@/utils/request.js"
//返汉申请列表查询
export function getQuerylist(query) {
  return request({
      url: '/yqgkFhsq/queryYqgkFhsqList',
      method: 'post',
      data: query
  })
}
//返汉详情
export function getDetail(query) {
  return request({
      url: '/yqgkFhsq/selectYqgkFhsqDetail',
      method: 'post',
      data: query
  })
}
//返汉列表导出
export function exp(query) {
  return request({
      url: '/yqgkFhsq/excelExport',
      method: 'post',
      data: query,
      responseType:'blob'
  })
}