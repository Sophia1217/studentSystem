

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