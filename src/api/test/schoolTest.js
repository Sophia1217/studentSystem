import request from "@/utils/request.js"
//学校评价学工负责人评价结果列表
  export function queryXgfzrList(query) {
    return request({
        url: '/fdyXxpj/queryXxpjList',
        method: 'post',
        data: query
    })
  }
  //学工负责人评价列表导出
export function exportXgfzrList(query) {
  return request({
    url: '/fdyXxpj/printByEasyExcelXxpjList',
    method: 'post',
    responseType:'blob',
    data: query
  })
}

//问卷详情
export function queryWjDetail(query) {
  return request({
      url: '/fdycpWj/getWjXq',
      method: 'post',
      data: query
  })
}
//问卷作答
export function answerWj(query) {
  return request({
      url: '/fdyXxpj/answerWj',
      method: 'post',
      data: query
  })
}


