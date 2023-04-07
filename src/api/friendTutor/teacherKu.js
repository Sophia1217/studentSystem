import request from "@/utils/request.js"



//导师库-列表查询
export function queryPbsqDskList(query) {
    return request({
        url: '/rcswPbfdPbsq/queryPbsqDskList',
        method: 'post',
        data: query
    })
  }
  

  
  //导师库-修改在岗状态
export function update(query) {
    return request({
        url: '/rcswPbfdPbsq/updatePbsqDskZgzt',
        method: 'post',
        data: query
    })
  }
