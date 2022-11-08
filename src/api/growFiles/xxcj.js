
import request from '@/utils/request'

// 学习成绩列表查询
export function queryAcademicExpList(query) {
  return request({
    url: '/academicExp/queryAcademicExpList',
    method: 'post',
    data: query
  })
}