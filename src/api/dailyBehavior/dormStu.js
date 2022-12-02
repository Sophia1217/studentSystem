import request from '@/utils/request'

//学生住宿申请新增修改
export function edit(query) {
    return request({
      url: '/rcswChyh/AddChyh',
      method: 'post',
      data: query
    })
  }
//删除
export function del(data){
  return request({
    url: '/rcswChyh/deleteChyh',
    method: 'post',
    data: data
  })
}
//学生住宿申请列表查询
export function query(data){
    return request({
      url: '/rcswZssq/queryZssqList',
      method: 'post',
      data: data
    })
  }
//学生住宿申请提交审核
export function tj(data){
  return request({
    url: '/rcswChyh/ChyhtjById',
    method: 'post',
    data: data
  })
}
//学生住宿申请详情
export function queryDetail(data){
  return request({
    url: '/rcswChyh/ChyhInfo',
    method: 'post',
    data: data
  })
}
// 学生住宿申请审核撤销
export function cxById(data){
  return request({
    url: '/rcswChyh/ChyhcxById',
    method: 'post',
    data: data
  })
}
