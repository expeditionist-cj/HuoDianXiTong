import request from '@/router/axios';

// 查询
export const getData = (query) => {
    return request({
        url: '/datamonitor/hddustplanningindicators/listByMap',
        method: 'get',
        params: query
    })
}

// 新增
export const add = (query) => {
    return request({
        url: '/datamonitor/hddustplanningindicators/save',
        method: 'post',
        data: query
    })
}

// 修改
export const modify = (query) => {
    return request({
        url: '/datamonitor/hddustplanningindicators/updateById',
        method: 'post',
        params: query
    })
}

// 删除
export const del = (query) => {
    return request({
        url: '/datamonitor/hddustplanningindicators/removeById',
        method: 'post',
        params: query
    })
}