import request from "@/utils/request.js"
//同行互评-辅导员问卷列表
  export function queryThhpList(query) {
    return request({
        url: '/fdycpThhp/queryThhpList',
        method: 'post',
        data: query
    })
  }
  
//同行互评-互评人数统计
export function countThhpRs(query) {
    return request({
        url: '/fdycpThhp/countThhpRs',
        method: 'post',
        data: query
    })
  }
  //同行互评-问卷作答
  export function answerWj(query) {
    return request({
        url: '/fdycpThhp/answerWj',
        method: 'post',
        data: query
    })
  }
  //辅导员互评结果名单列表
  export function queryCpfxList(query) {
    return request({
        url: '/fdyAnalyze/queryfdyHpResList',
        method: 'post',
        data: query
    })
  }
  //学生/辅导员互评-测评评价明细列表
  export function queryPjmxList(query) {
    return request({
        url: '/fdyAnalyze/queryXsCpWjDetailList',
        method: 'post',
        data: query
    })
  }
  
  //辅导员互评提交明细列表
  export function queryTjmxList(query) {
    return request({
        url: '/fdyAnalyze/queryHpCpWjList',
        method: 'post',
        data: query
    })
  }
  //辅导员互评结果名单列表导出
  export function exportCpResList(query) {
    return request({
      url: '/fdyAnalyze/queryfdyHpResListExport',
      method: 'post',
      responseType:'blob',
      data: query
    })
  }
  //学生/辅导员互评-测评评价明细列表导出
  export function exportPjmxlList(query) {
    return request({
      url: '/fdyAnalyze/queryXsCpWjDetailListExport',
      method: 'post',
      responseType:'blob',
      data: query
    })
  }
  //辅导员互评提交明细列表导出
  export function exportTjmxList(query) {
    return request({
      url: '/fdyAnalyze/queryHpCpWjListExport',
      method: 'post',
      responseType:'blob',
      data: query
    })
  }
  