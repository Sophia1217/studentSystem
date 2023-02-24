const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  dict: state => state.dict.dict,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userId: state => state.user.userId,
  roleId :state => state.user.roleId,
  roleType :state => state.user.roleType,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  gh:state=>state.user.gh,
  excelcount:state=>state.permission.EXCELCOUNT,
  SJAUTH:state=>state.permission.SJAUTH,
  AUTHFLAG:state=>state.permission.AUTHFLAG,
  AUTH:state=>state.permission.AUTH,
  permissions: state => state.user.permissions,
  permission_routes: state => state.permission.routes,
  topbarRouters:state => state.permission.topbarRouters,
  defaultRoutes:state => state.permission.defaultRoutes,
  sidebarRouters:state => state.permission.sidebarRouters,
}
export default getters
