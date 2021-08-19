import request from '@/router/axios';

// 查询
export const getData = (query) => {
    return request({
        url: '/datamonitor/DailyRptMd/report',
        method: 'get',
        params: query
    })
}
// 新增
export const add = (query) => {
    return request({
        url: '/datamonitor/DailyRptMd/add',
        method: 'post',
        data: query
    })
}
// 修改
export const update = (query) => {
    return request({
        url: '/datamonitor/DailyRptMd/mdf',
        method: 'post',
        data: query
    })
}
// 删除
export const del = (query) => {
    return request({
        url: '/datamonitor/DailyRptMd/del',
        method: 'get',
        params: query
    })
}
// 保存所有
export const saveAllData = (query) => {
    return request({
        url: '/datamonitor/DailyRptMd/bat',
        method: 'post',
        data: query
    })
}
