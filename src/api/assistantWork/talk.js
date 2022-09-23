import request from "@/utils/request.js"
//常用参数查询
export function queryTag(query) {
    return request({
        url: '/fdyCyTable/queryFdyCyTable',
        method: 'post',
        data: query
    })
}
export function addTag(query) {
    return request({
        url: '/fdyCyTable/fdyCyTableInsert',
        method: 'post',
        data: query
    })
}

export function delTag(query) {
    return request({
        url: '/fdyCyTable/fdyCyTableDelete',
        method: 'delete',
        params: query
    })
}

export function getXmXgh(query) {
    return request({
        url: '/commonMethod/getXmXgh',
        method: 'post',
        data: query
    })
}










