import request from '@/utils/request'

// 查询学院专业班级
export function getManageRegStuInfoSearchSpread(data) {
  return request({
    url: '/sws/regStuInfo/getManageRegStuInfoSearchSpread',
    method: 'post',
    data: data
  })
}