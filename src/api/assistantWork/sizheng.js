import request from "@/utils/request.js"
//查询条件下拉
export function querySelect(query) {
    return request({
        url: '/fdySzkcs/queryCondition',
        method: 'post',
        data: query
    })
  }

  export function queryList(query) {
    return request({
        url: '/fdySzkcs/queryList',
        method: 'post',
        data: query
    })
  }

  //新增
  export function add(query) {
    return request({
        url: '/fdySzkcs/insert',
        method: 'post',
        data: query
    })
  }

   //导入
   export function impor(query) {
    return request({
        url: '/fdySzkcs/import',
        method: 'post',
        data: query,
        responseType:'blob'
    })
  }

  //导出
  export function expor(query) {
    return request({
        url: '/fdySzkcs/excelExport',
        method: 'post',
        data: query,
        responseType:'blob'
    })
  }

  //模板下载
  export function mbDown(query) {
    return request({
        url: '/fdySzkcs/downLoad',
        method: 'post',
        data: query,
      responseType:'blob'
    })
  }
  
  //删除
  export function del(query) {
    return request({
        url: '/fdySzkcs/delete',
        method: 'post',
        data: query
    })
  }

  export function getXmXgh(query) {
    return request({
        url: '/fdyCommon/queryZgXmXh ',
        method: 'post',
        data: query
    })
  }

