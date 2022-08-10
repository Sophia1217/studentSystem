import request from '@/utils/request'

// 查询学院专业班级
export function getManageRegStuInfoSearchSpread(data) {
  return request({
    url: '/sws/regStuInfo/getManageRegStuInfoSearchSpread',
    method: 'post',
    data: data
  })
}

// 查询学生信息 -可管理学生
export function getManageRegStuInfoPageList(data) {
  return request({
    url: '/sws/regStuInfo/getManageRegStuInfoPageList',
    method: 'post',
    data: data
  })
}