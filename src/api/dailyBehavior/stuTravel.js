import request from '@/utils/request'

//新增修改
export function edit(query) {
    return request({
      url: '/rcswChyh/AddChyh',
      method: 'post',
      data: query
    })
  }
//删除
export function del(data){
  return request({
    url: '/rcswChyh/deleteChyh',
    method: 'post',
    data: data
  })
}
//火车乘车列表查询
export function query(data){
    return request({
      url: '/rcswChyh/queryChyhList',
      method: 'post',
      data: data
    })
  }
//火车乘车提交审核
export function tj(data){
  return request({
    url: '/rcswChyh/ChyhtjById',
    method: 'post',
    data: data
  })
}
//查询火车站点
export function queryAllZd(data){
  return request({
    url: '/rcswChyh/queryAllZd',
    method: 'post',
    data: data
  })
}
//火车乘车优惠详情
export function queryDetail(data){
  return request({
    url: '/rcswChyh/ChyhInfo',
    method: 'post',
    data: data
  })
}