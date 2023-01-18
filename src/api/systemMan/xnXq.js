

import request from '@/utils/request'

// 设置当前学年学期
export function insertYearTerm(data) {
  return request({
    url: '/managerYearTerm/insertYearTerm',
    method: 'post',
    data: data
  })
}