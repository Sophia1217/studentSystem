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
// localhost:8081/sws/classteacher/assignTeacher POST {bjdm-Y, teacherList-Y, rmrgh-任命人工号, rmsj-任命时间(可暂时不填)}
export function assignTeacher(query) {
    return request({
        url: '/classteacher//assignTeacher',
        method: 'post',
        data: query
    })
}


