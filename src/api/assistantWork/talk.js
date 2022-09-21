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
    console.log("query",query);
    return request({
        url: '/fdyCyTable/fdyCyTableDelete',
        method: 'delete',
        params: query
    })
}








