import request from '@/utils/request'

//查询
export function query(query) {
    return request({
      url: '/rcswLskn/queryList',
      method: 'post',
      data: query
    })
  }

  //撤销
export function back(query) {
    return request({
      url: '/rcswLskn/cancelLskn',
      method: 'post',
      data: query
    })
  }
 

   //删除
export function del(query) {
    return request({
      url: '/rcswLskn/deleteLskn',
      method: 'post',
      data: query
    })
  }

   //提交
export function tj(query) {
    return request({
      url: '/rcswLskn/commitLskn',
      method: 'post',
      data: query
    })
  }

   //新增
export function add(query) {
    return request({
      url: '/rcswLskn/importInsertLskn',
      method: 'post',
      data: query
    })
  }
   //修改
  export function edit(query) {
    return request({
      url: '/rcswLskn/importUpdateLskn',
      method: 'post',
      data: query
    })
  }

  //教师端//教师端//教师端//教师端//教师端//教师端//教师端//教师端//教师端//教师端//教师端//教师端//教师端//教师端//教师端//教师端//教师端//教师端//教师端//教师端//教师端//教师端//教师端//教师端//教师端//教师端//教师端//教师端

// 教师端-待审核列表查询
  export function queryDsh(query) {
    return request({
      url: '/rcswXjyd/queryRcswXjydFlowList',
      method: 'post',
      data: query
    })
  }


  // 教师端-通过业务主键查询申请信息详情

export function dshExp(query) {
  return request({
      url: '/rcswXjyd/excelExportRcswXjyd',
      method: 'post',
      data: query,
      responseType:'blob'
  })
}
export function yclExp(query) {
  return request({  
      url: '/rcswXjyd/excelExportRcswXjydFlowed',
      method: 'post',
      data: query,
      responseType:'blob'
  })
}


