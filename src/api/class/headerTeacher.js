import request from '@/utils/request'
// 班主任列表查询
// localhost:8081/sws/classteacher/getTeacherPageList POST {xy-学院代码, xgh-学工号, pageNum-Y, pageSize-Y}
export function getHeaderTeacher(query) {
    return request({
        url: '/classteacher/getTeacherPageList',
        method: 'post',
        data: query
    })
}

// 班主任任命
// localhost:8081/sws/classteacher/assignTeacher POST {bjdm-Y, teacherList-Y, rmrgh-任命人工号(先写死), rmsj-任命时间(可暂时不填)}
export function assignTeacher(query) {
    return request({
        url: '/classteacher/assignTeacher',
        method: 'post',
        data: query
    })
}

// 撤销班主任任命
// localhost:8081/sws/classteacher/removeAssignTeacher post {bjdm-Y, teacherList-Y, cxrGh-Y-撤销人工号(先写死)}
export function removeAssignTeacher(query) {
    return request({
        url: '/classteacher/removeAssignTeacher',
        method: 'post',
        data: query
    })
}

// 班级任职记录查询 localhost:8081/sws/classteacher/queryRecords POST {bjdmY, pageNumY, pageSizeY}
export function queryRecords(query) {
    return request({
        url: '/classteacher/queryRecords',
        method: 'post',
        data: query
    })
}

// 班级任职记录删除 localhost:8081/sws/classteacher/deleteRecords POST {recordsList-Y-记录详细列表}
export function deleteRecords(query) {
    return request({
        url: '/classteacher/deleteRecords',
        method: 'post',
        data: query
    })
}



