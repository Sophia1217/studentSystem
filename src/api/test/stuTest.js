import request from "@/utils/request.js"
//学生测评-学生端-列表查询
  export function queryList(query) {
    return request({
        url: '/fdycpWj/queryXscpXsList',
        method: 'post',
        data: query
    })
  }
  
  //学生测评-教师端-列表查询
  export function LsdList(query) {
    return request({
        url: '/fdycpWj/queryXscpLsList',
        method: 'post',
        data: query
    })
  }
  //学生测评-教师端-删除问卷
  export function deleteXscpLs(query) {
    return request({
        url: '/fdycpWj/deleteXscpLs',
        method: 'post',
        data: query
    })
  }
//学生测评-教师端-打开关闭问卷
export function switchXscpLs(query) {
    return request({
        url: '/fdycpWj/switchXscpLs',
        method: 'post',
        data: query
    })
  }
  //学生测评-教师端-复制问卷
  export function copyXscpWjLs(query) {
    return request({
        url: '/fdycpWj/copyXscpWjLs',
        method: 'post',
        data: query
    })
  }
  //辅导员测评结果名单列表
  export function queryCpfxList(query) {
    return request({
        url: '/fdyAnalyze/queryfdyCpResList',
        method: 'post',
        data: query
    })
  }
  //学生测评评价明细列表
  export function queryPjmxList(query) {
    return request({
        url: '/fdyAnalyze/queryXsCpWjDetailList',
        method: 'post',
        data: query
    })
  }
  //学生测评提交明细列表
  export function queryTjmxList(query) {
    return request({
        url: '/fdyAnalyze/queryXsCpWjList',
        method: 'post',
        data: query
    })
  }
  
  
