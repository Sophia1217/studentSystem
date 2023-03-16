import request from '@/utils/request'

//毕业生确认
export function checkBys(data) {
  return request({
    url: '/xsBysmd/checkBys',
    method: 'post',
    data: data
  })
}
//删除待确认list
export function deleteDqrList(data) {
  return request({
    url: '/xsBysmd/deleteDqrList',
    method: 'post',
    data: data
  })
}
//模板下载
export function mbDown(query) {
  return request({
    url: '/xsBysmd/downLoad',
    method: 'post',
    data: query,
    responseType: 'blob'
  })
}
//导入待确认毕业生列表
export function importBysDqrList(query) {
  return request({
    url: '/xsBysmd/importBysDqrList',
    method: 'post',
    data: query,
    responseType: 'blob'
  })
}
//毕业生待确认_列表导出
export function exportBysDqr(query) {
  return request({
    url: '/xsBysmd/printByEasyExcelBysmdDqrList',
    method: 'post',
    data: query,
    responseType: 'blob'
  })
}
//毕业生已确认_列表导出
export function exportBysYqr(query) {
  return request({
    url: '/xsBysmd/printByEasyExcelBysmdYqrList',
    method: 'post',
    data: query,
    responseType: 'blob'
  })
}
//毕业生待确认
export function queryDqrList(data) {
  return request({
    url: '/xsBysmd/queryBysmdDqrList',
    method: 'post',
    data: data
  })
}
//毕业生已确认
export function queryYqrList(data) {
  return request({
    url: '/xsBysmd/queryBysmdYqrList',
    method: 'post',
    data: data
  })
}





