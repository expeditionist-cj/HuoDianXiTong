import request from '@/router/axios';
// 当月发电量和上网电量
export const get_gen_cap = (query) => {
    return request({
        url: '/datamonitor/homePage/homePageGenerationCapacityData',
        method: 'get',
        params: query
    })
}
// 减排统计
export const getEmis = (query) => {
    return request({
        url: '/datamonitor/homePage/homePageEmissionReductionRnergyConsumption',
        method: 'get',
        params: query
    })
}
// 基础数据
export const getBaseData = (query) => {
    return request({
        url: '/datamonitor/homePage/homePageBaseData',
        method: 'get',
        params: query
    })
}

// 能耗与物耗
export const getCons = (query) => {
    return request({
        url: '/datamonitor/homePage/homePageEnergyMaterial',
        method: 'get',
        params: query
    })
}