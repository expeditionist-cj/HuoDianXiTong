import request from '@/router/axios';

// 查询
export const get = (query) => {
    return request({
        url: '/datamonitor/hdproductionbrief/listByMap',
        method: 'get',
        params: query
    })
}
// 新增
export const add = (query) => {
    return request({
        url: '/datamonitor/hdproductionbrief/save',
        method: 'post',
        data: query
    })
}