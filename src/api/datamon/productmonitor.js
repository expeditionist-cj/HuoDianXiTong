import request from '@/router/axios'

// 分页查询工艺流程图
export function getCraftPage(query) {
  return request({
    url: '/datamonitor/productmon/page',
    method: 'get',
    params: query
  })
}
export function getCraft(query) {
  return request({
    url: '/datamonitor/sysdevice/all',
    method: 'get',
    params: query
  })
}
export function getProcessFlowChart(query) {
  return request({
    url: '/datamonitor/datamonitor/sysdevice/all/zhst/processFlowChart/selectProcessFlowChart',
    method: 'get',
    params: query
  })
}