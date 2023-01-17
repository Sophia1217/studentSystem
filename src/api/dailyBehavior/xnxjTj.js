




import request from '@/utils/request'

//列表
export function getList(query) {
    return request({
      url: '/rcswXnxjfx/queryXnxjFxList',
      method: 'post',
      data: query
    })
  }
  
  // 批量导出
export function tjExp(query) {
  return request({
      url: '/rcswXnxjfx/excelExportRcswXnxjfx',
      method: 'post',
      data: query,
      responseType:'blob'
  })
}

 

  