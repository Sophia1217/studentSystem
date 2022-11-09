import request from '@/utils/request'

//校内外培训
export function query1(data){
    return request({
      url: '/czdaXnwpxjl/queryCzdaXnwpxjlList',
      method: 'post',
      data: data
    })
  }
  //社团经历
  export function query2(data){
    return request({
      url: '/ClubExprience/queryclubExpList',
      method: 'post',
      data: data
    })
  }
  //社会实践列表查询
export function query3(data){
    return request({
      url: '/czdaShsj/queryShsjList',
      method: 'post',
      data: data
    })
  }

  //志愿服务列表查询
export function query4(data){
    return request({
      url: '/czdaZyfw/queryZyfwList',
      method: 'post',
      data: data
    })
  }

  // 学习成绩列表查询
export function query5(query) {
    return request({
      url: '/academicExp/queryAcademicExpList',
      method: 'post',
      data: query
    })
  }

  //资格认证查询
  export function query6(query) {
    return request({
      url: '/czdaZgrz/queryZgrzList',
      method: 'post',
      data: query
    })
  }

  ///奖学金查询
  export function query7(query) {
    return request({
      url: '/jxj/queryJxjList',
      method: 'post',
      data: query
    })
  }