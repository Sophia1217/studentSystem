import request from '@/utils/request'

//勤工助学岗位维护_列表查询
export function queryQgzxGwList(data){
  return request({
    url: '/qgzxGwwh/queryQgzxGwwhList',
    method: 'post',
    data: data
  })
}

