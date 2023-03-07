import request from '@/utils/request'

//勤工助学岗位维护_列表查询
export function queryQgzxGwList(data) {
  return request({
    url: '/qgzxGwwh/queryQgzxGwwhList',
    method: 'post',
    data: data
  })
}
//勤工助学岗位维护_删除在岗学生
export function deleteZgxs(data) {
  return request({
    url: '/qgzxGwwh/deleteQgzxGwwhZgxs',
    method: 'post',
    data: data
  })
}
//勤工助学岗位维护_在岗新增
export function insertZgxs(data) {
  return request({
    url: '/qgzxGwwh/insertZgxs',
    method: 'post',
    data: data
  })
}
//勤工助学岗位维护新增弹框
export function queryAllXs(data) {
  return request({
    url: '/qgzxGwwh/queryAllXs',
    method: 'post',
    data: data
  })
}
//勤工助学岗位维护在岗学生_列表查询
export function queryZgxsList(data) {
  return request({
    url: '/qgzxGwwh/queryZgxsList',
    method: 'get',
    params: data
  })
}
//勤工助学岗位维护_退岗
export function backZgxs(data) {
  return request({
    url: '/qgzxGwwh/tgQgzxGwwhZgxs',
    method: 'post',
    data: data
  })
}
//勤工助学岗位维护_列表更新需求人数
export function updateNzxsrs(data) {
  return request({
    url: '/qgzxGwwh/updateNzxsrs',
    method: 'post',
    data: data
  })
}
//勤工助学岗位维护退岗学生_列表查询
export function queryTgxsList(data) {
  return request({
    url: '/qgzxGwwh/queryTgxsList',
    method: 'get',
    params: data
  })
}
//勤工助学岗位维护_更新上岗时间
export function updateSgsj(data) {
  return request({
    url: '/qgzxGwwh/updateQgzxGwwhSgsj',
    method: 'post',
    data: data
  })
}


// 教师端-岗位维护列表导出
export function exportGwwhList(query) {
  return request({
    url: '/qgzxGwwh/excelExportQgzxGwList',
    method: 'post',
    responseType: "blob",
    data: query
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











