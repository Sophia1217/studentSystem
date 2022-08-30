import request from '@/utils/request'

// 班主任任命
export function addTeacher(data) {
  return request({
    url: '/bzrrm/commission',
    method: 'post',
    data: data
  })
}

// 班主任免去
export function removeTeacher(data) {
  return request({
    url: '/bzrrm/dismiss',
    method: 'post',
    data: data
  })
}

// 班主任查看详情

export function getTeacherDetail(data) {
  return request({
    url: '/bzrrm/detail',
    method: 'post',
    data: data
  })
}

//4. 班主任列表详情

export function getTeacherDetailList(data) {
  return request({
    url: '/bzrrm/queryList',
    method: 'post',
    data: data
  })
}

// 导出
export function exportTeacher(data) {
  return request({
    url: '/bzrrm/excelTest',
    method: 'post',
    responseType: 'blob',
    data: data
  })
}

// 查询工作单位列表
export function getListWorkPlace(query) {
  return request({
    url: '/assistant/getdwmc',
    method: 'post',
    data: query
  })
}

