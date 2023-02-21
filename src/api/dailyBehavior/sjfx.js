import request from '@/utils/request'

//查询
export function getList(query) {
    return request({
      url: '/rcswByjdfx/queryByjdFxList',
      method: 'post',
      data: query
    })
  }


// 导出
export function tjExp(query) {
  return request({
      url: '/rcswByjdfx/excelExportRcswByjdfx',
      method: 'post',
      data: query,
      responseType:'blob'
  })
}


