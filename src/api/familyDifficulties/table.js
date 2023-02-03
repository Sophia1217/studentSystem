import request from "@/utils/request.js"


//列表chaxun
export function queryList(query) {
    return request({
        url: '/rcswJtknJtqkdc/queryList',
        method: 'post',
        data: query
    })
  }