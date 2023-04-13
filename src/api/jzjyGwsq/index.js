/*
 * @Author: qingtian
 * @Date: 2023-04-12 09:23:43
 * @LastEditTime: 2023-04-13 15:04:42
 * @LastEditors: ***
 * @Description:
 * @FilePath: \studentsystem\src\api\jzjyGwsq\index.js
 */
import request from "@/utils/request";

//岗位申请列表
export function queryList(query) {
  return request({
    url: "/rcswJzjygw/queryGwList",
    method: "post",
    data: query,
  });
}

// 删除
export function delList(query) {
  return request({
    url: "/rcswJzjygw/deleteGw",
    method: "post",
    data: query,
    responseType: "blob",
  });
}

// 复制
export function fuzhi(query) {
  return request({
    url: "/rcswJzjygw/copyGw",
    method: "post",
    data: query,
    responseType: "blob",
  });
}

// 撤回
export function cehui(query) {
  return request({
    url: "/rcswJzjygw/cxById",
    method: "post",
    data: query,
    responseType: "blob",
  });
}

// 提交
export function tj(query) {
  return request({
    url: "/rcswJzjygw/tjById",
    method: "post",
    data: query,
    responseType: "blob",
  });
}

// 新增保存
export function save(query) {
  return request({
    url: "/rcswJzjygw/saveGw",
    method: "post",
    data: query,
  });
}

export function queryXsByXh(query) {
  return request({
    url: "/commonMethod/queryXsByXh",
    method: "get",
    params: query,
  });
}
//
//
//

export function getDshList(query) {
  return request({
    url: "/rcswJzjygw/queryDshDbjz",
    method: "post",
    data: query,
  });
}

// 待审核导出
export function excelLsDshList(query) {
  return request({
    url: "/rcswJzjygw/excelExportRcswDbjzDsh",
    method: "post",
    data: query,
    responseType: "blob",
  });
}

//退回
export function tuihui(query) {
  return request({
    url: "/rcswJzjygw/htFlow",
    method: "post",
    data: query,
  });
}
//拒绝
export function jujue(query) {
  return request({
    url: "/rcswJzjygw/jjFlow",
    method: "post",
    data: query,
  });
}
//通过
export function tongguo(query) {
  return request({
    url: "/rcswJzjygw/tyFlow",
    method: "post",
    data: query,
  });
}

//已处理列表
export function yclList(query) {
  return request({
    url: "/rcswJzjygw/queryYshDbjz",
    method: "post",
    data: query,
  });
}

//已处理列表导出
export function yclListExecl(query) {
  return request({
    url: "/rcswJzjygw/excelExportRcswDbjzYsh",
    method: "post",
    data: query,
    responseType: "blob",
  });
}
