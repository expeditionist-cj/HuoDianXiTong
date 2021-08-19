import request from '@/router/axios';
// 脱硫装置排放连续检测日平均值月报表
export const get_nx_ems = (query) => {
    return request({
        url: '/datamonitor/hd_txconsume/list',
        method: 'get',
        params: query
    })
}
// 更新
export const update_nx_ems = (query) => {
    return request({
        url: '/datamonitor/hd_txconsume/update',
        method: 'post',
        data: query
    })
}
// 新增
export const add_nx_ems = (query) => {
    return request({
        url: '/datamonitor/hd_txconsume/add',
        method: 'post',
        data: query
    })
}
// 删除
export const del_nx_ems = (query) => {
    return request({
        url: '/datamonitor/hd_txconsume/delete',
        method: 'delete',
        params: query
    })
}
// 保存所有
export const update_all = (query) => {
    return request({
        url: '/datamonitor/hd_txconsume/batch_update',
        method: 'post',
        data: query
    })
}