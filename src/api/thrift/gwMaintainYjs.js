import request from '@/utils/request'

//研究生三助岗位维护_列表查询
export function queryYjsGwList(data) {
  return request({
    url: '/qgzxGwwh/queryQgzxGwwhYjsszList',
    method: 'post',
    data: data
  })
}
//研究生三助岗位维护_列表更新需求人数
export function updateNzxsrs(data) {
  return request({
    url: '/qgzxGwwh/updateNzxsrsYjssz',
    method: 'post',
    data: data
  })
}

// 岗位维护研究生三助_列表导出
export function exportGwwhYjsList(query) {
  return request({
    url: '/qgzxGwwh/excelExportQgzxGwYjsList',
    method: 'post',
    responseType: "blob",
    data: query
  })
}