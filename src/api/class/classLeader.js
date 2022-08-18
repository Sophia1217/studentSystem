import request from "@/utils/request.js"
// 班干部列表查询
// localhost:8081/sws/class/queryBgbList POST bjdm
// 班干部列表查询接口
export function getQueryBgbList(query) {
    return request({
        url: '/class/queryBgbList',
        method: 'post',
        data: query
    })
}

// 班干部任命记录查询
export function getQueryBgbRmjl(query) {
    return request({
        url: '/class/queryBgbRmjl',
        method: 'post',
        data: query
    })
}

// 班干部任命记录删除
export function getDeleteBgbRm(query) {
    return request({
        url: '/class/deleteBgbRm',
        method: 'post',
        data: query
    })
}





