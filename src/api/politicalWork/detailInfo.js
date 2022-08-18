import request from '@/utils/request'

// 新增工作简历
export function addWorkBrife(query) {
  return request({
    url: '/gzjl/insert',
    method: 'post',
    data: query
  })
}

// 修改工作简历
export function modifyWorkBrife(query) {
  return request({
    url: '/gzjl/update',
    method: 'post',
    data: query
  })
}

// 删除工作简历
export function deleteWorkBrife(query) {
  return request({
    url: '/gzjl/delete',
    method: 'post',
    params: query
  })
}

// 新增专业技术职务
export function addTechnical(query) {
  return request({
    url: '/zyjszw/insert',
    method: 'post',
    data: query
  })
}

// 修改专业技术职务
export function modifyTechnical(query) {
  return request({
    url: '/zyjszw/update',
    method: 'post',
    data: query
  })
}

// 删除专业技术职务
export function deleteTechnical(query) {
  return request({
    url: '/zyjszw/delete',
    method: 'post',
    params: query
  })
}

// 新增学习培训
export function addTrain(query) {
  return request({
    url: '/xxpx/insert',
    method: 'post',
    data: query
  })
}

// 修改学习培训
export function modifyTrain(query) {
  return request({
    url: '/xxpx/update',
    method: 'post',
    data: query
  })
}

// 删除学习培训
export function deleteTrain(query) {
  return request({
    url: '/xxpx/delete',
    method: 'post',
    params: query
  })
}

// 新增年度考核
export function addExam(query) {
  return request({
    url: '/xxpx/insert',
    method: 'post',
    data: query
  })
}

// 修改年度考核
export function modifyExam(query) {
  return request({
    url: '/xxpx/update',
    method: 'post',
    data: query
  })
}

// 删除年度考核
export function deleteExam(query) {
  return request({
    url: '/xxpx/delete',
    method: 'post',
    params: query
  })
}

// 新增奖励表彰
export function addReward(query) {
  return request({
    url: '/jlbz/insert',
    method: 'post',
    data: query
  })
}

// 修改奖励表彰
export function modifyReward(query) {
  return request({
    url: '/jlbz/update',
    method: 'post',
    data: query
  })
}

// 删除奖励表彰
export function deleteReward(query) {
  return request({
    url: '/jlbz/delete',
    method: 'post',
    params: query
  })
}

// 新增项目科研情况
export function addProject(query) {
  return request({
    url: '/xmkyqk/insert',
    method: 'post',
    data: query
  })
}

// 修改项目科研情况
export function modifyProject(query) {
  return request({
    url: '/xmkyqk/update',
    method: 'post',
    data: query
  })
}

// 删除项目科研情况
export function deleteProject(query) {
  return request({
    url: '/xmkyqk/delete',
    method: 'post',
    params: query
  })
}

// 新增论文科研情况
export function addThesis(query) {
  return request({
    url: '/lwkyqk/insert',
    method: 'post',
    data: query
  })
}

// 修改论文科研情况
export function modifyThesis(query) {
  return request({
    url: '/lwkyqk/update',
    method: 'post',
    data: query
  })
}

// 删除论文科研情况
export function deleteThesis(query) {
  return request({
    url: '/lwkyqk/delete',
    method: 'post',
    params: query
  })
}

// 新增著作科研情况
export function addWriting(query) {
  return request({
    url: '/zzkyqk/insert',
    method: 'post',
    data: query
  })
}

// 修改著作科研情况
export function modifyWriting(query) {
  return request({
    url: '/zzkyqk/update',
    method: 'post',
    data: query
  })
}

// 删除著作科研情况
export function deleteWriting(query) {
  return request({
    url: '/zzkyqk/delete',
    method: 'post',
    params: query
  })
}

// 新增教学情况科研情况
export function addTeaching(query) {
  return request({
    url: '/jxkyqk/insert',
    method: 'post',
    data: query
  })
}

// 修改教学情况科研情况
export function modifyTeaching(query) {
  return request({
    url: '/jxkyqk/update',
    method: 'post',
    data: query
  })
}

// 删除教学情况科研情况
export function deleteTeaching(query) {
  return request({
    url: '/jxkyqk/delete',
    method: 'post',
    params: query
  })
}
