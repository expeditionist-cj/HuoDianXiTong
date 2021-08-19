import request from '@/router/axios';
// 脱硫装置排放连续检测日平均值月报表
export const get_de_plan = (query) => {
    return request({
        url: '/datamonitor/hdtxindicatoryear/list',
        method: 'get',
        params: query
    })
}
// 删除
export const del_de_plan = (query) => {
    return request({
        url: '/datamonitor/hdtxindicatoryear/delete',
        method: 'delete',
        params: query
    })
}
// 更新
export const update_de_plan = (query) => {
    return request({
        url: '/datamonitor/hdtxindicatoryear/update',
        method: 'post',
        data: query
    })
}
// 新增
export const add_de_plan = (query) => {
    return request({
        url: '/datamonitor/hdtxindicatoryear/add',
        method: 'post',
        data: query
    })
}

// 导入
export const upload_nx_plan = (query) => {
    return request({
        url: '/datamonitor/hdtxindicatoryear/importExcel',
        method: 'post',
        // headers: { 'Content-Type': 'multipart/form-data' },
        data: query
    })
}