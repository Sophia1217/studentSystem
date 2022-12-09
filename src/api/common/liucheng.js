import request from '@/utils/request'

// 根据流程实例号查询流程日志
export function queryLc(query) {
    return request({
      url: "/flowableCommonController/queryFlowableComment",
      method: 'get',
      params: query
    })
  }

  // 根据流程实例号查询流程日志
export function queryXjydAuth(query) {
  return request({
    url: "/flowBusiness/queryRcswXjydTabByXh",
    method: 'get',
    params: query
  })
}



