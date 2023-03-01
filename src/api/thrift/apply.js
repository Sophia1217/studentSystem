
import request from '@/utils/request'

//勤工助学学生已申请岗位查询
export function YsqgwList(data){
  return request({
    url: '/qgzxXssq/queryQgzxXsYsqgwList',
    method: 'post',
    data: data
  })
}


//勤工助学学生可申请岗位查询
export function KsqgwList(data){
    return request({
      url: '/qgzxXssq/queryQgzxXsKsqgwList',
      method: 'post',
      data: data
    })
  }

  //勤工助学学生申请
export function insertQgzxXssq(data){
    return request({
      url: '/qgzxXssq/insertQgzxXssq',
      method: 'post',
      data: data
    })
  }

  
//勤工助学学生申请详情
export function getQgzxXssqDetail(data){
  return request({
    url: '/qgzxXssq/getQgzxXssqDetail',
    method: 'get',
    params: data
  })
}
//勤工助学学生申请提交
export function tjById(data){
  return request({
    url: '/qgzxXssq/tjById',
    method: 'post',
    data: data
  })
}

//勤工助学学生申请审核撤销
export function cxById(data){
  return request({
    url: '/qgzxXssq/cxById',
    method: 'post',
    data: data
  })
}

//勤工助学学生申请删除
export function deleteQgzxXssq(data){
  return request({
    url: '/qgzxXssq/deleteQgzxXssq',
    method: 'post',
    data: data
  })
}