import request from '@/router/axios'
// 查询报警级别
export const fetchAlarmLevle = (query)=>{
    return request({
      url: '/datamonitor/sysalarmconfig/list',
      method: 'get',
      params: query
    })
}
// 查询 列表数据
export const getList = (query)=>{
    return request({
        url: '/datamonitor/hdalarminfo/getHisByCdt',
        method: 'get',
        params: query
      })
}
// 查询曲线数据
export const getCurveData = (query)=>{
  return request({
      url: '/datamonitor/hdalarminfo/getLineByPg',
      method: 'get',
      params: {...query,itv:"1m"}
    })
}
// 导出历史报表
export const ept_excel= (query)=>{
  return request({
      url: '/datamonitor/hdalarminfo/export',
      method: 'get',
      params: query
    })
}