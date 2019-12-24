import request from '@/router/axios'

// 分页查询
export function fetchList(query) {
  return request({
    url: '/datamonitor/prjinfo/page',
    method: 'get',
    params: query
  })
}

// 项目详情
export function getDetail(deviceId) {
  return request({
    url: `/datamonitor/sysdevice/unitinfo/${deviceId}`,
    method: 'get',
  })
}

