import request from '@/utils/request'

//毕业生确认
export function checkBys(data) {
  return request({
    url: '/xsBysmd/checkBys',
    method: 'post',
    data: data
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