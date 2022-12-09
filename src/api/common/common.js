import request from '@/utils/request'

//查询当年学年学期
export function queryXnXQ(query) {
    return request({
      url: "/commonMethod/getYearTerm",
      method: 'post',
      data: query
    })
  }

  



