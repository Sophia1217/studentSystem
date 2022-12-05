import request from '@/utils/request'

//查询
export function query(query) {
    return request({
      url: '/rcswXjyd/queryRcswXjydList',
      method: 'post',
      data: query
    })
  }

  //学籍异动申请审核撤销
export function back(query) {
    return request({
      url: '/rcswXjyd/cxById',
      method: 'post',
      data: query
    })
  }
 

   //学籍异动申请删除
export function del(query) {
    return request({
      url: '/rcswXjyd/deleteRcswXjyd',
      method: 'post',
      data: query
    })
  }

   //学籍异动申请提交
export function tj(query) {
    return request({
      url: '/rcswXjyd/tjById',
      method: 'post',
      data: query
    })
  }

   //学籍异动申请新增修改
export function edit(query) {
    return request({
      url: '/rcswXjyd/importRcswXjyd',
      method: 'post',
      data: query
    })
  }
