/*
 * @Author: qingtian
 * @Date: 2023-03-21 14:09:58
 * @LastEditTime: 2023-03-21 16:53:59
 * @LastEditors: ***
 * @Description:
 * @FilePath: \studentsystem\src\api\kcpk\index.js
 */
import request from "@/utils/request";

//新增
export function kcpkAdd(query) {
  return request({
    url: "/rcswPbfdKcb/insertKc",
    method: "post",
    data: query,
  });
}

//列表
export function kcpkList(query) {
  return request({
    url: "/rcswPbfdKcb/queryList",
    method: "post",
    data: query,
  });
}

//模板下载
export function kcpkMbDown(query) {
  return request({
    url: "/rcswPbfdKcb/downLoad",
    method: "post",
    data: query,
    responseType: "blob",
  });
}

//课程排课导出
export function kcpkExport(query) {
  return request({
    url: "/rcswPbfdKcb/excelExport",
    method: "post",
    data: query,
    responseType: "blob",
  });
}

//列表
export function delList(query) {
  return request({
    url: "/rcswPbfdKcb/delete",
    method: "post",
    data: query,
  });
}

export function upList(query) {
  return request({
    url: "/rcswPbfdKcb/updateKc",
    method: "post",
    data: query,
  });
}
