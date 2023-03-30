/*
 * @Author: qingtian
 * @Date: 2023-03-28 14:56:18
 * @LastEditTime: 2023-03-30 14:36:30
 * @LastEditors: ***
 * @Description:
 * @FilePath: \studentsystem\src\api\teacherTea\index.js
 */
import request from "@/utils/request.js";
//查询列表
export function queryList(query) {
  return request({
    url: "/rcswJsxwchd/queryJsxwchdList",
    method: "post",
    data: query,
  });
}

//删除
export function delList(query) {
  return request({
    url: "/rcswJsxwchd/deleteJsxwchd",
    method: "post",
    data: query,
  });
}

//申请开关
export function sqkg(query) {
  return request({
    url: "/rcswJsxwchd/updateSqKg",
    method: "post",
    data: query,
  });
}

//发起评价
export function fqpj(query) {
  return request({
    url: "/rcswJsxwchd/updatePjKg",
    method: "post",
    data: query,
  });
}

//详情
export function getDetail(query) {
  return request({
    url: "/rcswJsxwchd/queryJsxwchdcyrList",
    method: "get",
    params: query,
  });
}

//活动保存
export function add(query) {
  return request({
    url: "/rcswJsxwchd/importJsxwchd",
    method: "post",
    data: query,
  });
}

//查看评价明细列表
export function pjmxList(query) {
  return request({
    url: "/rcswJsxwchd/queryJsxwcPjList",
    method: "post",
    data: query,
  });
}

export function exp(query) {
  return request({
    url: "/rcswJsxwchd/excelExporthdlb",
    method: "post",
    data: query,
    responseType: "blob",
  });
}
