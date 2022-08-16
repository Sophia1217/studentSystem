import request from '@/utils/request'

// 获取路由
export const getRouters = (params) => {
  return request({
    url: '/manager/role/menuList',
    method: 'post',
    data:params
  })
}