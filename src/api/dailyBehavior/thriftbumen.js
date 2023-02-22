

import request from '@/utils/request'

//勤工助学岗位申请_复制
export function copyQgzxGw(query) {
    return request({
      url: '/qgzxGw/copyQgzxGw',
      method: 'post',
      data: query
    })
  }
  

//勤工助学岗位申请_删除
export function deleteQgzxGw(query) {
    return request({
      url: '/qgzxGw/deleteQgzxGw',
      method: 'post',
      data: query
    })
  }

  
//勤工助学岗位申请_新增
export function insertQgzxGw(query) {
    return request({
      url: '/qgzxGw/insertQgzxGw',
      method: 'post',
      data: query
    })
  }
  //勤工助学岗位_详情查询
export function queryQgzxGwById(query) {
    return request({
      url: '/qgzxGw/queryQgzxGwById',
      method: 'get',
      params: query
    })
  }
  //勤工助学岗位申请_列表查询
export function queryQgzxGwList(query) {
    return request({
      url: '/qgzxGw/queryQgzxGwList',
      method: 'post',
      data: query
    })
  }
  //勤工助学岗位申请_修改
export function updateQgzxGw(query) {
    return request({
      url: '/qgzxGw/updateQgzxGw',
      method: 'post',
      data: query
    })
  }
 
//勤工助学岗位_月工作量计算
export function countYN(query) {
  return request({
    url: '/qgzxGw/countYN',
    method: 'get',
    params: query
  })
}
//岗位申请提交
export function tjById(query) {
  return request({
    url: '/qgzxGw/tjById',
    method: 'post',
    data: query
  })
}

//岗位申请审核撤销
export function cxById(query) {
  return request({
    url: '/qgzxGw/cxById',
    method: 'post',
    data: query
  })
}

//根据工号查询政工基本信息用人单位
export function queryZgJbxxDwh(query) {
  return request({
    url: '/commonMethod/queryZgJbxxDwh',
    method: 'get',
    params: query
  })
}