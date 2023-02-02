import request from "@/utils/request.js"


//评奖评优新增修改
export function Addpjpysq(query) {
    return request({
        url: '/rcswpjpysq/importAddpjpysq',
        method: 'post',
        data: query
    })
  }
 
  //评奖评优提交审核
  export function tjpjpyById(query) {
    return request({
        url: '/rcswpjpysq/tjpjpyById',
        method: 'post',
        data: query
    })
  }
  //评奖评优获取所有可申请奖项
  export function getAllpjjx(query) {
    return request({
        url: '/rcswpjpysq/getAllpjjx',
        method: 'get',
        params: query
    })
  }
//评奖评优获取所有申请奖项的所有信息
export function getAllpjjxxx(query) {
  return request({
      url: '/rcswpjpysq/getAllpjjxxx',
      method: 'get',
      params: query
  })
}
//评奖评优列表查询
export function querypjpyList(query) {
  return request({
      url: '/rcswpjpysq/querypjpyList',
      method: 'post',
      data: query
  })
}

//评奖评优删除
export function deletePjpysqXs(query) {
  return request({
      url: '/rcswpjpysq/deletePjpysqXs',
      method: 'post',
      data: query
  })
}
//评奖评优审核撤销
export function cxById(query) {
  return request({
      url: '/rcswpjpysq/cxById',
      method: 'post',
      data: query
  })
}