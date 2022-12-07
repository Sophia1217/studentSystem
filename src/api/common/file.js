import request from '@/utils/request'

// 根据附件id删除文件
export function delFile(query) {
    return request({
      url: "/fileCommon/deleteFileByPath",
      method: 'get',
      params: query
    })
  }



// 文件下载
export function downloadFile(query) { 
    return request({
      url: "/fileCommon/downloadFile",
      method: 'get',
      params: query,
      responseType:'blob'
    })
  }


// 根据业务id查询所有附件
export function queryFile(query) {
    return request({
      url: "/fileCommon/queryBFileInfoByBusId",
      method: 'get',
      params: query
    })
  }

// 附件上传
export function uploadFile(query) {
    return request({
      url: '/fileCommon/uploadFileCommon',
      method: 'post',
      data: query
    })
  }