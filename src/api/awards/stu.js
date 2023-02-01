import request from "@/utils/request.js"


//评奖评优新增修改
export function Addpjpysq(query) {
    return request({
        url: '/rcswpjpysq/Addpjpysq',
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