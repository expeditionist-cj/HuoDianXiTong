import request from '@/router/axios';
// 启停统计报表
export const get_st_sp_rp = (query) => {
    return request({
        url: '/datamonitor/startStopStatistics/selectByParam',
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