import request from '@/router/axios';
// 当月发电量和上网电量
export const get_emsOver = (query) => {
    return request({
        url: '/datamonitor/emsOver/getStatByCdt',
        method: 'get',
        params: query
    })
}