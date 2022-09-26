import request from "@/utils/request.js"
//家校联系列表查询
export function queryJxlxList(query) {
  return request({
      url: '/fdyJxlx/queryJxlxList',
      method: 'post',
      data: query
  })
}
//家校联系详情展示
export function selectJxlxDetail(query) {
  return request({
      url: '/fdyJxlx/selectJxlxDetail',
      method: 'post',
      data: query
  })
}
//家校联系新增联系
export function insertJxlx(query) {
  return request({
      url: '/fdyJxlx/insertJxlx',
      method: 'post',
      data: query
  })
}


//家校联系详情编辑
export function updateJxlxDetail(query) {
  return request({
      url: '/fdyJxlx/updateJxlxDetail',
      method: 'post',
      data: query
  })
}
//家校联系列表导出
export function excelExport(query) {
  return request({
      url: '/fdyJxlx/excelExport',
      method: 'post',
      data: query
  })
}
//家校联系列表删除
export function deleteJxlx(query) {
  return request({
      url: '/fdyJxlx/deleteJxlx',
      method: 'post',
      data: query
  })
}


//省市区列表查询
export function getCityList(query) {
  return request({
      url: '/commonMethod/getCityList',
      method: 'post',
      data: query
  })
}