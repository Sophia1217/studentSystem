import request from "@/utils/request";

//学生端解除处分按钮
export function jccfButton(query) {
  return request({
    url: "/rcswJccf/saveJd",
    method: "post",
    data: query,
  });
}

//教师端待审核
export function dshList(query) {
  return request({
    url: "/rcswJccf/queryDshJccf",
    method: "post",
    data: query,
  });
}

//教师端已处理
export function yclList(query) {
  return request({
    url: "/rcswJccf/queryYclJccf",
    method: "post",
    data: query,
  });
}

export function getTeaDetail(query) {
  return request({
    url: "/rcswJccf/queryJccfDetail",
    method: "post",
    data: query,
  });
}

//同意
export function tyFlow(query) {
  return request({
    url: "/rcswJccf/tyFlow",
    method: "post",
    data: query,
  });
}

//拒绝
export function jjFlow(query) {
  return request({
    url: "/rcswJccf/jjFlow",
    method: "post",
    data: query,
  });
}
//退回
export function htFlow(query) {
  return request({
    url: "/rcswJccf/htFlow",
    method: "post",
    data: query,
  });
}

export function jgwhList(query) {
  return request({
    url: "/rcswJccf/queryJccfResultList",
    method: "post",
    data: query,
  });
}

export function updateJccfwh(query) {
  return request({
    url: "/rcswJccf/updateJccfwh",
    method: "post",
    data: query,
  });
}

export function dshEXP(query) {
  return request({
    url: "/rcswJccf/excelExportRcswJccfDsh",
    method: "post",
    data: query,
    responseType: "blob",
  });
}
export function yclEXP(query) {
  return request({
    url: "/rcswJccf/excelExportRcswJccfDsh",
    method: "post",
    data: query,
    responseType: "blob",
  });
}
export function resEXP(query) {
  return request({
    url: "/rcswJccf/excelExportJccfResultList",
    method: "post",
    data: query,
    responseType: "blob",
  });
}

export function mbDown(query) {
  return request({
    url: "/rcswJccf/downLoad",
    method: "post",
    data: query,
    responseType: "blob",
  });
}
