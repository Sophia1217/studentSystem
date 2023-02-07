import request from "@/utils/request.js"


///rcswJtknKnsq/importInsertJtknKnssq困难生申请
export function insert(query) {
    return request({
        url: '/rcswJtknKnsq/importInsertJtknKnssq',
        method: 'post',
        data: query
    })
  }
  
//困难生学生申请修改
export function update(query) {
    return request({
        url: '/rcswJtknKnsq/importUpdateKnssqxs',
        method: 'post',
        data: query
    })
  }
  //困难生学生申请列表查询
export function queryList(query) {
    return request({
        url: '/rcswJtknKnsq/queryKnssqxsList',
        method: 'post',
        data: query
    })
  }
  //困难生学生提交审核
export function tjKnssqxsById(query) {
    return request({
        url: '/rcswJtknKnsq/tjKnssqxsById',
        method: 'post',
        data: query
    })
  }
  //困难生申请详情查询
export function queryKnssqxsjbxx(query) {
  return request({
      url: '/rcswJtknKnsq/queryKnssqxsjbxx',
      method: 'get',
      params: query
  })
}

//困难生申请删除
export function deletebyId(query) {
  return request({
      url: '/rcswJtknKnsq/delete',
      method: 'post',
      data: query
  })
}

//困难生学生审核撤销
export function cxById(query) {
  return request({
      url: '/rcswJtknKnsq/cxById',
      method: 'post',
      data: query
  })
}
//批量导出困难生学生信息
export function rcswknssq(query) {
  return request({
      url: 'rcswJtknKnsq/export/rcswknssq',
      method: 'post',
      responseType:'blob',
      data: query
  })
}