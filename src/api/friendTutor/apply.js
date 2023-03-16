import request from "@/utils/request.js"


//学生端-朋辈申请-新增修改
export function insert(query) {
    return request({
        url: '/rcswPbfdPbsq/insertPbsq',
        method: 'post',
        data: query
    })
  }
  
//学生端-朋辈申请-列表查询
export function queryPbsqList(query) {
    return request({
        url: '/rcswPbfdPbsq/queryPbsqList',
        method: 'post',
        data: query
    })
  }

  

//学生端-朋辈申请-审核撤销
export function cxById(query) {
    return request({
        url: '/rcswPbfdPbsq/cxById',
        method: 'post',
        data: query
    })
  }
  
//学生端和教师端-朋辈申请-详情查询
export function queryPbsqDetail(query) {
  return request({
      url: '/rcswPbfdPbsq/queryPbsqDetail',
      method: 'get',
      params: query
  })
}


//学生端-朋辈申请-提交审核
export function tjById(query) {
  return request({
      url: '/rcswPbfdPbsq/tjById',
      method: 'post',
      data: query
  })
}


//学生端和教师端-朋辈申请-删除
export function deletePbsq(query) {
  return request({
      url: '/rcswPbfdPbsq/deletePbsq',
      method: 'post',
      data: query
  })
}