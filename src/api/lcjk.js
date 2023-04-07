/*
 * @Author: qingtian
 * @Date: 2023-04-04 15:14:14
 * @LastEditTime: 2023-04-06 15:22:56
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
