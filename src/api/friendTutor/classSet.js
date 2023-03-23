import request from "@/utils/request.js"


//课程申请
export function apply(query) {
    return request({
        url: '/rcswPbfdKcb/apply',
        method: 'post',
        data: query
    })
  }
  
//评分 
export function comment(query) {
    return request({
        url: '/rcswPbfdKcb/comment',
        method: 'post',
        data: query
    })
  }

  
//课程表列表查询
export function queryKcList(query) {
    return request({
        url: '/rcswPbfdKcb/queryKcList',
        method: 'post',
        data: query
    })
  }
  
//退课
export function reject(query) {
    return request({
        url: '/rcswPbfdKcb/reject',
        method: 'post',
        data: query
    })
  }
  
//辅导员列表查询
export function queryFdyList(query) {
    return request({
        url: '/rcswPbfdXxzx/queryFdyList',
        method: 'post',
        data: query
    })
  }
  
  //人员查询
  export function queryNumber(query) {
    return request({
        url: '/rcswPbfdKcb/queryNumber',
        method: 'get',
        params: query
    })
  }
  
//课程排课详情查询
export function queryDetail(query) {
  return request({
      url: '/rcswPbfdKcb/queryDetail',
      method: 'post',
      data: query
  })
}