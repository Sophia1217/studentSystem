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
  //干部经历列表查询
  export function queryGbjl(data){
    return request({
      url: '/czdaGbjl/queryGbjlList',
      method: 'post',
      data: data
    })
  }
  //荣誉称号列表查询
  export function queryRych(data){
    return request({
      url: '/czdaRych/queryRychList',
      method: 'post',
      data: data
    })
  }
  //活动信息列表查询
  export function queryHdxx(data){
    return request({
      url: '/czdaHdxx/queryHdxxList',
      method: 'post',
      data: data
    })
  }
  //创业经历列表查询
  export function queryCyjl(data){
    return request({
      url: '/czdaCyjl/queryCyjlList',
      method: 'post',
      data: data
    })
  }
  // 论文期刊列表查询
export function queryLwqk(query) {
  return request({
    url: '/czdaLwqk/queryLwqkList',
    method: 'post',
    data: query
  })
}
// 科研专利列表查询
export function queryKyzl(query) {
  return request({
    url: '/czdaZl/queryZlList',
    method: 'post',
    data: query
  })
}
// 科研著作列表查询
export function queryKyzz(query) {
  return request({
    url: '/czdaZz/queryZzList',
    method: 'post',
    data: query
  })
}
// 软件著作列表查询
export function queryRjzz(query) {
  return request({
    url: '/czdaRjzz/queryRjzzList',
    method: 'post',
    data: query
  })
}

// 研究报告列表查询
export function queryYjbg(query) {
  return request({
    url: '/czdaYjbg/queryYjbgList',
    method: 'post',
    data: query
  })
}
  