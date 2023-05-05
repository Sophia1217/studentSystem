import request from '@/utils/request'


//咨询统计列表
export function analyzeList(data) {
    return request({
      url: '/syfzYyjgAnaly/analyzeList',
      method: 'post',
      data: data
    })
  }
//咨询统计列表导出
export function excelExport(data) {
    return request({
      url: '/syfzYyjgAnaly/excelExport',
      method: 'post',
      responseType:'blob',
      data: data
    })
  }
  //统计详情-学生列表导出
export function excelExportStu(data) {
    return request({
      url: '/syfzYyjgAnaly/excelExportStu',
      method: 'post',
      responseType:'blob',
      data: data
    })
  }
  //统计详情-学生列表
export function stuList(data) {
    return request({
      url: '/syfzYyjgAnaly/stuList',
      method: 'post',
      data: data
    })
  }