import request from "@/utils/request.js"

//问卷详情
  export function getWjXq(query) {
    return request({
        url: '/fdycpWj/getWjXq',
        method: 'post',
        data: query
    })
  
  }
  //问卷做答
  export function answerWj(query) {
    return request({
        url: '/fdycpWj/answerWj',
        method: 'post',
        data: query
    })
  
  }