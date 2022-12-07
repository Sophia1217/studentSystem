import request from '@/utils/request'

//删除
export function del(data){
  return request({
    url: '/rcswZssq/deleteZssq',
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
//学生住宿申请详情
export function queryDetail(data){
  return request({
    url: '/rcswZssq/queryZssqDetail',
    method: 'post',
    data: data
  })
}
//学生住宿申请提交审核
export function tj(data){
  return request({
    url: '/rcswZssq/tjById',
    method: 'post',
    data: data
  })
}
//学生住宿申请新增修改
export function edit(query) {
  return request({
    url: '/rcswZssq/importZssq',
    method: 'post',
    data: query
  })
}
// 学生住宿申请审核撤销
export function cxById(data){
  return request({
    url: '/rcswZssq/cxById',
    method: 'post',
    data: data
  })
}
//学生住宿申请,查询用户名下所管理的房间(学生和老师，目前都是所有的房间)
export function queryFj(query) {
  return request({
    url: '/rcswZssq/queryRelatedFj',
    method: 'post',
    data: query
  })
}
//学生住宿申请,查询用户名下所管理的楼栋(学生和老师，目前都是所有的房间)
export function queryLd(query) {
  return request({
    url: '/rcswZssq/queryRelatedLd',
    method: 'post',
    data: query
  })
}
//住宿申请查询用户查询最新、已完成的校内住宿的楼栋房间信息
export function queryLdAndFj(query) {
  return request({
    url: '/rcswZssq/queryLdAndFjByXh',
    method: 'post',
    data: query
  })
}

