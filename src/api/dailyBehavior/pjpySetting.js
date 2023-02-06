import request from "@/utils/request.js"
//常用参数查询
export function queryTag(query) {
    return request({
        url: '/fdyCyTable/queryFdyCyTable',
        method: 'post',
        data: query
    })
}

export function addPycc(query) {
    return request({
        url: '/pjpysz/queryMxdxTjList',
        method: 'get',
        params: query
    })
}

export function expTalk(query) {
    return request({
        url: '/fdyTalk/excelTxth',
        method: 'post',
        data: query,
      responseType:'blob'
    })
}

//面向对象确定
export function mxdxSure(query) {
    return request({
        url: '/pjpysz/queryPjszFpList',
        method: 'post',
        data: query,
    })
}


//模拟分配
export function mnfp(query) {
    return request({
        url: '/pjpysz/queryPjszFpAllList',
        method: 'post',
        data: query,
    })
}

//新增保存
export function addSave(query) {
    return request({
        url: '/pjpysz/insertPjszDetail',
        method: 'post',
        data: query,
    })
}

//列表
export function pjList(query) {
    return request({
        url: '/pjpysz/queryPjszList',
        method: 'post',
        data: query,
    })
}


export function pjjxListQuery(query) {
    return request({
        url: '/rcswpjpysq/getAllpjjx',
        method: 'get',
        params: query
    })
}

//评奖设置列表更新文号、时间、开关
export function changePjsz(query) {
    return request({
        url: '/pjpysz/updatePjszListMsg',
        method: 'post',
        data: query,
    })
}





















