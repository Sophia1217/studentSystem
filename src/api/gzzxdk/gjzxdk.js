import request from '@/utils/request'

//贷款申请新增修改学生端
export function edit(query) {
  return request({
    url: '/rcswGjzxdk/importInsertGjzxdksq',
    method: 'post',
    data: query
  })
}

//获取当前学年
export function nowYear(query) {
  return request({
    url: '/rcswGjzxdk/getDqxn',
    method: 'post',
    data: query
  })
}

//查询贷款申请列表
export function query(query) {
    return request({
      url: '/rcswGjzxdk/queryGjzxdkList',
      method: 'post',
      data: query
    })
  }


  export function del(query) {
    return request({
      url: '/rcswGjzxdk/deleteGjzxdk',
      method: 'post',
      data: query
    })
  }
  export function back(query) {
    return request({
      url: '/rcswGjzxdk/GjzxdkcxById',
      method: 'post',
      data: query
    })
  }
  export function tj(query) {
    return request({
      url: '/rcswGjzxdk/tjGjzxdkById',
      method: 'post',
      data: query
    })
  }


  export function getDetails(query) {
    return request({
      url: '/rcswGjzxdk/queryGjzxdkInfoById',
      method: 'post',
      data: query
    })
  }



 



