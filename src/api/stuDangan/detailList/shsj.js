import request from '@/utils/request'

//新增修改
export function edit(query) {
    return request({
      url: '/czdaShsj/importCzdaShsj',
      method: 'post',
      data: query
    })
  }
//删除
export function del(data){
  return request({
    url: '/czdaShsj/deleteShsj',
    method: 'post',
    data: data
  })
}
//社会实践列表查询
export function query(data){
    return request({
      url: '/czdaShsj/queryShsjList',
      method: 'post',
      data: data
    })
  }
//社团经历提交审核
export function tj(data){
  return request({
    url: '/czdaShsj/tjById',
    method: 'post',
    data: data
  })
}
//社团经历审核撤销
export function back(data){
  return request({
    url: '/czdaShsj/cxById',
    method: 'post',
    data: data
  })
}