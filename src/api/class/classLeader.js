// 班干部列表查询
// localhost:8081/sws/class/queryBgbList POST bjdm
export function getClassLeader(query) {
    return request({
        url: '/class/queryBgbList',
        method: 'post',
        data: query
    })
}


