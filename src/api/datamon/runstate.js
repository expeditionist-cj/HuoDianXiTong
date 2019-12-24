import request from '@/router/axios'

// 查询区域、机组、运行状态
export function getRunState(query) {
  return request({
    url: '/datamonitor/runstate/query',
    method: 'get',
    params: query
  })
}