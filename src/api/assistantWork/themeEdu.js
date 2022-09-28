import request from "@/utils/request.js"
//列表查询
export function getThemeEduList(query) {
    return request({
        url: '/fdyThemeEducation/fdyThemeEducationPageList',
        method: 'post',
        data: query
    })
}
//详情
export function seeDetail(query) {
    return request({
        url: '/fdyThemeEducation/fdyThemeEduInfo',
        method: 'get',
         params:query
    })
}
//删除
export function delDetail(query) {
   
    return request({
        url: '/fdyThemeEducation/fdyThemeEduDelete',
        method: 'delete',
        data: query
    })
}
//新增
export function addDetail(query) {
   
    return request({
        url: '/fdyThemeEducation/fdyThemeEduAdd',
        method: 'post',
        data: query
    })
}
//查专业
export function getMajor(query) {
   
    return request({
        url: '/commonMethod/queryZYByDwhPycc',
        method: 'post',
        data: query
    })
}
//修改
export function editDetail(query) {
   
    return request({
        url: '/fdyThemeEducation/fdyThemeEduChange',
        method: 'post',
        data: query
    })
}
//人数
export function getNum(query) {
   
    return request({
        url: '/fdyThemeEducation/getNum',
        method: 'post',
        data: query
    })
}
//导出

export function outThemeEdu(query) {
   
    return request({
        url: '/fdyThemeEducation/excelExport',
        method: 'post',
        responseType: 'blob',
        data: query
    })
}