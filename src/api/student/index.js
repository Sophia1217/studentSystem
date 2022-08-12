import request from '@/utils/request'

// 查询学院专业班级
export function getManageRegStuInfoSearchSpread(data) {
  return request({
    url: '/regStuInfo/getManageRegStuInfoSearchSpread',
    method: 'get',
    data: data
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

//毕业学生列表查询
export function getGraduateStuInfoPageList(data) {
  return request({
    url: '/regStuInfo/getGraduateRegStuInfoPageList',
    method: 'post',
    data: data
  })
}
