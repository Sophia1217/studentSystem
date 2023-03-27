import request from '@/utils/request'




//日常行为预警白名单模板下载
export function downLoad(query) {
    return request({
      url: '/rcxwyj/downLoad',
      method: 'post',
      responseType:"blob",
      data: query
    })
  }
  
  //日常行为预警移除白名单
  export function deleteBmd(query) {
    return request({
      url: '/rcxwyj/deleteBmd',
      method: 'post',
      data: query
    })
  }
  

  
  //日常行为预警白名单列表导入
export function importExcelYcxwyjXfycBmd(query) {
    return request({
      url: '/rcxwyj/importExcelYcxwyjXfycBmd',
      method: 'post',
      responseType:"blob",
      data: query
    })
  }
  
  //日常行为预警加入白名单
  export function insertBmd(query) {
    return request({
      url: '/rcxwyj/insertBmd',
      method: 'post',
      data: query
    })
  }

  
//日常行为预警白名单列表查询
export function queryBmdList(query) {
  return request({
    url: '/rcxwyj/queryRcxwyjXfycBmdList',
    method: 'post',
    data: query
  })
}