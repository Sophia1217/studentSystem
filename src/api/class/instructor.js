import request from "@/utils/request.js";
// 辅导员管理
// 1.辅导员列表查询
export function getPlacementPageList(query) {
  return request({
    url: "/classfdy/getPlacementPageList",
    method: "post",
    data: query,
  });
}

// 2.辅导员任命
// /classfdy/assignFdy
export function getAssignFdy(query) {
  return request({
    url: "/classfdy/assignFdy",
    method: "post",
    data: query,
  });
}

// 3.辅导员撤销任命
export function getRemoveAssignFdy(query) {
  return request({
    url: "/classfdy/removeAssignFdy",
    method: "post",
    data: query,
  });
}

// 4.辅导员任职记录查询
export function getQueryRecords(query) {
  return request({
    url: "/classfdy/queryRecords",
    method: "post",
    data: query,
  });
}

// 5.辅导员任职记录删除
// http://localhost:8081/sws/classfdy/deleteFdyRecords
export function getDeleteFdyRecords(query) {
  return request({
    url: "/classfdy/deleteFdyRecords",
    method: "post",
    data: query,
  });
}
