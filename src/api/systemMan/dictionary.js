import request from '@/utils/request'

// 字典管理查询
export function queryManage(data) {
    return request({
      url: '/codeTable/queryCodeTableList',
      method: 'post',
      data: data
    })
  }
  
  //字典管理修改
  export function updateDic(data) {
    return request({
      url: '/codeTable/updateCodeTableState',
      method: 'post',
      data: data
    })
  }
  
  //字典列表查询
  export function listQuery(data) {
    return request({
      url: '/codeTable/queryCodeTableInfoList',
      method: 'post',
      data: data
    })
  }
  
  
  //字典列表修改
  export function updateDicList(data) {
    return request({
      url: '/codeTable/updateCodeTableInfo',
      method: 'post',
      data: data
    })
  }
  
  //字典列表新增
  export function addDicList(data) {
    return request({
      url: '/codeTable/insertCodeTableInfo',
      method: 'post',
      data: data
    })
  }

  // 检查是否名字重复
  export function checkKey(data) {
    return request({
      url:'/codeTable/checKey',
      method: 'post',
      data: data
    })
  }
