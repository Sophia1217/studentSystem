import request from '@/utils/request'

//新增修改
export function edit(query) {
    return request({
      url: '/ClubExprience/AddclubExp',
      method: 'post',
      data: query
    })
  }
//删除
export function del(data){
  return request({
    url: '/ClubExprience/deleteclubExp',
    method: 'post',
    data: data
  })
}
export function query(data){
    return request({
      url: '/ClubExprience/queryclubExpList',
      method: 'post',
      data: data
    })
  }
//社团经历提交审核
export function stjlTj(data){
  return request({
    url: 'ClubExprience/StjltjById',
    method: 'post',
    data: data
  })
}
//社团经历审核撤销
export function stjlCx(data){
  return request({
    url: '/ClubExprience/StjlcxById',
    method: 'post',
    data: data
  })
}