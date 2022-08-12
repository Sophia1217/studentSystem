import request from '@/utils/request'

// 查询学院专业班级
export function getManageRegStuInfoSearchSpread(data) {
  return request({
    url: '/regStuInfo/getManageRegStuInfoSearchSpread',
    method: 'get',
    params: data
  })
}

// 查询学生信息 -可管理学生
export function getManageRegStuInfoPageList(data) {
  return request({
    url: '/regStuInfo/getManageRegStuInfoPageList',
    method: 'post',
    data: data
  })
}

// 查询学生信息 -全校学生
export function getSchoolRegStuInfoPageList(data) {
  return request({
    url: '/regStuInfo/getSchoolRegStuInfoPageList',
    method: 'post',
    data: data
  })
}

//毕业学生列表查询
export function getGraduateStuInfoPageList(data) {
  return request({
    url: '/regStuInfo/getGraduateRegStuInfoPageList',
    method: 'post',
    data: data
  })
}

// 查询学生信息 -可管理学生详情
export function getRegStuInfoDetailPage(data) {
  return request({
    url: '/regStuInfo/getRegStuInfoDetailPage',
    method: 'get',
    params: data
  })
}

// 查询学生信息 -可管理学生更新
export function updateRegStuInfo(data) {
  return request({
    url: '/regStuInfo/updateRegStuInfo',
    method: 'post',
    data: data
  })
}

// 导出在籍学生信息字段展示
export function exportQuery(data) {
  return request({
    url: '/regStuInfo/exportQuery',
    method: 'get',
    params: data
  })
}

// 导出在籍学生信息字段展示
export function exportStu(data) {
  return request({
    url: '/regStuInfo/export',
    method: 'get',
    params: data
  })
}
