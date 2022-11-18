import request from '@/utils/request'

//活动信息新增修改
export function editHd(query) {
    return request({
      url: '/czdaHdxx/importCzdaHdxx',
      method: 'post',
      data: query
    })
  }
//活动信息删除
export function delHd(data){
  return request({
    url: '/czdaHdxx/deleteHdxx',
    method: 'post',
    data: data
  })
}
//活动信息列表查询
export function queryHd(data){
    return request({
      url: '/czdaHdxx/queryHdxxList',
      method: 'post',
      data: data
    })
  }
//活动信息提交审核
export function tjHd(data){
  return request({
    url: '/czdaHdxx/tjById',
    method: 'post',
    data: data
  })
}
//活动信息审核撤销
export function backHd(data){
  return request({
    url: '/czdaHdxx/cxById',
    method: 'post',
    data: data
  })
}

//创业经历新增修改
export function editCy(query) {
  return request({
    url: '/czdaCyjl/importCzdaCyjl',
    method: 'post',
    data: query
  })
}
//创业经历删除
export function delCy(data){
return request({
  url: '/czdaCyjl/deleteCyjl',
  method: 'post',
  data: data
})
}
//创业经历列表查询
export function queryCy(data){
  return request({
    url: '/czdaCyjl/queryCyjlList',
    method: 'post',
    data: data
  })
}
//创业经历提交审核
export function tjCy(data){
return request({
  url: '/czdaCyjl/tjById',
  method: 'post',
  data: data
})
}
//创业经历审核撤销
export function backCy(data){
return request({
  url: '/czdaCyjl/cxById',
  method: 'post',
  data: data
})
}