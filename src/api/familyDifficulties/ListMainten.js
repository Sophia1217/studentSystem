import request from "@/utils/request.js"


//校级贫困名单列表删除
export function deleteData(query) {
    return request({
        url: '/rcswJtknXjmd/delete',
        method: 'post',
        data: query
    })
  }
  
  //校级贫困名单模板下载
  export function downLoad(query) {
    return request({
        url: '/rcswJtknXjmd/downLoad',
        method: 'post',
        responseType:'blob',
        data: query
    })
  }
  //
//校级贫困名单数据导出
export function excelExport(query) {
    return request({
        url: '/rcswJtknXjmd/excelExport',
        method: 'post',
        data: query
    })
  }
  
//校级贫困名单数据导入

export function importData(query) {
    return request({
        url: '/rcswJtknXjmd/import',
        method: 'post',
        data: query
    })
  }
  //校级贫困名单列表查询
export function queryList(query) {
    return request({
        url: '/rcswJtknXjmd/queryList',
        method: 'post',
        data: query
    })
  }
  //校级贫困名单认定
export function update(query) {
    return request({
        url: '/rcswJtknXjmd/update',
        method: 'post',
        data: query
    })
  }