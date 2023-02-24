import request from '@/utils/request'

//鉴定表查询

export function queryRcswJdbsz(query) {
    return request({
      url: '/rcswJdbsz/queryRcswJdbsz',
      method: 'post',
      data: query
    })
  }
  

//鉴定表新增
export function importRcswJdbsz(query) {
  return request({
    url: '/rcswJdbsz/importRcswJdbsz',
    method: 'post',
    data: query
  })
}
//鉴定表开关修改
export function switchRcswJdbsz(query) {
  return request({
    url: '/rcswJdbsz/switchRcswJdbsz',
    method: 'post',
    data: query
  })
}

//毕业鉴定获取基本信息
export function getXsJbxx(query) {
  return request({
    url: '/rcswByjd/getXsJbxx',
    method: 'post',
    data: query
  })
}
//辅导员自评详情保存
export function updateByjdDetail(query) {
  return request({
    url: '/rcswByjd/updateByjdDetail',
    method: 'post',
    data: query
  })
}
//毕业鉴定详情
export function getByjdDetail(query) {
  return request({
    url: '/rcswByjd/getByjdDetail',
    method: 'post',
    data: query
  })
}
//毕业鉴定提交审核
export function tjByjd(query) {
  return request({
    url: '/rcswByjd/tjByjd',
    method: 'post',
    data: query
  })
}

//毕业鉴定审核撤回
export function byjdCxById(query) {
  return request({
    url: '/rcswByjd/byjdCxById',
    method: 'post',
    data: query
  })
}
//
//教师端-退回操作
export function htFlow(query) {
  return request({
    url: '/rcswByjd/htFlow',
    method: 'post',
    data: query
  })
}


//教师端-拒绝操作
export function jjFlow(query) {
  return request({
    url: '/rcswByjd/jjFlow',
    method: 'post',
    data: query
  })
}


//教师端-已处理列表查询
export function queryByjdFlowedList(query) {
  return request({
    url: '/rcswByjd/queryByjdFlowedList',
    method: 'post',
    data: query
  })
}
//教师端-待审核列表查询
export function queryByjdFlowList(query) {
  return request({
    url: '/rcswByjd/queryByjdFlowList',
    method: 'post',
    data: query
  })
}


//教师端-同意操作
export function tyFlow(query) {
  return request({
    url: '/rcswByjd/tyFlow',
    method: 'post',
    data: query
  })
}


//批量导出毕业生登记表
export function exportByjd(query) {
  return request({
    url: '/rcswByjd/export/rcswByjdb',
    method: 'post',
    data: query,
    responseType:'blob'
  })
}

//教师端-列表查询
export function queryByjdList(query) {
  return request({
    url: '/rcswByjd/queryByjdList',
    method: 'post',
    data: query
  })
}

//已审核列表导出
export function excelExporYsht(query) {
  return request({
    url: '/rcswByjd/excelExporYsht',
    method: 'post',
    data: query,
    responseType:'blob'
  })
}
//学工负责人列表导出
export function excelExportXg(query) {
  return request({
    url: '/rcswByjd/excelExportXg',
    method: 'post',
    data: query,
    responseType:'blob'
  })
}
//待审核列表导出
export function excelExportDsh(query) {
  return request({
    url: '/rcswByjd/excelExportDsh',
    method: 'post',
    data: query,
    responseType:'blob'
  })
}
////公用删除附件
export function delwj(query) {
  return request({
      url: '/fileCommon/deleteFileCommonByBusinesId',
      method: 'get',
      params: query
  })
}