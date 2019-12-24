import request from '@/router/axios';
// 当月脱硫、脱硝装置电量统计数据
export const get_device_power = (query) => {
    return request({
        url: '/datamonitor/device_power/month',
        method: 'get',
        params: query
    })
}