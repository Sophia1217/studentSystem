import request from "@/utils/request.js"

//家庭困难-申请设置查询
export function sqszDetail(query) {
  return request({
      url: '/rcswJtknSqsz/getJtknSqszDetail',
      method: 'get',
      params: query
  })
}
//家庭困难-申请设置新增更新
export function insertJtknSqsz(query) {
  return request({
      url: '/rcswJtknSqsz/insertJtknSqsz',
      method: 'post',
      data: query
  })
}
//家庭困难-申请设置流程图查询
export function getFlowid(query) {
  return request({
      url: '/rcswJtknSqsz/getFlowid',
      method: 'get',
      params: query
  })
}




