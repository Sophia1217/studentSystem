/*
 * @Author: qingtian
 * @Date: 2023-04-04 15:14:14
 * @LastEditTime: 2023-04-21 14:04:22
 * @LastEditors: ***
 * @Description:
 * @FilePath: \studentsystem\src\api\lcjk.js
 */
import request from "@/utils/request";

//学籍异动
export function xjydJkList(query) {
  return request({
    url: "/rcswXjyd/queryJKLB",
    method: "post",
    data: query,
  });
}

//学籍异动导出
export function xjydJkListEXP(query) {
  return request({
    url: "/rcswXjyd/excelExportQueryJKLB",
    method: "post",
    data: query,
    responseType: "blob",
  });
}

//大病救助
export function dbjzJkList(query) {
  return request({
    url: "/rcswDbjzsq/queryJKLB",
    method: "post",
    data: query,
  });
}

//大病救助导出
export function dbjzJkListEXP(query) {
  return request({
    url: "/rcswDbjzsq/excelExportQueryJKLB",
    method: "post",
    data: query,
    responseType: "blob",
  });
}

//成长档案
export function czdaList(query) {
  return request({
    url: "/czdaFlow/queryJKLB",
    method: "post",
    data: query,
  });
}

//成长档案
export function czdaListEXP(query) {
  return request({
    url: "/czdaFlow/excelExportQueryJKLB",
    method: "post",
    data: query,
    responseType: "blob",
  });
}

//单位鉴定
export function byjdList(query) {
  return request({
    url: "/rcswByjd/queryJKLB",
    method: "post",
    data: query,
  });
}

//单位鉴定
export function byjdEXP(query) {
  return request({
    url: "/rcswByjd/excelExportQueryJKLB",
    method: "post",
    data: query,
    responseType: "blob",
  });
}

//火车乘车优惠
export function ccyhList(query) {
  return request({
    url: "/ChyhFlow/queryJKLB",
    method: "post",
    data: query,
  });
}

//火车乘车优惠
export function ccyhEXP(query) {
  return request({
    url: "/ChyhFlow/excelExportQueryJKLB",
    method: "post",
    data: query,
    responseType: "blob",
  });
}

//国家助学贷款
export function gjzxdkList(query) {
  return request({
    url: "/rcswGjzxdk/queryJKLB",
    method: "post",
    data: query,
  });
}

//国家助学贷款
export function gjzxdkEXP(query) {
  return request({
    url: "/rcswGjzxdk/excelExportQueryJKLB",
    method: "post",
    data: query,
    responseType: "blob",
  });
}

//基层就业
export function jcjyDkbcList(query) {
  return request({
    url: "/jcjyDkbc/queryJKLB",
    method: "post",
    data: query,
  });
}

//基层就业
export function jcjyDkbcEXP(query) {
  return request({
    url: "/jcjyDkbc/excelExportQueryJKLB",
    method: "post",
    data: query,
    responseType: "blob",
  });
}

//教授下午茶
export function jsxwcList(query) {
  return request({
    url: "/jsxwc/queryJKLB",
    method: "post",
    data: query,
  });
}

//教授下午茶
export function jsxwcEXP(query) {
  return request({
    url: "/jsxwc/excelExportQueryJKLB",
    method: "post",
    data: query,
    responseType: "blob",
  });
}

//违纪处分
export function wjcfList(query) {
  return request({
    url: "/rcswWjcf/queryJKLB",
    method: "post",
    data: query,
  });
}
///
//违纪处分
export function wjcfEXP(query) {
  return request({
    url: "/rcswWjcf/excelExportQueryJKLB",
    method: "post",
    data: query,
    responseType: "blob",
  });
}

//学年小结
export function xnxjList(query) {
  return request({
    url: "/rcswXnxjFlow/queryJKLB",
    method: "post",
    data: query,
  });
}
//学年小结
export function xnxjEXP(query) {
  return request({
    url: "/rcswXnxjFlow/excelExportQueryJKLB",
    method: "post",
    data: query,
    responseType: "blob",
  });
}

//证件补办
export function zjbbList(query) {
  return request({
    url: "/zjbbFlow/queryJKLB",
    method: "post",
    data: query,
  });
}

//证件补办
export function zjbbEXP(query) {
  return request({
    url: "/zjbbFlow/excelExportQueryJKLB",
    method: "post",
    data: query,
    responseType: "blob",
  });
}

export function lsknList(query) {
  return request({
    url: "/rcswLskn/queryJKLB",
    method: "post",
    data: query,
  });
}

//临时困难
export function lsknEXP(query) {
  return request({
    url: "rcswLskn/excelExportQueryJKLB",
    method: "post",
    data: query,
    responseType: "blob",
  });
}
