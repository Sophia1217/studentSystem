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

// 学院找专业
export function getZY(data) {
  return request({
    url: '/regStuInfo/getZY',
    method: 'post',
    data: data
  })
}

// 学院找班级 getBJ
// 学院找专业
export function getBJ(data) {
  return request({
    url: '/regStuInfo/getBJ',
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

// 编辑时查询学生信息
export function loadRegStuInfoUpdatePage(data) {
  return request({
    url: '/regStuInfo/loadRegStuInfoUpdatePage',
    
    method: 'get',
    params: data
  })
}

// 查询学生信息 -可管理学生更新
export function updateRegStuInfo(data) {
  return request({
     //url: '/regStuInfo/updateRegStuInfo',
     url: '/regStuInfo/updateRegStuInfoDirect',
    method: 'post',
    data: data
  })
}
//学生端修改详情
export function updateRegStuInfoStu(data) {
  return request({
     //url: '/regStuInfo/updateRegStuInfo',
     url: '/regStuInfo/updateRegStuInfo',
    method: 'post',
    data: data
  })
}
export function updateRegStuInfo1(data) {
  return request({
    url: '/StuInfoFlow/updateStuInfo',
    method: 'post',
    data: data
  })
}

// 审核导出
export function StuInfoFlowExport(data) {
  return request({
    url: '/StuInfoFlow/export',
    method: 'post',
    responseType: 'blob',
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
    method: 'post',
    responseType: 'blob',
    data: data
  })
}

//  强制修改学生名单列表分页查询
export function forceList(data) {
  return request({
    url: '/forceUpdate/getStuPageList',
    method: 'post',
    data: data
  })
}

//学籍异动列表
export function getStuChangeInfoPageList(data) {
  return request({
    url: '/StuStatusChange/getStuStatusChangePageList',
    method: 'post',
    data: data
  })
} 

//添加强制修改学生数据
export function forceAdd(data) {
  return request({
    url: '/forceUpdate/addManageRegStuInfo',
    method: 'post',
    data: data
  })
}

//强制修改名单列表分页查询
export function forceUpdateList(data) {
  return request({
    url: '/forceUpdate/getForceInfoPageList',
    method: 'post',
    data: data
  })
}

//删除修改名单强制学生
export function DelForceStu(data) {
  return request({
    url: '/forceUpdate/deleteForceInfoPageList',
    method: 'post',
    data: data
  })
}

//待处理分页
export function FlowPageList(data) {
  return request({
    url: '/StuInfoFlow/stuInfoFlowPageList',
    method: 'post',
    data: data
  })
}


//已处理分页
export function completedPageList(data) {
  return request({
    url: '/StuInfoFlow/stuInfoFlowCompletedPageList',
    method: 'post',
    data: data
  })
}

//通過学生信息流程
export function passFlow(data) {
  return request({
    url: '/StuInfoFlow/passStuInfoFlow',
    method: 'post',
    data: data
  })
}

//打回学生信息流程
export function backFlow(data) {
  return request({
    url: '/StuInfoFlow/backStuInfoFlow',
    method: 'get',
    params: data
  })
}

//学籍异动详情
export function showStuStatusChangeInfoRes(data) {
  return request({
    url: '/StuStatusChange/showStuStatusChangeInfoRes',
    method: 'get',
    params: data
  })
}

//学生异动导出excel
export function excelTest(data) {
  return request({
    url: '/StuStatusChange/excelTest',
    method: 'post',
    responseType: 'blob',
    data: data
  })
}

//学籍审核页面
export function getStuInfoFlowUpdatePage(data) {
  return request({
    url: '/StuInfoFlow/getStuInfoFlowUpdatePage',
    method: 'get',
    params: data
  })
}

//毕业生等登记表
export function gradStu(data) {
  return request({
    url: '/export/gradStus',
    method: 'post',
    responseType: 'blob',
    data: data
  })
}

//学生卡片
export function stuCard(data) {
  return request({
    url: '/export/stuCards',
    method: 'post',
    responseType: 'blob',
    data: data
  })
}

//学生登记表
export function stuReg(data) {
  return request({
    url: '/export/regStuInfos',
    method: 'post',
    responseType: 'blob',
    data: data
  })
}
//地区级联
export function getLocationjl(query) {
  return request({
    url: '/commonMethod/getLocation',
    method: 'post',
    data: query,
  })
}
//新增学生信息
export function insertRegStuInfo(query) {
  return request({
    url: '/regStuInfo/insertRegStuInfo',
    method: 'post',
    data: query,
  })
}

//导入学生信息
export function importRegStuExcel(query) {
  return request({
    url: '/regStuInfo/importRegStuExcel',
    method: 'post',
    headers: {
      "Content-Type": "multipart/form-data;charset=utf-8"
    },
    data: query,
  })
}
//模板下载
export function fileDown(data) {
    
  return request({
    url:'/regStuInfo/downloadExcel',
    method: 'post',
    responseType: 'blob',
    data: data
  })
}