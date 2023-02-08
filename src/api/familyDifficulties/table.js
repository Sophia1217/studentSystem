import request from "@/utils/request.js"


//列表chaxun
export function queryList(query) {
    return request({
        url: '/rcswJtknJtqkdc/queryList',
        method: 'post',
        data: query
    })
  }

  

export function InsertJtList(query) {
    return request({
        url: '/rcswJtknJtqkdc/InsertJtList',
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