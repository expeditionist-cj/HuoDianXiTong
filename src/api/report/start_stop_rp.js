import request from '@/router/axios';
// 启停统计报表
export const get_st_sp_rp = (query) => {
    return request({
        url: '/datamonitor/startStopStatistics/selectByParam',
        method: 'get',
        params: query
    })
}
// 启停统计报表--新
export const selectUnitRunStatus = (query) => {
  return request({
      url: '/datamonitor/hdunitrunstatus/selectUnitRunStatus',
      method: 'get',
      params: query
  })
}

// 报表下载
export const get_excel = (query) => {
    return request({
        url: '/datamonitor/startStopStatistics/selectByParamExcel',
        method: 'get',
        params: query
    })
} 

// 设置启停
export const saveStatusPoint = (data) => {
  return request({
      url: '/datamonitor/hdunitrunstatus/saveStatusPoint',
      method: 'post',
      data
  })
}