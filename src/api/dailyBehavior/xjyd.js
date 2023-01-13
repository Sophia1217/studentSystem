import request from '@/utils/request'

//查询
export function query(query) {
    return request({
      url: '/rcswXjyd/queryRcswXjydList',
      method: 'post',
      data: query
    })
  }

  //学籍异动申请审核撤销
export function back(query) {
    return request({
      url: '/rcswXjyd/cxById',
      method: 'post',
      data: query
    })
  }
 

   //学籍异动申请删除
export function del(query) {
    return request({
      url: '/rcswXjyd/deleteRcswXjyd',
      method: 'post',
      data: query
    })
  }

   //学籍异动申请提交
export function tj(query) {
    return request({
      url: '/rcswXjyd/tjById',
      method: 'post',
      data: query
    })
  }

   //学籍异动申请新增修改
export function edit(query) {
    return request({
      url: '/rcswXjyd/importRcswXjyd',
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

  // 教师端-待审核已处理列表查询
  export function queryYcl(query) {
    return request({
      url: '/rcswXjyd/queryRcswXjydFlowedList',
      method: 'post',
      data: query
    })
  }
  
  

  //  教师端-已生效列表查询
  export function queryYsx(query) {
    return request({
      url: '/rcswXjyd/queryRcswXjydFlowYSXList',
      method: 'post',
      data: query
    })
  }

  // 教师端-通过业务主键查询申请信息详情
  export function getDetail(query) {
    return request({
        url: '/rcswXjyd/queryRcswXjydById',
        method: 'get',
        params: query
    })
}

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
export function ysxExp(query) {
  return request({
      url: '/rcswXjyd/excelExportRcswXjydFlowYSX',
      method: 'post',
      data: query,
      responseType:'blob'
  })
}

// 批量导出学籍异动信息
export function xjydExp(query) {
  return request({
      url: '/export/rcswXjyd',
      method: 'post',
      data: query,
      responseType:'blob'
  })
}





export function xhQuery(query) {
  return request({
    url: "/commonMethod/queryXsByXh",
    method: 'get',
    params: query
  })
}

// 教师端-退回

export function htFlow(query) {
  return request({
      url: '/rcswXjyd/htFlow',
      method: 'post',
      data: query
  })
}

export function updateYdwh(query) {
  return request({
      url: '/rcswXjyd/updateYdwh',
      method: 'post',
      data: query
  })
}



//拒绝
export function jjFlow(query) {
  return request({
      url: '/rcswXjyd/jjFlow',
      method: 'post',
      data: query
  })
}

// 教师端-同意操作
export function tyFlow(query) {
  return request({
      url: '/rcswXjyd/tyFlow',
      method: 'post',
      data: query
  })
}

