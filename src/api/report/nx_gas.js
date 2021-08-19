import request from '@/router/axios';
// 脱硫装置排放连续检测日平均值月报表
export const get_nx_gas = (query) => {
    return request({
        url: '/datamonitor/emsOver/getNoxStat',
        method: 'get',
        params: query
    })
}
// 调整保存
export const  saveAdjust= (data) => {
    return request({
        url: '/datamonitor/emsOver/noxAdjust',
        method: 'post',
        data: data
    })
}