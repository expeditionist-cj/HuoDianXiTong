import request from '@/router/axios';
export const getData = (query) => {
    return request({
        url: '/datamonitor/hdDustIndicatorsYear/listByMap',
        method: 'get',
        params: {timeStr:Date.parse(new Date()),...query}
    })
}

// 新增
export const add = (query) => {
    return request({
        url: '/datamonitor/hdDustIndicatorsYear/save',
        method: 'post',
        data: query
    })
}

// 修改
export const modify = (query) => {
    return request({
        url: '/datamonitor/hdDustIndicatorsYear/updateById',
        method: 'post',
        data: query
    })
}

// 删除
export const del = (query) => {
    return request({
        url: '/datamonitor/hdDustIndicatorsYear/removeById',
        method: 'post',
        data: query
    })
}

// 导入
export const upload_dust_plan = (query) => {
    return request({
        url: '/datamonitor/hdDustIndicatorsYear/importExcel',
        method: 'post',
        // headers: { 'Content-Type': 'multipart/form-data' },
        data: query
    })
}