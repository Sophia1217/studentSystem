import request from "@/utils/request.js"


//教师端-退回操作
export function htFlow(query) {
    return request({
        url: '/rcswPbfdPbsq/htFlow',
        method: 'post',
        data: query
    })
  }
  
  
  //教师端-拒绝操作
export function jjFlow(query) {
    return request({
        url: '/rcswPbfdPbsq/jjFlow',
        method: 'post',
        data: query
    })
  }
  
  //教师端-已处理列表查询
  export function queryPbsqFlowedList(query) {
    return request({
        url: '/rcswPbfdPbsq/queryPbsqFlowedList',
        method: 'post',
        data: query
    })
  }

  
  //教师端-待审核列表查询

  export function queryPbsqFlowList(query) {
    return request({
        url: '/rcswPbfdPbsq/queryPbsqFlowList',
        method: 'post',
        data: query
    })
  }
  
//教师端-同意操作
export function tyFlow(query) {
    return request({
        url: '/rcswPbfdPbsq/tyFlow',
        method: 'post',
        data: query
    })
  }
  //待审核列表导出
  export function excelExportPbsqFlow(query) {
    return request({
        url: '/rcswPbfdPbsq/excelExportPbsqFlow',
        method: 'post',
        data: query,
        responseType:'blob'
    })
  }

  

//教师端-已处理列表导出
  export function excelExportPbsqFlowed(query) {
    return request({
        url: '/rcswPbfdPbsq/excelExportPbsqFlowed',
        method: 'post',
        data: query,
        responseType:'blob'
    })
  }