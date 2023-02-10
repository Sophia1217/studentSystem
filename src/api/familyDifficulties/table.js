import request from "@/utils/request.js"


//列表chaxun
export function queryList(query) {
    return request({
        url: '/rcswJtknJtqkdc/queryList',
        method: 'post',
        data: query
    })
  }

  
//家庭情况调查学生列表修改

export function InsertJtList(query) {
    return request({
        url: '/rcswJtknJtqkdc/InsertJtList',
        method: 'post',
        data: query
    })
  }
  export function importUpdateJtqkdc(query) {
    return request({
        url: '/rcswJtknJtqkdc/importUpdateJtqkdc',
        method: 'post',
        data: query
    })
  }
  
//家庭情况调查学生列表详情
export function GetDetail(query) {
    return request({
        url: '/rcswJtknJtqkdc/GetDetail',
        method: 'get',
        params: query
    })
  }

  

//家庭情况调查学生列表导出
export function excelExportTodo(query) {
  return request({
      url: '/rcswJtknJtqkdc/excelExportTodo',
      method: 'post',
      data: query,
      responseType:'blob'

  })
}