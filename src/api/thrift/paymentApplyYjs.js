
import request from '@/utils/request'

//研究生三助酬金发放_用人单位_详情学生列表查询
export function queryStuList(query) {
  return request({
    url: '/qgzxCjffYjssz/queryStuList',
    method: 'post',
    data: query
  })
}
//研究生三助酬金发放_用人单位_待发放酬金学生列表查询
export function queryStuDffList(query) {
  return request({
    url: '/qgzxCjffYjssz/queryDoToStu',
    method: 'post',
    data: query
  })
}
//研究生三助酬金发放_用人单位_学生酬金新增
export function insertXscj(query) {
  return request({
    url: '/qgzxCjffYjssz/insertXscj',
    method: 'post',
    data: query
  })
}
//研究生三助酬金发放_用人单位_单位列表查询
export function queryDwList(query) {
  return request({
    url: '/qgzxCjffYjssz/queryDwList',
    method: 'post',
    data: query
  })
}
//研究生三助酬金发放_用人单位_学生酬金查询
export function updateXscj(query) {
  return request({
    url: '/qgzxCjffYjssz/updateXscj',
    method: 'post',
    data: query
  })
}
//研究生三助酬金发放_用人单位_岗位列表
export function gwList(query) {
  return request({
    url: '/qgzxCjffYjssz/gwList',
    method: 'post',
    data: query
  })
}

//研究生三助酬金发放_用人单位_提交发放列表
export function tjById(query) {
  return request({
    url: '/qgzxCjffYjssz/commit',
    method: 'post',
    data: query
  })
}
//研究生三助酬金发放_用人单位_酬金发放列表删除
export function deleteDwList(query) {
  return request({
    url: '/qgzxCjffYjssz/deleteDwList',
    method: 'post',
    data: query
  })
}
//研究生三助酬金发放_用人单位_撤回发放列表
export function cxById(query) {
  return request({
    url: '/qgzxCjffYjssz/rollback',
    method: 'post',
    data: query
  })
}
//研究生三助酬金发放_学生资助中心_确认操作
export function agree(query) {
  return request({
    url: '/qgzxCjffYjssz/agree',
    method: 'post',
    data: query
  })
}
//研究生三助酬金发放_学生资助中心_已确认列表
export function queryYshList(query) {
  return request({
    url: '/qgzxCjffYjssz/DoneList',
    method: 'post',
    data: query
  })
}
//研究生三助酬金发放_学生资助中心_待确认列表
export function queryDshList(query) {
  return request({
    url: '/qgzxCjffYjssz/doToList',
    method: 'post',
    data: query
  })
}


//研究生三助酬金发放-导入模板下载
export function mbDown(query) {
  return request({
    url: '/qgzxCjffYjssz/downLoad',
    method: 'post',
    data: query,
    responseType: 'blob'
  })
}
//研究生三助酬金发放-学生列表数据导出
export function exportStu(query) {
  return request({
    url: '/qgzxCjffYjssz/excelExportStu',
    method: 'post',
    responseType: "blob",
    data: query
  })
}
//研究生三助酬金发放 - 学生数据导入 - 新增
export function importStuInsert(query) {
  return request({
    url: '/qgzxCjffYjssz/importStuCjffForInsert',
    method: 'post',
    data: query,
    responseType: 'blob'
  })
}

//研究生三助酬金发放-学生数据导入-修改
export function importStuUpdate(query) {
  return request({
    url: '/qgzxCjffYjssz/importStuCjffForUpdate',
    method: 'post',
    data: query,
    responseType: 'blob'
  })
}
//研究生三助酬金发放-单位列表数据导出-待确认
export function exportDsh(query) {
  return request({
    url: '/qgzxCjffYjssz/excelExportDwTodo',
    method: 'post',
    responseType: "blob",
    data: query
  })
}
//研究生三助酬金发放-单位列表数据导出-已确认
export function exportYsh(query) {
  return request({
    url: '/qgzxCjffYjssz/excelExportDwDone',
    method: 'post',
    responseType: "blob",
    data: query
  })
}
//勤工助学酬金发放_学生资助中心_酬金维护删除
export function deleteBySchool(query) {
  return request({
    url: '/qgzxCjffYjssz/deleteBySchool',
    method: 'post',
    data: query
  })
}
//勤工助学酬金发放-酬金维护-学生列表数据导出
export function exportStuBySchool(query) {
  return request({
    url: '/qgzxCjffYjssz/excelExportStuBySchool',
    method: 'post',
    responseType: "blob",
    data: query
  })
}
//勤工助学酬金发放_学生资助中心_酬金维护新增
export function insertXscjBySchool(query) {
  return request({
    url: '/qgzxCjffYjssz/insertXscjBySchool',
    method: 'post',
    data: query
  })
}
//勤工助学酬金发放_用人单位_待发放酬金学生列表查询
export function queryCjwhList(query) {
  return request({
    url: '/qgzxCjffYjssz/queryStuListForShool',
    method: 'post',
    data: query
  })
}
//勤工助学酬金维护-导入模板下载
export function mbDownSchool(query) {
  return request({
    url: '/qgzxCjffYjssz/downLoadSchool',
    method: 'post',
    data: query,
    responseType: 'blob'
  })
}




