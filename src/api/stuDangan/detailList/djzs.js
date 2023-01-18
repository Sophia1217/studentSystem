import request from '@/utils/request'

//能力等级证书新增修改
export function edit(query) {
    return request({
      url: '/czdaNldjzs/importCzdaNldjzsXS',
      method: 'post',
      data: query
    })
  }
//删除
export function del(data){
  return request({
    url: '/czdaNldjzs/deleteCzdaNldjzsXs',
    method: 'post',
    data: data
  })
}
//列表查询
export function query(data){
    return request({
      url: '/czdaNldjzs/queryCzdaNldjzsList',
      method: 'post',
      data: data
    })
  }
  
  //撤销
export function back(data){
  return request({
    url: '/czdaNldjzs/cxById',
    method: 'post',
    data: data
  })
}
//提交
export function tj(data){
  return request({
    url: '/czdaNldjzs/tjById',
    method: 'post',
    data: data
  })
}
