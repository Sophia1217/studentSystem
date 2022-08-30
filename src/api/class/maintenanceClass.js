import request from '@/utils/request'

// 学院
export function getCollege() {
    return request({
        // url: '/manager/user/queryAllDwh',
        url: '/manager/user/queryOwnDwh',
        method: 'post',
    })
}
// 培养层次列表
// localhost:8081/sws/class/getPycc
export function getLevel() {
    return request({
        url: '/class/getPycc',
        method: 'post',
    })
}

// 年级列表
// localhost:8081/sws/class/getYears
export function getGrade() {
    return request({
        url: '/class/getYears',
        method: 'post',
    })
}

// 班级列表查询接口 
// /sws/class/queryClassList {ssdwdm-培养单位, pycc-培养层次, ssnj-所属年级, bjdm-班级编号, pageSize, pageNum} POST
export function classList(query) {
    return request({
        url: '/class/queryClassList',
        method: 'post',
        data: query
    })
}

// 班级列表导出
// localhost:8081/sws/class/exportClassList POST {ssdwdm-Y, pycc, ssnj, bjdm, pageNum, pageSize}
export function exportClassList(query) {
    return request({
        url: '/class/exportClassList',
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
        data: query
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
        data: query
    })
}
// 班级管理列表导出
export function expClass(data) {
    return request({
      url: '/class/excelTest',
      method: 'post',
      responseType: 'blob',
      data: data
    })
  }

 
