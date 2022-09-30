
import request from "@/utils/request.js"
//常用参数查询
export function getDormitoryVisitList(query) {
    return request({
        url: '/fdyQszf/queryQszfList',
        method: 'post',
        data: query
    })
}
//s删除
export function delDetail(query) {
    return request({
        url: '/fdyQszf/deleteQszf',
        method: 'post',
        data: query
    })
}
//详情

export function seeDetail(query) {
    return request({
        url: '/fdyQszf/selectQszfDetail',
        method: 'post',
        data: query
    })
}
//新增
export function addDetail(query) {
    return request({
        url: '/fdyQszf/importInsertQszf',
        method: 'post',
        data: query
    })
}
//编辑
export function editDetail(query) {
    return request({
        url: '/fdyQszf/importUpdateQszfDetail',
        method: 'post',
        data: query
    })
}
//编辑
export function outDormitory(query) {
    return request({
        url: '/fdyQszf/excelExport',
        method: 'post',
        responseType: 'blob',
        data: query
    })}
//楼栋列表
    
export function queryRelatedLd(query) {
        return request({
            url: '/fdyQszf/queryRelatedLd',
            method: 'post',
            
            data: query
        })}
// 楼栋查宿舍
   
export function queryRelatedFj(query) {
    return request({
        url: '/fdyQszf/queryRelatedFj',
        method: 'post',
        
        data: query
    })}