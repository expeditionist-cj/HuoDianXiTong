import request from '@/router/axios'
// 查询装置数量及容量
export const getDeviceBaseData = () => {
    return request({
        url: '/datamonitor/hdDataAnalysis/deviceBaseData',
        method: 'get'
    })
}
// 查询装置数量及容量
export const getCapacityBaseData = () => {
    return request({
        url: '/datamonitor/data_analyze_xy/cxCpNum',
        method: 'get'
    })
}
// 查询所有项目
export const getAllPlant = () => {
    return request({
        url: '/datamonitor/data_analyze_xy/queryAllPlant',
        method: 'get'
    })
}
// 发电量对标分析
export const getPowerData = (query) => {
    return request({
        url: '/datamonitor/hdDataAnalysis/genPowerAnalysis',
        method: 'get',
        params: query
    })
}
// 合格投运率对标分析
export const getQualifyData = (query) => {
    return request({
        url: '/datamonitor/data_analyze_xy/runRate',
        method: 'post',
        data: query
    })
}
// 能耗物耗对标分析
export const getConsumData = (query) => {
    return request({
        url: '/datamonitor/hdDataAnalysis/genConsum',
        method: 'get',
        params: query
    })
}
// 污染物排放对标分析
export const getPollutantData = (query) => {
    return request({
        url: '/datamonitor/data_analyze_xy/wasteEmission',
        method: 'post',
        data: query
    })
}
