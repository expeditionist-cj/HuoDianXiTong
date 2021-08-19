import request from '@/router/axios'

// 查询
export function getAlarm(query) {
  return request({
    url: '/datamonitor/hdMultiAlarmConfig/page',
    method: 'get',
    params: query
  })
}
// 单点校验
export function validateSinglePoint(query) {
  return request({
    url: '/datamonitor/hdMultiAlarmConfig/valid',
    method: 'get',
    params: query
  })
}
// 多点校验
export function validatePoints(query) {
  return request({
    url: '/datamonitor/hdMultiAlarmConfig/validAlgorithm',
    method: 'post',
    data: query
  })
}
// 新增
export function addAlarm(query) {
  return request({
    url: '/datamonitor/hdMultiAlarmConfig/batchInsert',
    method: 'post',
    data: query
  })
}
// 修改
export function updateAlarm(query) {
  return request({
    url: '/datamonitor/hdMultiAlarmConfig/update',
    method: 'post',
    data: query
  })
}
// 删除
export function delAlarm(query) {
  return request({
    url: '/datamonitor/hdMultiAlarmConfig/removeById',
    method: 'post',
    data: query
  })
}
// 启停
export function changeEnable(query) {
  return request({
    url: '/datamonitor//hdMultiAlarmConfig/revertStatusById',
    method: 'get',
    params: query
  })
}

