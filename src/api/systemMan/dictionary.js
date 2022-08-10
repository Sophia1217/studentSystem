import request from '@/utils/request'

// 字典管理查询
export function queryManage(data) {
    return request({
      url: '/sws/codeTable/queryCodeTableList',
      method: 'post',
      data: data
    })
  }
  
  //字典管理修改
  export function updateDic(data) {
    return request({
      url: '/sws/codeTable/updateCodeTableState',
      method: 'post',
      data: data
    })
  }
  
  //字典列表查询
  export function listQuery(data) {
    return request({
      url: '/sws/codeTable/queryCodeTableInfoList',
      method: 'post',
      data: data
    })
  }
  
  
  //字典列表修改
  export function updateDicList(data) {
    return request({
      url: 'sws/codeTable/updateCodeTableInfo',
      method: 'post',
      data: data
    })
  }
  
  //字典列表新增
  export function addDicList(data) {
    return request({
      url: '/sws/codeTable/insertCodeTableInfo',
      method: 'post',
      data: data
    })
  }