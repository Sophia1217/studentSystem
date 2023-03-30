import request from '@/utils/request'

//征兵入伍学生申请审核撤销
export function cxById(query) {
  return request({
    url: '/rcswZbrw/cxById',
    method: 'post',
    data: query
  })
}

//征兵入伍学生申请删除
export function deleteZbrwXsList(query) {
  return request({
    url: '/rcswZbrw/deleteZbrwXsList',
    method: 'post',
    data: query
  })
}

//根据选中节点退回
export function htFlow(query) {
    return request({
      url: '/rcswZbrw/htFlow',
      method: 'post',
      data: query
    })
  }


  
  //征兵入伍学生申请
  export function insert(query) {
    return request({
      url: '/rcswZbrw/insertZbrwDetail',
      method: 'post',
      data: query
    })
  }
  //教师端-拒绝
  export function jjFlow(query) {
    return request({
      url: '/rcswZbrw/jjFlow',
      method: 'post',
      data: query
    })
  }
 
//征兵入伍待审核查询
  export function queryZbrwFlowDshList(query) {
    return request({
      url: '/rcswZbrw/queryZbrwFlowDshList',
      method: 'post',
      data: query
    })
  }
 
//征兵入伍已处理查询
  export function queryZbrwFlowYclList(query) {
    return request({
      url: '/rcswZbrw/queryZbrwFlowYclList',
      method: 'post',
      data: query
    })
  }
  //征兵入伍学生查询
  export function queryZbrwXsList(query) {
    return request({
      url: '/rcswZbrw/queryZbrwXsList',
      method: 'post',
      data: query
    })
  }

  //征兵入伍学院查询
  export function queryZbrwXyList(query) {
    return request({
      url: '/rcswZbrw/queryZbrwXyList',
      method: 'post',
      data: query,
    
    })
  }

   

  // 征兵入伍学生申请提交
  export function tjById(query) {
    return request({
      url: '/rcswZbrw/tjById',
      method: 'post',
      data: query,
    })
  }

  //教师端-同意
  export function tyFlow(query) {
    return request({
      url: '/rcswZbrw/tyFlow',
      method: 'post',
      data: query,
    })
  }

  

//征兵入伍申请详情
export function getZbrwDteail(query) {
  return request({
    url: '/rcswZbrw/getZbrwDteail',
    method: 'get',
    params: query
  })
}
//征兵入伍申请详情
export function getZbrwXsjbxx(query) {
    return request({
      url: '/rcswZbrw/getZbrwXsjbxx',
      method: 'get',
      params: query
    })
  }

 
  //征兵入伍学年
  export function queryZbrwXn(query) {
    return request({
      url: '/rcswZbrw/queryZbrwXn',
      method: 'get',
      params: query
    })
  }


  
  //征兵入伍申请详情历史学费贷款信息
  export function getXsXfDkxx(query) {
    return request({
      url: '/rcswZbrw/getXsXfDkxx',
      method: 'get',
      params: query
    })
  }
  
  //已处理数据导出
export function excelExportDone(query) {
    return request({
      url: '/rcswZbrw/excelExportDone',
      method: 'post',
      data: query,
      responseType:'blob'
    })
  }
  
//待审核数据导出
  export function excelExportTodo(query) {
    return request({
      url: '/rcswZbrw/excelExportTodo',
      method: 'post',
      data: query,
      responseType:'blob'
    })
  }

   

//学院列表数据导出
export function excelExportXYDone(query) {
  return request({
    url: '/rcswZbrw/excelExportXYDone',
    method: 'post',
    data: query,
    responseType:'blob'
  })
}












  

