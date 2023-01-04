import request from "@/utils/request.js"
//同行互评-辅导员问卷列表
  export function queryThhpList(query) {
    return request({
        url: '/fdycpThhp/queryThhpList',
        method: 'post',
        data: query
    })
  }
  
//同行互评-互评人数统计
export function countThhpRs(query) {
    return request({
        url: '/fdycpThhp/countThhpRs',
        method: 'post',
        data: query
    })
  }
  //同行互评-问卷作答
  export function answerWj(query) {
    return request({
        url: '/fdycpThhp/answerWj',
        method: 'post',
        data: query
    })
  }