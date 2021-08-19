import request from '@/router/axios';
// 脱硫装置排放连续检测日平均值月报表
export const get_de_plan = (query) => {
    return request({
        url: '/datamonitor/hdtsindicatoryear/list',
        method: 'get',
        params: query
    })
}
// 删除
export const del_de_plan = (query) => {
    return request({
        url: '/datamonitor/hdtsindicatoryear/delete',
        method: 'delete',
        params: query
    })
}
// 更新
export const update_de_plan = (query) => {
    return request({
        url: '/datamonitor/hdtsindicatoryear/update',
        method: 'post',
        data: query
    })
}
// 新增
export const add_de_plan = (query) => {
    return request({
        url: '/datamonitor/hdtsindicatoryear/add',
        method: 'post',
        data: query
    })
}

// 导入
export const upload_de_plan = (query) => {
    return request({
        url: '/datamonitor/hdtsindicatoryear/importExcel',
        method: 'post',
        // headers: { 'Content-Type': 'multipart/form-data' },
        data: query
    })
}