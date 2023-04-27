/*
 * @Author: qingtian
 * @Date: 2023-02-09 09:47:36
 * @LastEditTime: 2023-04-20 10:11:37
 * @LastEditors: ***
 * @Description:
 * @FilePath: \studentsystem\src\api\common\liucheng.js
 */
import request from "@/utils/request";

// 根据流程实例号查询流程日志
export function queryLc(query) {
  return request({
    url: "/flowableCommonController/queryFlowableComment",
    method: "get",
    params: query,
  });
}

// 根据流程实例号查询流程日志
export function queryXjydAuth(query) {
  return request({
    url: "/flowBusiness/queryRcswXjydTabByXh",
    method: "get",
    params: query,
  });
}

// 根据模块名称返回对应流程编号
export function queryFlowIdByMk(query) {
  return request({
    url: "/flowable/getFlowIdByMk",
    method: "get",
    params: query,
  });
}

export function lctjTable(query) {
  return request({
    url: "/flowable/analyzeFlowByMkaTable",
    method: "post",
    data: query,
  });
}

export function lctjHeader(query) {
  return request({
    url: "/flowable/getFlowNodeName",
    method: "post",
    data: query,
  });
}

export function getMkIdAndMkList(query) {
  return request({
    url: "/flowable/getMkIdAndMkList",
    method: "get",
    params: query,
  });
}
//撤回操作
export function chbyId(query) {
  return request({
    url: '/flowable/chbyId',
    method: 'post',
    data: query
  })
}
