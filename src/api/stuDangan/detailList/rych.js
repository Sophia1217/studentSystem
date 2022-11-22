import request from '@/utils/request'

//新增修改
export function edit(query) {
    return request({
      url: '/czdaRych/importCzdaRych',
      method: 'post',
      data: query
    })
  }
//删除
export function del(data){
  return request({
    url: '/czdaRych/deleteRych',
    method: 'post',
    data: data
  })
}
//荣誉称号列表查询
export function query(data){
    return request({
      url: '/czdaRych/queryRychList',
      method: 'post',
      data: data
    })
  }
//荣誉称号提交审核
export function tj(data){
  return request({
    url: '/czdaRych/tjById',
    method: 'post',
    data: data
  })
}
//荣誉称号审核撤销
export function back(data){
  return request({
    url: '/czdaRych/cxById',
    method: 'post',
    data: data
  })
}