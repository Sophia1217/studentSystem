import request from "@/utils/request.js"

// localhost:8081/sws/class/queryBgbList POST bjdm
// 查询某班级学生列表
export function getQueryStuList(query) {
    return request({
        url: '/class/queryStuList',
        method: 'post',
        data: query
    })
}