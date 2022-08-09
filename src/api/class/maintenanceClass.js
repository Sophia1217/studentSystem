import request from '@/utils/request'
export function classList(query) {
    return request({
        url: 'sws/class/queryClassList',
        method: 'post',
        data: query
    })
}

// 新建班级
export function addClass(query) {
    return request({
        url: 'sws/class/addClass',
        method: 'post',
        data:query
    })
}

// 删除空班级
export function deleteEmptyClass(query) {
    return request({
        url: 'sws/class/deleteEmptyClass',
        method: 'post',
        params:query
    })
}