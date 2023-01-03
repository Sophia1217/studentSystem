import request from "@/utils/request.js"
// 列表查询
export function queryList(query) {
    return request({
        url: '/fdycpTm/queryFdycpTmList',
        method: 'post',
        data: query
    })
}


export function delTest(query) {
    return request({
        url: '/fdycpTm/deleteFdycpTm',
        method: 'post',
        data: query
    })
}

export function getDetail(query) {
    return request({
        url: '/fdycpTm/queryFdycpTmById',
        method: 'post',
        data: query
    })
}

export function add(query) {
    return request({
        url: '/fdycpTm/insertFdycpTm',
        method: 'post',
        data: query
    })
}

export function scWj(query) {
    return request({
        url: '/fdycpWj/insertWj',
        method: 'post',
        data: query
    })
}



export function mkQuery(query) {
    return request({
        url: '/fdycpTm/queryMk',
        method: 'get',
        params: query
    })
}

// 问卷题目移除
export function YICHU(query) {
    return request({
        url: '/fdycpWj/deleteWjTmGx',
        method: 'post',
        data: query
    })
}
// 问卷题目加入
export function JIARU(query) {
    return request({
        url: '/fdycpWj/insertWjTmGx',
        method: 'post',
        data: query
    })
}
// 问卷列表详情点击
export function listDetail(query) {
    return request({
        url: '/fdycpWj/queryXscpWjDetail',
        method: 'post',
        data: query
    })
}


//单位鉴定生成问卷
export function scWj1(query) {
    return request({
        url: '/fdycpWj/insertDwXxWj',
        method: 'post',
        data: query
    })
}


















