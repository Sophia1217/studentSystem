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