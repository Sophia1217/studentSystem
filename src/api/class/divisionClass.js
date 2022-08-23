import request from "@/utils/request.js"

// localhost:8081/sws/class/queryStuList POST bjdm
// 分班管理班级列表查询
export function getStuList(query) {
    return request({
        url: '/class/queryStuList',
        method: 'post',
        data: query
    })
}

// localhost:8081/sws/class/queryWfbStuList POST {zydm-专业代码, syd-生源地, sex, xh, pydw-Y-培养单位代码, pycc-Y-培养层次, ssnj-Y-年级}
// 查询未分配学生列表
export function queryWfbStuList(query) {
    return request({
        url: '/class/queryWfbStuList',
        method: 'post',
        data: query
    })
}


// localhost:8081/sws/class/getSyd
// 查询所有生源地
export function getSyd() {
    return request({
        url: '/class/getSyd',
        method: 'post',
    })
}

// localhost:8081/sws/class/getMajors
// 查询所有专业
export function getMajors(query) {
    return request({
        url: '/class/getMajors',
        method: 'post',
        data: query
    })
}

// localhost:8081/sws/class/getSex
// 查询所有性别
export function getSex() {
    return request({
        url: '/class/getSex',
        method: 'post',
    })
}

// localhost:8081/sws/class/getTransformClasses POST {ssdw-Y, pycc-Y, ssnj-Y, bjdm-Y}
// 转入班级下拉列表
export function getTransformClasses(query) {
    return request({
        url: '/class/getTransformClasses',
        method: 'post',
        data: query,
    })
}

// localhost:8081/sws/class/removeStuToEmptyClass POST {stuXhList-Y-学生学号列表}
// 调整班级——将页签2的学生移入班级
export function removeStuToEmptyClass(query) {
    return request({
        url: '/class/removeStuToEmptyClass',
        method: 'post',
        data: query
    })
}

// localhost:8081/sws/class/transformStuToOtherClass POST {stuXhList-Y, bjdm-Y}
// 调整班级——将页签1的学生移入某一班级
export function transformStuToOtherClass(query) {
    return request({
        url: '/class/transformStuToOtherClass',
        method: 'post',
        data: query
    })
}


// localhost:8081/sws/class/transformStuFromEmptyClass POST {stuXhList-Y-学生学号列表}
// 转入班级——将页签2的学生移入某一班级
export function transformStuFromEmptyClass(query) {
    return request({
        url: '/class/transformStuFromEmptyClass',
        method: 'post',
        data: query
    })
}

 // 分班管理列表导出
 export function expStu(data) {
    return request({
      url: '/class/excelTestStu',
      method: 'post',
      responseType: 'blob',
      data: data
    })
  }