import request from '@/utils/request'

//教师端-待审核列表
export function queryDshList(data) {
  return request({
    url: '/rcswJqlxlx/queryLxlxsqFlowList',
    method: 'post',
    data: data
  })
}
//教师端-已审核列表
export function queryYshList(data) {
  return request({
    url: '/rcswJqlxlx/queryLxlxsqFlowedList',
    method: 'post',
    data: data
  })
}
//教师端-同意
export function tyFlow(data) {
  return request({
    url: '/rcswJqlxlx/tyFlow',
    method: 'post',
    data: data
  })
}
//教师端-拒绝
export function jjFlow(data) {
  return request({
    url: '/rcswJqlxlx/jjFlow',
    method: 'post',
    data: data
  })
}
//待审核列表导出
export function exportDsh(query) {
  return request({
    url: '/rcswJqlxlx/excelExportDsh',
    method: 'post',
    responseType: "blob",
    data: query
  })
}
//已处理列表导出
export function exportYsh(query) {
  return request({
    url: '/rcswJqlxlx/excelExportYsht',
    method: 'post',
    responseType: "blob",
    data: query
  })
}



//假期留校维护_未知状态列表
export function queryYtxxsList(data) {
  return request({
    url: '/rcswJqlxlx/queryYtxxsList',
    method: 'post',
    data: data
  })
}

//假期留校维护_留校申请列表
export function queryLiuxList(data) {
  return request({
    url: '/rcswJqlxlx/queryLiuxList',
    method: 'post',
    data: data
  })
}
//假期留校维护_离校申请列表返回
export function queryLixList(data) {
  return request({
    url: '/rcswJqlxlx/queryLixList',
    method: 'post',
    data: data
  })
}
//假期留校维护_留校申请列表导出
export function exportLiux(query) {
  return request({
    url: '/rcswJqlxlx/excelExportLiuxList',
    method: 'post',
    responseType: "blob",
    data: query
  })
}
//假期留校维护_离校申请列表导出
export function exportLix(query) {
  return request({
    url: '/rcswJqlxlx/excelExportLixList',
    method: 'post',
    responseType: "blob",
    data: query
  })
}
//假期留校维护_未知状态列表导出
export function exportYtxxs(query) {
  return request({
    url: '/rcswJqlxlx/excelExportYtxxsList',
    method: 'post',
    responseType: "blob",
    data: query
  })
}
//假期留校维护_应填写学生参数设置
export function setYtxxs(data) {
  return request({
    url: '/rcswJqlxlx/ytxxscssz',
    method: 'post',
    data: data
  })
}
//假期留校维护_应填写学生参数设置详情
export function setYtxxsDetail(data) {
  return request({
    url: '/rcswJqlxlx/ytxxscsszInfo',
    method: 'post',
    data: data
  })
}






