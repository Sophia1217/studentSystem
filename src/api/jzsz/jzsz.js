import request from '@/utils/request'

// 奖助申请奖助设置查询
export function queryLb(query) {
  return request({
    url: '/rcswJzsqJzsz/queryZzxmlb',
    method: 'get',
    params: query
  })
}


//不可兼得设置
export function bkjdsz(query) {
    return request({
      url: '/rcswJzsqJzsz/queryBkjdJxList',
      method: 'get',
      params: query
    })
  }


  //获取学院单位
export function getPydwList(query) {
    return request({
      url: '/rcswJzsqJzsz/getPydwList',
      method: 'post',
      data: query
    })
  }


  //新增保存
export function addSave(query) {
    return request({
        url: '/rcswJzsqJzsz/insertJzsqJzszDetail',
        method: 'post',
        data: query,
    })
}

export function jzsqList(query) {
    return request({
        url: '/rcswJzsqJzsz/queryJzsqJzszList',
        method: 'post',
        data: query,
    })
}

export function changeJzsq(query) {
  return request({
      url: '/rcswJzsqJzsz/updateJzsqJzszListMsg',
      method: 'post',
      data: query,
  })
}

