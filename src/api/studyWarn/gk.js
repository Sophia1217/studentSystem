import request from '@/utils/request'




//日常行为挂科预警列表查询导出
export function excelExportGkyjList(query) {
    return request({
      url: '/rcxwyj/excelExportGkyjList',
      method: 'post',
      responseType:"blob",
      data: query
    })
  }
  //日常行为挂科预警列表查询
  export function queryRcxwyjGkyjList(query) {
    return request({
      url: '/rcxwyj/queryRcxwyjGkyjList',
      method: 'post',
      data: query
    })
  }