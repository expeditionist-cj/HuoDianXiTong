import request from '@/router/axios';
//  ------------   汇 总 表   ---------------

//  月报
export let getMonthData = (query) => {
  return request({
    url: '/datamonitor/sewage_report/month',
    method: 'get',
    params: query
  })
}
//  日报
export let getDayInMonthData = (query) => {
  return request({
    url: '/datamonitor/sewage_report/day',
    method: 'get',
    params: query
  })
}
//  单项目月详情表
export let getDayData = (query) => {
  return request({
    url: '/datamonitor/sewage_report/month_plant',
    method: 'get',
    params: query
  })
}
// 调整项
export let saveAdjust = (data) => {
  return request({
    url: '/datamonitor/sewage_report/adjust',
    method: 'post',
    data
  })
}
 
