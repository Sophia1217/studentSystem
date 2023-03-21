import request from '@/utils/request'
  export function del(query) {
    return request({
      url: '/rcswGjzxdk/deleteGjzxdk',
      method: 'post',
      data: query
    })
  }

export function delByqr(query) {
  return request({
    url: '/rcswByqr/deleteByqrDqr',
    method: 'post',
    data: query,
    responseType:"blob",
  })
}











  

