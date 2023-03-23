import request from '@/utils/request'




//日常行为挂科预警列表查询导出
export function excelExportGkyjList(query) {
    return request({
      url: '/rcxwyjGkyj/excelExportGkyjList',
      method: 'post',
      responseType:"blob",
      data: query
    })
  }
  //日常行为挂科预警列表查询
  export function queryRcxwyjGkyjList(query) {
    return request({
      url: '/rcxwyjGkyj/queryRcxwyjGkyjList',
      method: 'post',
      data: query
    })
  }