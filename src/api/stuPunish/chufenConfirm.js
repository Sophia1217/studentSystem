import request from '@/utils/request'

//处分确认列表
export function queryCfqrList(query) {
  return request({
    url: '/rcswWjcf/queryCfqrList',
    method: 'post',
    data: query
  })
}
//处分结果列表
export function querycfjgList(query) {
  return request({
    url: '/rcswWjcf/querycfjgList',
    method: 'post',
    data: query
  })
}
//处分确认修改确认状态
export function updateQrztm(query) {
  return request({
    url: '/rcswWjcf/updateQrztm',
    method: 'post',
    data: query
  })
}
//修改处分结果（日期文号）
export function updateCfjg(query) {
  return request({
    url: '/rcswWjcf/updateCfjg',
    method: 'post',
    data: query
  })
}






