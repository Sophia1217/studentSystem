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

  //模板下载
  export function mbDown(query) {
    return request({
        url: '/fdyXpx/downLoad',
        method: 'post',
        data: query,
      responseType:'blob'
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
        url: ' /fdyXpx/importAppend',
        method: 'post',
        data: query
    })
  }

 


 
