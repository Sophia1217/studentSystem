import request from "@/utils/request.js"
export function getQuerylist(query) {
    return request({
        url: '/yqgkLscr/queryYqgkLscrList',
        method: 'post',
        data: query
    })
}

export function getDetail(query) {
    return request({
        url: '/yqgkLscr/selectYqgkLscrDetail',
        method: 'post',
        data: query
    })
}

export function exp(query) {
    return request({
        url: '/yqgkLscr/excelExport',
        method: 'post',
        data: query,
        responseType:'blob'
    })
}