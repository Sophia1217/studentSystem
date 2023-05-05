import request from '@/utils/request'

//咨询师列表
export function queryPbList(query) {
  return request({
    url: '/syfzPbxx/query',
    method: 'post',
   
    data: query
  })
}
//新增修改
export function insert(query) {
  return request({
    url: '/syfzPbxx/insert',
    method: 'post',
   
    data: query
  })
}
//删除
export function deleteList(query) {
  return request({
    url: '/syfzPbxx/delete',
    method: 'post',
   
    data: query
  })
}