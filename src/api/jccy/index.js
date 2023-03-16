import request from '@/utils/request'

//基层就业新增修改学生端
export function edit(query) {
  return request({
    url: '/jcjyDkbc/insertJcjyDkbcsq',
    method: 'post',
    data: query
  })
}

export function getStreet(query) {
  return request({
    url: '/jcjyDkbc/getAllStreet',
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

//查询贷款学生申请列表
export function query(query) {
    return request({
      url: '/jcjyDkbc/getJcjyDkbcsqListByXh',
      method: 'post',
      data: query
    })
  }

  export function del(query) {
    return request({
      url: '/jcjyDkbc/deleteJcjyDkbcsq',
      method: 'post',
      data: query
    })
  }
  export function back(query) {
    return request({
      url: '/jcjyDkbc/JcjyDkbccxById',
      method: 'post',
      data: query
    })
  }
  export function tj(query) {
    return request({
      url: '/jcjyDkbc/tjJcjyDkbcById',
      method: 'post',
      data: query
    })
  }

  //获取学生基本信息加历史贷款信息
  export function getAddDetails(query) {
    return request({
      url: '/jcjyDkbc/getjbxxLsdkByXh',
      method: 'post',
      data: query
    })
  }
   //学生编辑详情
   export function getEditdDetails(query) {
    return request({
      url: '/jcjyDkbc/queryJcjyDkbcsqInfoById',
      method: 'post',
      data: query
    })
  }
  //待审核列表查询
  export function dshList(query) {
    return request({
      url: '/jcjyDkbc/queryJcjyDkbcFlowList',
      method: 'post',
      data: query
    })
  }

  // 待审核列表导出
  export function dshExp(query) {
    return request({
      url: '/jcjyDkbc/excelExportDsh',
      method: 'post',
      data: query,
     responseType:"blob",
    })
  }

   // 已审核列表导出
   export function yclExp(query) {
    return request({
      url: '/jcjyDkbc/excelExportYsht',
      method: 'post',
      data: query,
     responseType:"blob",
    })
  }

  // 待审核列表通过
  export function tyFlow(query) {
    return request({
      url: '/jcjyDkbc/tyFlow',
      method: 'post',
      data: query,
    })
  }

  //待审核列表退回
  export function thFinal(query) {
    return request({
      url: '/jcjyDkbc/htFlow',
      method: 'post',
      data: query,
    })
  }

  //教师端待审核列表拒绝
  export function jjFlow(query) {
    return request({
      url: '/jcjyDkbc/jjFlow',
      method: 'post',
      data: query,
    })
  }

//已处理列表查询
export function yclList(query) {
  return request({
    url: '/jcjyDkbc/queryJcjyDkbcFlowedList',
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


















  

