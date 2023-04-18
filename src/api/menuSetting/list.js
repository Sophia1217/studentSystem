import request from '@/utils/request'

//查询菜单列表
export function queryMenuList(query) {
  return request({
    url: '/managerMenu/query',
    method: 'post',
    data: query
  })
} 
//为超管角色配置菜单
export function configAdmin(query) {
  return request({
    url: '/managerMenu/configureMenuForAdmin',
    method: 'post',
    data: query
  })
}
//删除菜单
export function deleteMenu(query) {
  return request({
    url: '/managerMenu/delete',
    method: 'post',
    data: query
  })
}
//新增菜单
export function insertMenu(query) {
  return request({
    url: '/managerMenu/insert',
    method: 'post',
    data: query
  })
}
//修改菜单
export function updateMenu(query) {
  return request({
    url: '/managerMenu/update',
    method: 'post',
    data: query
  })
}
// 一级侧边栏下拉
export function queryFirstLevel(query) {
  return request({
    url: '/managerMenu/queryFirstLevelSidebar',
    method: 'get',
    params: query
  })
}
