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
  //    字典模板下载
  export function fileDown(data) {
    
    return request({
      url:'/codeTable/downloadTable',
      method: 'post',
      responseType: 'blob',
      data: data
    })
  }
  //   字典模板导入
  export function importtable(data,params) {
    return request({
      url: '/codeTable/importTable',
      method: 'post',
      headers: {
        "Content-Type": "multipart/form-data;charset=utf-8"
      },
      data:params
    })
  }
   //    字典列表模板下载
   export function fileInfoDown(data) {
    
    return request({
      url:'/codeTable/downloadTableInfo',
      method: 'post',
      responseType: 'blob',
      data: data
    })
  }
  //   字典模板导入
  export function importtableInfo(data,params) {
    return request({
      url: '/codeTable/importTableInfo',
      method: 'post',
      headers: {
        "Content-Type": "multipart/form-data;charset=utf-8"
      },
      data:params
    })
  }