
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
//教师端-退回操作
export function htFlow(data){
    return request({
      url: '/qgzxXssq/htFlow',
      method: 'post',
      data: data
    })
  }
 
//教师端-待审核列表导出
export function excelExportTodo(data){
    return request({
      url: '/qgzxXssq/excelExportTodo',
      method: 'post',
      data: data,
      responseType:'blob'
    })
  }
  //教师端-已处理列表导出
export function excelExportDone(data){
    return request({
      url: '/qgzxXssq/excelExportDone',
      method: 'post',
      data: data,
      responseType:'blob'

    })
  }
  
//教师端-拒绝操作
export function jjFlow(data){
    return request({
      url: '/qgzxXssq/jjFlow',
      method: 'post',
      data: data
    })
  }
 
//教师端-已处理列表查询
export function queryQgzxGwsqYclList(data){
    return request({
      url: '/qgzxXssq/queryQgzxGwsqYclList',
      method: 'post',
      data: data
    })
  }
  //教师端-待审核列表查询
export function queryQgzxGwsqDshList(data){
    return request({
      url: '/qgzxXssq/queryQgzxGwsqDshList',
      method: 'post',
      data: data
    })
  }
  //教师端-同意操作
export function tyFlow(data){
    return request({
      url: '/qgzxXssq/tyFlow',
      method: 'post',
      data: data
    })
  }