import request from "@/utils/request.js"

  export function queryList(query) {
    return request({
        url: '/fdyXpx/queryList',
        method: 'post',
        data: query
    })
  }

  //导出
  export function expor(query) {
    return request({
        url: '/fdyXpx/excelExport',
        method: 'post',
        data: query,
        responseType:'blob'
    })
  }

  //学平险查询模板下载
  export function mbDown(query) {
    return request({
        url: '/fdyXpx/downLoad',
        method: 'post',
        data: query,
      responseType:'blob'
    })
  }

   //学平险查询模板下载
   export function mbDown1(query) {
    return request({
        url: '/fdyXpx/downLoadXzxx',
        method: 'post',
        data: query,
      responseType:'blob'
    })
  }
  //辅导员学平险维护导出
  export function maintainExp(query) {
    return request({
        url: '/fdyXpx/excelExportXzxx',
        method: 'post',
        data: query,
        responseType:'blob'
    })
  }
  //辅导员学平险维护详情
  export function maintainDetail(query) {
    return request({
        url: '/fdyXpx/queryXzxxOne',
        method: 'post',
        data: query,
    })
  }

  export function updateXzxx(query) {
    return request({
        url: '/fdyXpx/updateXzxx',
        method: 'post',
        data: query,
    })
  }
 
  export function queryXzlx(query) {
    return request({
        url: '/fdyXpx/queryXzlx',
        method: 'post',
        data: query
    })
  }
  
  export function fjsc(query) {
    return request({
        url: '/fdyXpx/importAppend',
        method: 'post',
        data: query
    })
  }

  export function maintainQuery(query) {
    return request({
        url: '/fdyXpx/queryXzxxList',
        method: 'post',
        data: query
    })
  }

 
  

 
