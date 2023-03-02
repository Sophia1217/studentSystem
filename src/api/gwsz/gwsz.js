import request from '@/utils/request'

//岗位设置-保存
export function saveD(query) {
  return request({
    url: '/qgzxGwsz/updateQgzxGwsz',
    method: 'post',
    data: query
  })
}

//岗位设置-查询
export function queryD(query) {
  return request({
    url: '/qgzxGwsz/queryQgzxGwsz',
    method: 'get',
    params: query
  })
}



//岗位设置-保存研究生三助
export function saveDNew(query) {
  return request({
    url: '/qgzxGwszYjs/updateQgzxGwszYjs',
    method: 'post',
    data: query
  })
}

//岗位设置-查询研究生三助
export function queryDNew(query) {
  return request({
    url: '/qgzxGwszYjs/queryQgzxGwszYjs',
    method: 'get',
    params: query
  })
}