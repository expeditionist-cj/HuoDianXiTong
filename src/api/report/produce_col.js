import request from '@/router/axios';

// 查询
export const getData = (query) => {
    return request({
        url: '/datamonitor/DailyRptAd/getByCdt',
        method: 'get',
        params: query
    })
}

