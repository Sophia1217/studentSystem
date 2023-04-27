import request from '@/utils/request'

//学生端留校离校申请列表返回
export function query(data) {
  return request({
    url: '/rcswJqlxlx/queryLxlxsqList',
    method: 'post',
    data: data
  })
}
//学生端新增留校申请
export function editLiu(data) {
  return request({
    url: '/rcswJqlxlx/insertliuxsq',
    method: 'post',
    data: data
  })
}
//学生端新增离校申请
export function editLi(query) {
  return request({
    url: 'rcswJqlxlx/insertlixsq',
    method: 'post',
    data: query
  })
}


