import request from '@/router/axios'

// 查询各区域报警个数
export function fetchAlarmCount(query) {
  return request({
    url: '/datamonitor/hdalarminfo/getCntByGroupId',
    method: 'get',
    params: query
  })
}

// 查询报警提示信息
export const fetchalarmTipInfo = (query)=>{
  return request({
    url: '/datamonitor/hdalarminfo/getPlantStat',
    method: 'get',
    params: query
  })
}
// 查询报警级别
export const fetchAlarmLevle = (query)=>{
  return request({
    url: '/datamonitor/sysalarmconfig/list',
    method: 'get',
    params: query
  })
}
// 查询实时报警列表信息
export const fetchAlarmTableData = (query)=>{
  return request({
    url: '/datamonitor/hdalarminfo/getByCdt',
    method: 'get',
    params: query
  })
}

