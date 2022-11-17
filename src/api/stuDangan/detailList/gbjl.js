import request from '@/utils/request'

//新增修改
export function edit(query) {
    return request({
      url: '/czdaGbjl/importCzdaGbjl',
      method: 'post',
      data: query
    })
  }
//删除
export function del(data){
  return request({
    url: '/czdaGbjl/deleteGbjl',
    method: 'post',
    data: data
  })
}
//干部经历列表查询
export function query(data){
    return request({
      url: '/czdaGbjl/queryGbjlList',
      method: 'post',
      data: data
    })
  }
//干部经历提交审核
export function tj(data){
  return request({
    url: '/czdaGbjl/tjById',
    method: 'post',
    data: data
  })
}
//干部经历审核撤销
export function back(data){
  return request({
    url: '/czdaGbjl/cxById',
    method: 'post',
    data: data
  })
}