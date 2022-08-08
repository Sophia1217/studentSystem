import request from '@/utils/request'
export function classList(query) {
    return request({
        url: 'sws/class/queryClassList',
        method: 'post',
        data: query
    })
}