import request from '@/utils/request'





//矫正教育指派列表
export function queryZpList(query) {
    return request({
      url: '/rcswJzjy/queryZpList',
      method: 'post',
      
      data: query
    })
  }
  


//矫正教育指派
export function saveZp(query) {
    return request({
      url: '/rcswJzjy/saveZp',
      method: 'post',
      
      data: query
    })
  }

  
  //矫正教育岗位下拉框
  export function queryGwListAll(query) {
    return request({
      url: '/rcswJzjy/queryGwListAll',
      method: 'get',
      
      params: query
    })
  }
  
//矫正教育指派列表导出
export function excelExportRcswZpList(query) {
  return request({
    url: '/rcswJzjy/excelExportRcswZpList',
    method: 'post',
    responseType:'blob',
    data: query
  })
}