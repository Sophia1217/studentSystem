import request from '@/utils/request'

// 列表分页查询接口
export function getPoliticalWorkList() {
  return request({
    url: '/sws/zg/list',
    method: 'get'
  })
}

// 筛选框查询
export function getFilterPoliticalWorkList(data) {
  return request({
    url: '/sws/zg/list',
    method: 'post',
    data: data
  })
}

// 按条件搜索

export function getConditionPoliticalWorkList(data) {
  return request({
    url: '/sws/zg/search',
    method: 'post',
    data: data
  })
}

// 政工干部详情查询

export function getDetailQueryPoliticalWorkList(data) {
  return request({
    url: '/sws/zgjbxx/zgDetailQuery',
    method: 'get',
    params: data
  })
}
