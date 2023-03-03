import request from '@/utils/request'

//待审核列表查询
export function queryDshList(data){
  return request({
    url: '/qgzxGwYjssh/toDoList',
    method: 'post',
    data: data
  })
}
//已处理列表查询
export function queryYshList(data){
  return request({
    url: '/qgzxGwYjssh/doneList',
    method: 'post',
    data: data
  })
}


//岗位审核同意操作
export function tyFlow(data){
  return request({
    url: '/qgzxGwYjssh/directAgreeQgzx',
    method: 'post',
    data: data
  })
}
//拒绝操作
export function jjFlow(data){
  return request({
    url: '/qgzxGwYjssh/rejectQgzx',
    method: 'post',
    data: data
  })
}
//可退回列表查询
export function backFlow(query) {
  return request({
    url: '/ChyhFlow/queryNodeFlowed',
    method: 'get',
    params: query
  })
}
//岗位审核根据选中节点退回
export function thFinal(query) {
  return request({
    url: '/qgzxGwYjssh/rebackQgzx',
    method: 'post',
    data: query
  })
}
//待审核列表导出
export function exportDsh(query) {
  return request({
    url: '/qgzxGwYjssh/excelExportTodo',
    method: 'post',
    responseType:"blob",
    data: query
  })
}
//已处理列表导出
export function exportYsh(query) {
  return request({
    url: '/qgzxGwYjssh/excelExportDone',
    method: 'post',
    responseType:"blob",
    data: query
  })
}
//勤工助学岗位审核_详情查询
export function queryQgzxGwshById(query) {
  return request({
    url: '/qgzxGwYjssh/queryQgzxGwshById',
    method: 'get',
    params: query
  })
}

