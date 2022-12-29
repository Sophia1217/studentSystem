import request from "@/utils/request.js"
//辅导员自评
  export function queryList(query) {
    return request({
        url: '/fdyzp/queryFdySelfEvaList',
        method: 'post',
        data: query
    })
  }
 
  //辅导员自评详情

  export function getFdyZpDetail(query) {
    return request({
        url: '/fdyzp/getFdyZpDetail',
        method: 'post',
        data: query
    })
  }
  
//辅导员自评详情保存
export function updateFdyZpDetail(query) {
  return request({
      url: '/fdyzp/updateFdyZpDetail',
      method: 'post',
      data: query
  })
}


//辅导员自评new
export function queryFdySelfEvaListNew(query) {
  return request({
      url: '/fdyzp/queryFdySelfEvaListNew',
      method: 'post',
      data: query
  })
}

//辅导员自评确认
export function checkFdyList(query) {
  return request({
      url: '/fdyzp/checkFdyList',
      method: 'post',
      data: query
  })
}