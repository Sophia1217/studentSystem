import request from "@/utils/request.js"
//教授下午茶撤销学生端
  export function jsxwccxById(query) {
    return request({
        url: '/jsxwc/jsxwccxById',
        method: 'post',
        data: query
    })
  }
  //教授下午茶评价学生端
  export function jsxwcPjById(query) {
    return request({
        url: '/jsxwc/jsxwcPjById',
        method: 'post',
        data: query
    })
  }
  

//教授下午茶确认学生端
  export function jsxwcqrById(query) {
    return request({
        url: '/jsxwc/jsxwcqrById',
        method: 'post',
        data: query
    })
  }
  
//教授下午茶取消确认学生端
  export function jsxwcQxqrById(query) {
    return request({
        url: '/jsxwc/jsxwcQxqrById',
        method: 'post',
        data: query
    })
  }
  
  //教授下午茶申请学生端
  export function jsxwcSqTj(query) {
    return request({
        url: '/jsxwc/jsxwcSqTj',
        method: 'post',
        data: query
    })
  }
  //教授下午茶活动确认查询学生端
export function queryJsxwcHdqrList(query) {
    return request({
        url: '/jsxwc/queryJsxwcHdqrList',
        method: 'post',
        data: query
    })
  }
  
//教授下午茶申请列表查询学生端
export function queryJsxwcSqList(query) {
    return request({
        url: '/jsxwc/queryJsxwcSqList',
        method: 'post',
        data: query
    })
  }

  //教授下午茶申请列表查询学生端
export function queryJsList(query) {
  return request({
      url: '/rcswJsxwchd/queryJsxwchdcyrList',
      method: 'get',
      params: query
  })
}