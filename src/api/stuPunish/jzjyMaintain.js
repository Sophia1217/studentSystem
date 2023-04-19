import request from '@/utils/request'

//矫正教育_录入列表
export function queryLRList(query) {
  return request({
    url: '/rcswJzjy/queryLRList',
    method: 'post',
    data: query
  })
} 
//矫正教育录入_打卡列表
export function queryLRDkList(query) {
  return request({
    url: '/rcswJzjy/queryRcswJzjydkjlRes',
    method: 'get',
    params: query
  })
}
//矫正教育_录入_谈话列表
export function queryLRThList(query) {
  return request({
    url: '/rcswJzjy/queryRcswJzjythjlRes',
    method: 'get',
    params: query
  })
}
//矫正教育_录入保存
export function importDkThJl(query) {
  return request({
    url: '/rcswJzjy/importDkThJl',
    method: 'post',
    data: query
  })
}




