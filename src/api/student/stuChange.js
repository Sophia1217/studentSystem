import request from '@/utils/request'

// 学籍异动学生类别分页查询
export function getStuStatusChangePageList(data) {
  return request({
    url: '/StuStatusChange/getStuStatusChangePageList',
    method: 'post',
    data: data
  })
}

// 学籍异动信息确认
export function confirm(data) {
    return request({
      url: '/StuStatusChange/confirm',
      method: 'post',
      data: data
    })
  }
// 学籍异动信息撤销
export function cancel(data) {
    return request({
      url: '/StuStatusChange/cancel',
      method: 'post',
      data: data
    })
  }
//学籍异动学生个人详情展示
export function showStuStatusChangeInfoRes(data) {
    return request({
      url: '/StuStatusChange/showStuStatusChangeInfoRes',
      method: 'get',
      params: data
    })
  }

  
//学籍异动学生异动信息修改
export function updateStuStatusChangeInfo(data) {
  return request({
    url: '/StuStatusChange/updateStuStatusChangeInfo',
    method: 'post',
    data: data
  })
}
//模板下载
export function downLoad(data) {
  return request({
    url: '/StuStatusChange/downLoad',
    method: 'post',
    data: data
  })
}
//导入
export function importXjyd(data) {
  return request({
    url: '/StuStatusChange/importXjyd',
    method: 'post',
    data: data
  })
}