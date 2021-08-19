import request from '@/router/axios';
// 脱硫装置排放连续检测日平均值月报表
export const getDeviceConsum = (data) => {
    return request({
        url: '/datamonitor/hd_power/list',
        method: 'post',
        data
    })
}
export const getPlantConsum = (data) => {
    return request({
        url: '/datamonitor/hd_power/detail',
        method: 'post',
        data
    })
}