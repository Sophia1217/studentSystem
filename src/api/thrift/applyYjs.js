
import request from '@/utils/request'

//勤工助学学生已申请岗位查询
export function YsqgwList(data){
  return request({
    url: '/qgzxXssqYjssz/queryYjsszYsqgwList',
    method: 'post',
    data: data
  })
}


//勤工助学学生可申请岗位查询
export function KsqgwList(data){
    return request({
      url: '/qgzxXssqYjssz/queryYjsszKsqgwList',
      method: 'post',
      data: data
    })
  }

  //勤工助学学生申请
export function insertQgzxXssq(data){
    return request({
      url: '/qgzxXssqYjssz/insertQgzxXssqYjssz',
      method: 'post',
      data: data
    })
  }

  
//勤工助学学生申请详情
export function getQgzxXssqDetail(data){
  return request({
    url: '/qgzxXssqYjssz/getQgzxXssqYjsszDetail',
    method: 'get',
    params: data
  })
}
//勤工助学学生申请提交
export function tjById(data){
  return request({
    url: '/qgzxXssqYjssz/tjById',
    method: 'post',
    data: data
  })
}

//勤工助学学生申请审核撤销
export function cxById(data){
  return request({
    url: '/qgzxXssqYjssz/cxById',
    method: 'post',
    data: data
  })
}

//勤工助学学生申请删除
export function deleteQgzxXssq(data){
  return request({
    url: '/qgzxXssqYjssz/deleteQgzxXssqYjssz',
    method: 'post',
    data: data
  })
}
//

//教师端-退回操作
export function htFlow(data){
    return request({
      url: '/qgzxXssqYjssz/htFlow',
      method: 'post',
      data: data
    })
  }
 
//教师端-待审核列表导出
export function excelExportRcswJzsqFlow(data){
    return request({
      url: '/qgzxXssqYjssz/excelExportRcswJzsqFlow',
      method: 'post',
      data: data,
      responseType:'blob'

    })
  }
  //教师端-已处理列表导出
export function excelExportRcswJzsqFlowed(data){
    return request({
      url: '/qgzxXssqYjssz/excelExportRcswJzsqFlowed',
      method: 'post',
      data: data,
      responseType:'blob'

    })
  }
  
//教师端-拒绝操作
export function jjFlow(data){
    return request({
      url: '/qgzxXssqYjssz/jjFlow',
      method: 'post',
      data: data
    })
  }
 
//教师端-已处理列表查询
export function queryJzsqFlowedList(data){
    return request({
      url: '/qgzxXssqYjssz/queryJzsqFlowedList',
      method: 'post',
      data: data
    })
  }
  //教师端-待审核列表查询
export function queryJzsqFlowList(data){
    return request({
      url: '/qgzxXssqYjssz/queryJzsqFlowList',
      method: 'post',
      data: data
    })
  }
  //教师端-同意操作
export function tyFlow(data){
    return request({
      url: '/qgzxXssqYjssz/tyFlow',
      method: 'post',
      data: data
    })
  }