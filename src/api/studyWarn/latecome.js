import request from '@/utils/request'




//日常行为挂科预警列表查询导出
export function excelExportList(query) {
    return request({
      url: '/rcxwyj/excelExportRcxwyjWangList',
      method: 'post',
      responseType:"blob",
      data: query
    })
  }
  //日常行为挂科预警列表查询
  export function queryList(query) {
    return request({
      url: '/rcxwyj/queryRcxwyjWangList',
      method: 'post',
      data: query
    })
  }