import request from '@/router/axios';
// 获取两票填写
export const getLp = (query) => {
    return request({
        url: '/datamonitor/hdticketsmrattr/listYear',
        method: 'get',
        params: query
    })
}
// 保存两票统计填写结果
export const saveLpData = (query) => {
    return request({
        url: '/datamonitor/hdticketsmrattr/save',
        method: 'post',
        data: query
    })
}

// 查询两票统计
export const getTwoTicketsData = (query) => {
    return request({
        url: '/datamonitor/two_ticket_statics/list',
        method: 'get',
        params: query
    })
}