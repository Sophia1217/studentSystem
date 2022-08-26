import request from '@/utils/request'

// 列表分页查询接口
export function getPoliticalWorkList(params) {
  return request({
    url: '/zg/queryList',
    method: 'post',
    data: params
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
    url: '/zg/zgDetailQuery',
    method: 'post',
    data: data
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

// 信息修改字段设置展示
export function loadStaffColumns(data) {
  return request({
    url: '/staffInfoColumn/loadStaffColumns',
    method: 'get',
    params: data
  })
}

// 更新信息修改字段设置
export function updateStuColumns(data) {
  return request({
    url: '/staffInfoColumn/updateStuColumns',
    method: 'post',
    data: data
  })
}

// 码表
export function getCodeInfoByEnglish(data) {
  return request({
    url: '/codeTable/getCodeInfoByEnglish',
    method: 'post',
    data: data
  })
}

// 导出
export function exportBasicInfo(data) {
  return request({
    url: '/zg/excelTest',
    method: 'post',
    responseType: 'blob',
    data: data
  })
}
// 查询工作单位列表
export function getListWorkPlace(query) {
  return request({
    url: '/manager/user/queryAllDwh',
    method: 'post',
    data: query
  })
}
