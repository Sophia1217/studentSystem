import request from '@/utils/request'
// 班级列表查询接口 
// /sws/class/queryClassList {ssdwdm-培养单位, pycc-培养层次, ssnj-所属年级, bjdm-班级编号, pageSize, pageNum} POST
export function classList(query) {
    return request({
        url: '/class/queryClassList',
        method: 'post',
        data: query
    })
}

// 修改班级名称接口
// /sws/class/modifyClassName {bjdm-班级编号Y, bjmc-班级名称Y} POST
export function modifyClassName(query) {
    return request({
        url: '/class/modifyClassName',
        method: 'post',
        params: query
    })
}

// 新建班级
export function addClass(query) {
    return request({
        url: '/class/addClass',
        method: 'post',
        data: query
    })
}

// 删除空班级
export function deleteEmptyClass(query) {
    return request({
        url: '/class/deleteEmptyClass',
        method: 'post',
        params: query
    })
}
