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
        url: '/fdyTalk/showStuListByXm',
        method: 'post',
        data: query
    })
}

export function talkTable(query) {
    return request({
        url: '/fdyTalk/queryFdyTalkTable',
        method: 'post',
        data: query
    })
}

export function addTalk(query) {
    return request({
        url: '/fdyTalk/importaddTxth',
        method: 'post',
        data: query
    })
}

export function detailTalk(query) {
    return request({
        url: '/fdyTalk/showFdyTalkTableById',
        method: 'get',
        params: query
    })
}
export function updateTalk(query) {
    return request({
        url: '/fdyTalk/importupdateTxth',
        method: 'post',
        data: query
    })
}

export function delTalk(query) {
    return request({
        url: '/fdyTalk/deleteTxth',
        method: 'post',
        data: query
    })
}

export function expTalk(query) {
    return request({
        url: '/fdyTalk/excelTxth',
        method: 'post',
        data: query
    })
}












