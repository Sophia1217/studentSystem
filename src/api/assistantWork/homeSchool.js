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
      url: '/fdyJxlx/importInsertJxlx',
      method: 'post',
      data: query
  })
}

//家校联系详情编辑
export function updateJxlxDetail(query) {
  return request({
      url: '/fdyJxlx/importUpdateJxlxDetail',
      method: 'post',
      data: query
  })
}
//家校联系列表导出
export function excelExport(query) {
  return request({
      url: '/fdyJxlx/excelExport',
      method: 'post',
      responseType: 'blob',
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
//家校联系学生查询
export function queryStuList(query) {
  return request({
      url: '/fdyCommon/queryStuList',
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


//参与人工号姓名模糊查询
export function getXmXgh(query) {
  return request({
      url: '/commonMethod/getXmXgh',
      method: 'post',
      data: query
  })
}