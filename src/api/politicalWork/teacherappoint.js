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

