import request from '@/utils/request'

//贷款申请新增修改学生端
export function edit(query) {
  return request({
    url: '/rcswGjzxdk/importInsertGjzxdksq',
    method: 'post',
    data: query
  })
}

//获取当前学年
export function nowYear(query) {
  return request({
    url: '/rcswGjzxdk/getDqxn',
    method: 'post',
    data: query
  })
}

//查询贷款申请列表
export function query(query) {
    return request({
      url: '/rcswGjzxdk/queryGjzxdkList',
      method: 'post',
      data: query
    })
  }


  export function del(query) {
    return request({
      url: '/rcswGjzxdk/deleteGjzxdk',
      method: 'post',
      data: query
    })
  }
  export function back(query) {
    return request({
      url: '/rcswGjzxdk/GjzxdkcxById',
      method: 'post',
      data: query
    })
  }
  export function tj(query) {
    return request({
      url: '/rcswGjzxdk/tjGjzxdkById',
      method: 'post',
      data: query
    })
  }
  export function getDetails(query) {
    return request({
      url: '/rcswGjzxdk/queryGjzxdkInfoById',
      method: 'post',
      data: query
    })
  }
  //待审核列表查询
  export function dshList(query) {
    return request({
      url: '/rcswGjzxdk/queryGjzxdkFlowList',
      method: 'post',
      data: query
    })
  }

  // 待审核列表导出
  export function dshExp(query) {
    return request({
      url: '/rcswGjzxdk/excelExportDsh',
      method: 'post',
      data: query,
     responseType:"blob",
    })
  }

   // 已审核列表导出
   export function yclExp(query) {
    return request({
      url: '/rcswGjzxdk/excelExportYsht',
      method: 'post',
      data: query,
     responseType:"blob",
    })
  }

  // 待审核列表通过
  export function tyFlow(query) {
    return request({
      url: '/rcswGjzxdk/tyFlow',
      method: 'post',
      data: query,
    })
  }

  //待审核列表退回
  export function thFinal(query) {
    return request({
      url: '/rcswGjzxdk/htFlow',
      method: 'post',
      data: query,
    })
  }

  //待审核列表拒绝
  export function jjFlow(query) {
    return request({
      url: '/rcswGjzxdk/jjFlow',
      method: 'post',
      data: query,
    })
  }

//已处理列表查询
export function yclList(query) {
  return request({
    url: '/rcswGjzxdk/queryGjzxdkFlowedList',
    method: 'post',
    data: query
  })
}
//  教师端-贷款结果列表查询
export function dkjgList(query) {
  return request({
    url: '/rcswGjzxdk/queryGjzxdkJgwhList',
    method: 'post',
    data: query
  })
}

// 模板下载
export function mbDown(query) {
  return request({
    url: '/rcswGjzxdk/downLoad',
    method: 'post',
    data: query,
    responseType:"blob",
  })
}
// 模板下载
export function mbDown2(query) {
  return request({
    url: '/rcswByqr/downLoad',
    method: 'post',
    data: query,
    responseType:"blob",
  })
}

export function dkjgExp(query) {
  return request({
    url: '/rcswGjzxdk/excelExportYtg',
    method: 'post',
    data: query,
    responseType:"blob",
  })
}


export function delDkjg(query) {
  return request({
    url: '/rcswGjzxdk/deleteGjzxdkJg',
    method: 'post',
    data: query,
    responseType:"blob",
  })
}

export function delByqr(query) {
  return request({
    url: '/rcswByqr/deleteByqrDqr',
    method: 'post',
    data: query,
    responseType:"blob",
  })
}



//  教师端-毕业确认待确认列表查询
export function byqrDqr(query) {
  return request({
    url: '/rcswByqr/queryByqrDqrList',
    method: 'post',
    data: query
  })
}

//  学生端-毕业确认老师确认
export function lsqr(query) {
  return request({
    url: '/rcswByqr/byqrXsQrls',
    method: 'post',
    data: query
  })
}









  

