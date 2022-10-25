import request from "@/utils/request.js"


// 带班经历列表查询
export function getRecordList(query) {
    return request({
        url: '/classqueryexp/queryClassQueryExperienceList',
        method: 'post',
        data: query
    })
}
// 取消带班
export function removeDuty(query) {
    return request({
        url: '/classqueryexp/dismissClassQueryExperienceList',
        method: 'post',
        data: query
    })
}