
import request from '@/utils/request'


//简述及建议修改/评分和评价
export function alterIntro(data) {
    return request({
      url: '/syfzYyjg/alterIntro',
      method: 'post',
      data: data
    })
  }

  
//登记表新增/修改
export function alterRegis(data) {
    return request({
      url: '/syfzYyjg/alterRegis',
      method: 'post',
      data: data
    })
  }

  //已咨询列表
export function consultedList(data) {
    return request({
      url: '/syfzYyjg/consultedList',
      method: 'post',
      data: data
    })
  }

  
  //管理员视角-预约结果查询
  
export function consultedListAuth(data) {
    return request({
      url: '/syfzYyjg/consultedListAuth',
      method: 'post',
      data: data
    })
  }

  

//待咨询列表
export function consultingList(data) {
    return request({
      url: '/syfzYyjg/consultingList',
      method: 'post',
      data: data
    })
  }
  
  //咨询确认
export function consultSave(data) {
    return request({
      url: '/syfzYyjg/consultSave',
      method: 'post',
      data: data
    })
  }
  //登记表查询
export function personalRegis(data) {
    return request({
      url: '/syfzYyjg/personalRegis',
      method: 'post',
      data: data
    })
  }
  //推送
export function sendMessage(data) {
    return request({
      url: '/syfzYyjg/sendMessage',
      method: 'post',
      data: data
    })
  }