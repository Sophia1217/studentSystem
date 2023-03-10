




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

 
//勤工助学学生端酬金发放
export function getList1(query) {
  return request({
    url: '/qgzxCjff/queryStuListForShool',
    method: 'post',
    data: query
  })
}

export function getList2(query) {
  return request({
    url: '/qgzxCjffYjssz/queryStuListForShool',
    method: 'post',
    data: query
  })
}


  