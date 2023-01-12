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
      url: '/rcswLskn/pendingList',
      method: 'post',
      data: query
    })
  }

// 教师端-待审核已处理列表查询
export function queryYcl(query) {
  return request({
    url: '/rcswLskn/doneList',
    method: 'post',
    data: query
  })
}

// 教师端-通过业务主键查询申请信息详情
export function getDetail(query) {
  return request({
      url: '/rcswLskn/queryDetail',
      method: 'post',
    data: query
  })
}

//待审核导出
export function dshExp(query) {
return request({
    url: '/rcswLskn/excelExport',
    method: 'post',
    data: query,
    responseType:'blob'
})
}

export function mbDown(query) {
  return request({
      url: '/rcswLskn/downLoad',
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


export function zhiHui(query) {
  return request({
      url: '/rcswSqkg/queryMkIsEnable',
      method: 'post',
      data: query,
  })
  }




// 教师端-退回
export function htFlow(query) {
return request({
    url: '/rcswLskn/rebackLskn',
    method: 'post',
    data: query
})
}

//拒绝
export function jjFlow(query) {
return request({
    url: '/rcswLskn/rejectLskn',
    method: 'post',
    data: query
})
}

// 教师端-同意操作
export function tyFlow(query) {
return request({
    url: '/rcswLskn/agreeLskn',
    method: 'post',
    data: query
})
}


