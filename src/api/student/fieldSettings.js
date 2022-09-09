import request from '@/utils/request'
// 信息修改字段设置展示
export function loadStuColumns(data) {
  return request({
    url: '/StuInfoColumn/loadStuColumns',
    method: 'get',
    params: data
  })
}

// 更新信息修改字段设置
export function updateStuColumns(data) {
  return request({
    url: '/StuInfoColumn/updateStuColumns',
    method: 'post',
    data: data
  })
}
//学生信息修改参数是否开放查询
export function getModeifyTime(data) {
  return request({
    url: '/StuInfoModifyParam/getModeifyTime',
    method: 'post',
    data: data
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

// 学生信息修改参数
export function getCodeInfoByEnglish(data) {
  return request({
    url: '/codeTable/getCodeInfoByEnglish',
    method: 'post',
    data: data
  })
}