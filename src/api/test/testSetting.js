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










