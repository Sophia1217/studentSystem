
import request from '@/utils/request'

//日常请销假老师请假待审核列表查询
export function getDshList(query) {
    return request({
      url: '/rcswrcqxj/queryRcqxjLsDshList',
      method: 'post',
      data: query
    })
  }
  //日常请销假老师请假已处理列表查询
  export function getYclList(query) {
    return request({
      url: '/rcswrcqxj/queryRcqxjLsYclList',
      method: 'post',
      data: query
    })
  }
  //日常请销假老师请假已生效列表查询
  export function getYsxList(query) {
    return request({
      url: '/rcswrcqxj/queryRcqxjLsYsxList',
      method: 'post',
      data: query
    })
  }

  //老师同意请假操作
export function tyqjFlow(query) {
    return request({
      url: '/rcswrcqxj/tyqjFlow',
      method: 'post',
      data: query
    })
  }
  
//老师拒绝请假操作
export function jjqjFlow(query) {
  return request({
    url: '/rcswrcqxj/jjqjFlow',
    method: 'post',
    data: query
  })
}
//老师退回请假操作
export function htqjFlow(query) {
  return request({
    url: '/rcswrcqxj/htqjFlow',
    method: 'post',
    data: query
  })
}
//学生基本信息
export function getXsJbxx(query) {
  return request({
    url: '/commonMethod//queryXsByXh',
    method: 'get',
    params: query
  })
}

//日常请销假老师销假已处理列表查询
export function getXjYclList(query) {
    return request({
      url: '/rcswrcqxj/queryRcqxjLsXjYclList',
      method: 'post',
      data: query
    })
  }
//日常请销假老师销假待处理列表查询
  export function getXjDshList(query) {
    return request({
      url: '/rcswrcqxj/queryRcqxjLsDclList',
      method: 'post',
      data: query
    })
  }
  //老师确认销假
export function lsqrFlow(query) {
  return request({
    url: '/rcswrcqxj/lsqrFlow',
    method: 'post',
    data: query
  })
}
//根据流程实例号查询流程日志
export function queryFlowableComment(query) {
  return request({
    url: '/rcswrcqxj/queryFlowableComment',
    method: 'get',
    params: query
  })
}

//老师待审核导出
export function excelLsDshList(query) {
  return request({
    url: '/rcswrcqxj/excelLsDshList',
    method: 'get',
    params: query
  })
}