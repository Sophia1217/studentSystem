import request from '@/utils/request'

//教师端-待审核列表
export function queryDshList(data) {
  return request({
    url: '/jsxwc/queryJsxwcFlowList',
    method: 'post',
    data: data
  })
}
//教师端-已审核列表
export function queryYshList(data) {
  return request({
    url: '/jsxwc/queryJsxwcFlowedList',
    method: 'post',
    data: data
  })
}
//教师端-同意
export function tyFlow(data) {
  return request({
    url: '/jsxwc/tyFlow',
    method: 'post',
    data: data
  })
}
//教师端-拒绝
export function jjFlow(data) {
  return request({
    url: '/jsxwc/jjFlow',
    method: 'post',
    data: data
  })
}
//待审核列表导出
export function exportDsh(query) {
  return request({
    url: '/jsxwc/excelExportDsh',
    method: 'post',
    responseType: "blob",
    data: query
  })
}
//已处理列表导出
export function exportYsh(query) {
  return request({
    url: '/jsxwc/excelExportYcl',
    method: 'post',
    responseType: "blob",
    data: query
  })
}

//教授下午茶-已处理撤回
export function chbyId(data) {
  return request({
    url: '/jsxwc/chbyId',
    method: 'post',
    data: data
  })
}
//经费维护-列表查询
export function queryMoneyList(data) {
  return request({
    url: '/jsxwc/queryJsxwcJfwhList',
    method: 'post',
    data: data
  })
}
//教授下午茶经费维护
export function updateMoney(data) {
  return request({
    url: '/jsxwc/jsxwcJfwhbyId',
    method: 'post',
    data: data
  })
}










