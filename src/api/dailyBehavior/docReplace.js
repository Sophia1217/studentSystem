import request from '@/utils/request'

//证件补办新增修改
export function edit(query) {
    return request({
      url: '/rcswZjbb/AddZjbb',
      method: 'post',
      data: query
    })
  }
//删除
export function del(data){
  return request({
    url: '/rcswZjbb/deleteZjbb',
    method: 'post',
    data: data
  })
}
//列表查询
export function query(data){
    return request({
      url: '/rcswZjbb/queryZjbbList',
      method: 'post',
      data: data
    })
  }
//提交审核
export function tj(data){
  return request({
    url: '/rcswZjbb/ZjbbtjById',
    method: 'post',
    data: data
  })
}

//详情
export function queryDetail(data){
  return request({
    url: '/rcswZjbb/ZjbbInfo',
    method: 'post',
    data: data
  })
}