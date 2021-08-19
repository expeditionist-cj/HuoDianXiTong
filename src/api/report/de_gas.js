import request from '@/router/axios';
// 脱硫装置排放连续检测日平均值月报表
export const get_de_gas = (query) => {
    return request({
        url: '/datamonitor/emsOver/getSo2Stat',
        method: 'get',
        params: query
    })
}
// 导出excel 
export const get_de_gas_excel = (query) => {
    return request({
        url: '/datamonitor/emsOver/so2Exp',
        method: 'get',
        params: query
    })
}
// 调整保存
export const  saveAdjust= (data) => {
    return request({
        url: '/datamonitor/emsOver/so2Adjust',
        method: 'post',
        data: data
    })
}