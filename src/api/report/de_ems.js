import request from '@/router/axios';
// 脱硫装置排放连续检测日平均值月报表
export const get_de_ems = (query) => {
    return request({
        url: '/datamonitor/desulphurizeExpendStatistics/selectByParam',
        method: 'get',
        params: query
    })
}
// 删除
export const del_de_ems = (query) => {
    return request({
        url: '/datamonitor/desulphurizeExpendStatistics/delete',
        method: 'post',
        data: query
    })
}
// 更新
export const update_de_ems = (query) => {
    return request({
        url: '/datamonitor/desulphurizeExpendStatistics/update',
        method: 'post',
        data: query
    })
}
// 新增
export const add_de_ems = (query) => {
    return request({
        url: '/datamonitor/desulphurizeExpendStatistics/insert',
        method: 'post',
        data: query
    })
}
// 保存所有
export const update_de_all = (query) => {
    return request({
        url: '/datamonitor/desulphurizeExpendStatistics/batInsert',
        method: 'post',
        data: query
    })
}