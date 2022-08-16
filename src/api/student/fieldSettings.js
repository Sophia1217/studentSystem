import request from '@/utils/request'
// 信息修改字段设置展示
export function loadStuColumns(data) {
  return request({
    url: '/StuInfoColumn/loadStuColumns',
    method: 'get',
    params: data
  })
}

// 学生信息修改参数
export function stuInfoModifyParamService(data) {
  return request({
    url: '/StuInfoModifyParam/stuInfoModifyParamService',
    method: 'post',
    data: data
  })
}