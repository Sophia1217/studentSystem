import request from "@/utils/request.js"
//列表查询
export function listenQuery(query) {
    return request({
        url: '/fdyKttk/FdyKttkPageList', 
        method: 'post',
        data: query
    })
}

//模糊查询
export function getXmXgh(query) {
    return request({
        url: '/fdyKttk/getXmXgh',
        method: 'post',
        data: query
    })
}

//课程信息查询
export function FdyKcxxPageList(query) {
    return request({
        url: '/fdyKttk/FdyKcxxPageList',
        method: 'post',
        data: query
    })
}

//课堂听课详情
export function getDetail(query) {
    return request({
        url: '/fdyKttk/fdyKttkInfo',
        method: 'get',
        params: query
    })
}

export function getGrade() {
    return request({
        url: '/class/getYears',
        method: 'post',
    })
}

export function del(query) {
    return request({
        url: '/fdyKttk/fdyKttkDelete',
        method: 'delete',
        data: query
    })
}

export function exp(query) {
    return request({
        url: '/fdyKttk/excelExport',
        method: 'post',
        responseType: 'blob',
        data: query
    })
}


export function updateListen(query) {
    return request({
        url: '/fdyKttk/importfdyKttkChange',
        method: 'post',
        data: query
    })
}


export function addListen(query) {
    return request({
        url: '/fdyKttk/importfdyKttkAdd',
        method: 'post',
        data: query
    })
}


