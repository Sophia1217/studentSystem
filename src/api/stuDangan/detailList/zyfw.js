import request from '@/utils/request'

//新增修改
export function edit(query) {
    return request({
      url: '/czdaZyfw/importCzdaZyfw',
      method: 'post',
      data: query
    })
  }
//删除
export function del(data){
  return request({
    url: '/czdaZyfw/deleteZyfw',
    method: 'post',
    data: data
  })
}
//列表查询
export function query(data){
    return request({
      url: '/czdaZyfw/queryZyfwList',
      method: 'post',
      data: data
    })
  }
  //撤销
export function back(data){
  return request({
    url: '/czdaZyfw/cxById',
    method: 'post',
    data: data
  })
}
//提交
export function tj(data){
  return request({
    url: '/czdaZyfw/tjById',
    method: 'post',
    data: data
  })
}//流程图
export function lct(data){
  return request({
    url: '/flowableCommonController/excelDiagramView',
    method: 'get',
    params: data,
    responseType:'blob'
  })
}

export function lctTable(data){
  return request({
    url: '/flowableCommonController/queryFlowableComment',
    method: 'get',
    params: data,
  })
}