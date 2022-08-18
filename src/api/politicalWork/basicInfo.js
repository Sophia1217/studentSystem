import request from '@/utils/request'

// 列表分页查询接口
export function getPoliticalWorkList(params) {
  return request({
    url: '/zg/list',
    method: 'get',
    params: params
  })
}

// 筛选框查询
export function getFilterPoliticalWorkList(data) {
  return request({
    url: '/zg/list',
    method: 'post',
    data: data
  })
}

// 按条件搜索

export function getConditionPoliticalWorkList(data) {
  return request({
    url: '/zg/search',
    method: 'post',
    data: data
  })
}

// 政工干部详情查询

export function getDetailQueryPoliticalWorkList(data) {
  return request({
    url: '/zgjbxx/zgDetailQuery',
    method: 'get',
    params: data
  })
}

// 政工干部信息修改
export function updateDetailQueryPoliticalWorkList(query) {
  return request({
    url: '/zg/update',
    method: 'post',
    data: query
  })
}
