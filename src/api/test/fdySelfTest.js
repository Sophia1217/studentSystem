import request from "@/utils/request.js"
//辅导员自评
  export function queryList(query) {
    return request({
        url: '/fdyzp/queryFdySelfEvaList',
        method: 'post',
        data: query
    })
  }
 
  //辅导员自评详情

  export function getFdyZpDetail(query) {
    return request({
        url: '/fdyzp/getFdyZpDetail',
        method: 'post',
        data: query
    })
  }
  
//辅导员自评详情保存
export function updateFdyZpDetail(query) {
  return request({
      url: '/fdyzp/updateFdyZpDetail',
      method: 'post',
      data: query
  })
}


//辅导员自评new
export function queryFdySelfEvaListNew(query) {
  return request({
      url: '/fdyzp/queryFdySelfEvaListNew',
      method: 'post',
      data: query
  })
}

//辅导员自评确认
export function checkFdyList(query) {
  return request({
      url: '/fdyzp/checkFdyList',
      method: 'post',
      data: query
  })
}

//辅导员自评删除
export function deleteFdyList(query) {
  return request({
      url: '/fdyzp/deleteFdyList',
      method: 'post',
      data: query
  })
}


//辅导员自评年度

export function getFdyNdByGh(query) {
  return request({
      url: '/fdyzp/getFdyNdByGh',
      method: 'post',
      data: query
  })
}
//

//辅导员自评时间查询
export function getKgsz(query) {
  return request({
      url: '/fdyzp/getKgsz',
      method: 'post',
      data: query
  })
}
//辅导员自评时间设置
export function updateKgsz(query) {
  return request({
      url: '/fdyzp/updateKgsz',
      method: 'post',
      data: query
  })
}

//辅导员自评开关时间新增
export function insertKgsz(query) {
  return request({
      url: '/fdyzp/insertKgsz',
      method: 'post',
      data: query
  })
}

//请求年度
export function getYears(query) {
  return request({
      url: '/fdyzp/getYears',
      method: 'post',
      data: query
  })
}
//导出
export function Export(query) {
  return request({
      url: '/fdyzp/export/rcswFdyZpbxx',
      method: 'post',
      data: query,
      responseType:'blob'
  })
}