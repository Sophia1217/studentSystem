

import request from '@/utils/request'

//勤工助学岗位申请_复制
export function copyQgzxGwYjs(query) {
    return request({
      url: '/qgzxGwYjs/copyQgzxGwYjs',
      method: 'post',
      data: query
    })
  }
  

//勤工助学岗位申请_删除
export function deleteQgzxGwYjs(query) {
    return request({
      url: '/qgzxGwYjs/deleteQgzxGwYjs',
      method: 'post',
      data: query
    })
  }

  
//勤工助学岗位申请_新增
export function insertQgzxGwYjs(query) {
    return request({
      url: '/qgzxGwYjs/insertQgzxGwYjs',
      method: 'post',
      data: query
    })
  }
  //勤工助学岗位_详情查询
export function queryQgzxGwYjsById(query) {
    return request({
      url: '/qgzxGwYjs/queryQgzxGwYjsById',
      method: 'get',
      params: query
    })
  }
  //勤工助学岗位申请_列表查询
export function queryQgzxGwList(query) {
    return request({
      url: '/qgzxGwYjs/queryQgzxGwList',
      method: 'post',
      data: query
    })
  }
  //勤工助学岗位申请_修改
export function updateQgzxGwYjs(query) {
    return request({
      url: '/qgzxGwYjs/updateQgzxGwYjs',
      method: 'post',
      data: query
    })
  }
 
//勤工助学岗位岗位性质下拉框加载
export function queryYsjGwszType(query) {
  return request({
    url: '/qgzxGwYjs/queryYsjGwszType',
    method: 'get',
    params: query
  })
}
//岗位申请提交
export function tjById(query) {
  return request({
    url: '/qgzxGwYjs/tjById',
    method: 'post',
    data: query
  })
}

//岗位申请审核撤销
export function cxById(query) {
  return request({
    url: '/qgzxGwYjs/cxById',
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