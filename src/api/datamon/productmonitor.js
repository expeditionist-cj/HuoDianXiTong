import request from '@/router/axios'

// 分页查询工艺流程图
export function getCraftPage(query) {
  return request({
    url: '/datamonitor/productmon/page',
    method: 'get',
    params: query
  })
}