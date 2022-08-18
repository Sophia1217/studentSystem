import request from '@/utils/request'

// 班主任任命
export function addTeacher(data) {
  return request({
    url: 'sws/bzrrm/commission',
    method: 'post',
    data: data
  })
}

// 班主任免去
export function removeTeacher(data) {
  return request({
    url: '/sws/bzrrm/dismiss',
    method: 'post',
    data: data
  })
}

// 班主任查看详情

export function getTeacherDetail(data) {
  return request({
    url: '/sws/bzrrm/detail',
    method: 'post',
    data: data
  })
}

//4. 班主任列表详情

export function getTeacherDetailList(data) {
  return request({
    url: '/sws/bzrrm/queryList',
    method: 'post',
    data: data
  })
}
