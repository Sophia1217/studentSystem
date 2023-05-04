import request from '@/utils/request'

//咨询师列表
export function queryList(query) {
  return request({
    url: '/syfzZxsb/query',
    method: 'post',
   
    data: query
  })
}
//新增修改
export function insert(query) {
  return request({
    url: '/syfzZxsb/insert',
    method: 'post',
   
    data: query
  })
}
//删除
export function deleteList(query) {
  return request({
    url: '/syfzZxsb/delete',
    method: 'post',
   
    data: query
  })
}


//查询教师移动电话和职称
export function queryTeaInfoByGh(query) {
  return request({
    url: '/syfzZxsb/queryTeaInfoByGh',
    method: 'get',
   
    params: query
  })
}
//查询详情
export function detail(query) {
  return request({
    url: '/syfzZxsb/detail',
    method: 'get',
   
    params: query
  })
}


//教师端-模板下载
export function downLoad(query) {
  return request({
    url: '/syfzZxsb/downLoad',
    method: 'post',
   responseType:'blob',
    data: query
  })
}