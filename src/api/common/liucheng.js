import request from '@/utils/request'

// 根据流程实例号查询流程日志
export function queryLc(query) {
    return request({
      url: "/flowableCommonController/queryFlowableComment",
      method: 'get',
      params: query
    })
  }



