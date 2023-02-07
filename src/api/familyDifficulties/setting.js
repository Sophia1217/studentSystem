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


