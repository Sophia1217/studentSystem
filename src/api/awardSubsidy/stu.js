import request from "@/utils/request.js"

//奖助申请新增修改
export function insert(query) {
    return request({
        url: '/rcswJzsq/insertJzsq',
        method: 'post',
        data: query
    })
  }
  //奖助申请学生申请列表查询
export function queryList(query) {
    return request({
        url: '/rcswJzsq/queryJzsqList',
        method: 'post',
        data: query
    })
  }
  //学生端-奖助申请-详情查询
  export function getDetail(query) {
    return request({
        url: '/rcswJzsq/queryJzsqDetail',
        method: 'post',
        data: query
    })
  } 
  //学生端-奖助申请-提交审核
export function tjJzsqById(query) {
    return request({
        url: '/rcswJzsq/tjById',
        method: 'post',
        data: query
    })
  }
//奖助申请删除
export function deletebyId(query) {
  return request({
      url: '/rcswJzsq/deleteJzsq',
      method: 'post',
      data: query
  })
}
//学生审核撤销
export function cxById(query) {
  return request({
      url: '/rcswJzsq/cxById',
      method: 'post',
      data: query
  })
}


//批量导出困难生学生信息
export function exportJz(query) {
  return request({
      url: 'rcswJtknKnsq/export/rcswknssq',
      method: 'post',
      responseType:'blob',
      data: query
  })
}

//奖助申请-查询所有可申请资助项目的等级
export function queryAllDj(query) {
  return request({
      url: '/rcswJzsq/queryAllDjByZzxmId',
      method: 'get',
      params: query
  })
}
//奖助申请-查询所有可申请资助项目
export function queryAllZzxm(query) {
  return request({
      url: '/rcswJzsq/queryAllZzxmWithAuth',
      method: 'get',
      params: query
  })
}
//通过学号查询学生相关信息
export function queryXsInfo(query) {
  return request({
      url: '/rcswJzsq/queryXsInfoByXh',
      method: 'get',
      params: query
  })
}

