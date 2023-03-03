
import request from '@/utils/request'

//勤工助学酬金发放_用人单位_详情学生列表查询
export function queryStuList(query) {
  return request({
    url: '/qgzxCjff/queryStuList',
    method: 'post',
    data: query
  })
}
//勤工助学酬金发放_用人单位_待发放酬金学生列表查询
export function queryStuDffList(query) {
  return request({
    url: '/qgzxCjff/queryDoToStu',
    method: 'post',
    data: query
  })
}
//勤工助学酬金发放_用人单位_学生酬金新增
export function insertXscj(query) {
  return request({
    url: '/qgzxCjff/insertXscj',
    method: 'post',
    data: query
  })
}
//勤工助学酬金发放_用人单位_单位列表查询
export function queryDwList(query) {
  return request({
    url: '/qgzxCjff/queryDwList',
    method: 'post',
    data: query
  })
}
//勤工助学酬金发放_用人单位_学生酬金查询
export function updateXscj(query) {
  return request({
    url: '/qgzxCjff/updateXscj',
    method: 'post',
    data: query
  })
}
//勤工助学酬金发放_用人单位_岗位列表
export function gwList(query) {
  return request({
    url: '/qgzxCjff/gwList',
    method: 'post',
    data: query
  })
}

//勤工助学酬金发放_用人单位_提交发放列表
export function tjById(query) {
  return request({
    url: '/qgzxCjff/commit',
    method: 'post',
    data: query
  })
}
//勤工助学酬金发放_用人单位_酬金发放列表删除
export function deleteDwList(query) {
  return request({
    url: '/qgzxCjff/deleteDwList',
    method: 'post',
    data: query
  })
}
//勤工助学酬金发放_用人单位_撤回发放列表
export function cxById(query) {
  return request({
    url: '/qgzxCjff/rollback',
    method: 'post',
    data: query
  })
}
//勤工助学酬金发放_学生资助中心_确认操作
export function agree(query) {
  return request({
    url: '/qgzxCjff/agree',
    method: 'post',
    data: query
  })
}
//勤工助学酬金发放_学生资助中心_已确认列表
export function queryYshList(query) {
  return request({
    url: '/qgzxCjff/DoneList',
    method: 'post',
    data: query
  })
}
//勤工助学酬金发放_学生资助中心_待确认列表
export function queryDshList(query) {
  return request({
    url: '/qgzxCjff/doToList',
    method: 'post',
    data: query
  })
}


//勤工助学酬金发放-导入模板下载
export function mbDown(query) {
  return request({
    url: '/qgzxCjff/downLoad',
    method: 'post',
    data: query,
    responseType: 'blob'
  })
}
//勤工助学酬金发放-学生列表数据导出
export function exportStu(query) {
  return request({
    url: '/qgzxCjff/excelExportStu',
    method: 'post',
    responseType: "blob",
    data: query
  })
}
//勤工助学酬金发放 - 学生数据导入 - 新增
export function importStuInsert(query) {
  return request({
    url: '/qgzxCjff/importStuCjffForInsert',
    method: 'post',
    data: query,
    responseType: 'blob'
  })
}

//勤工助学酬金发放-学生数据导入-修改
export function importStuUpdate(query) {
  return request({
    url: '/qgzxCjff/importStuCjffForUpdate',
    method: 'post',
    data: query,
    responseType: 'blob'
  })
}

