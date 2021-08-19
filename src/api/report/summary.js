import request from '@/router/axios';
//  ------------   汇 总 表   ---------------


// 脱硝年月表
export const get_nx_sum = (yOrm,query) => {
    return request({
        url: `/datamonitor/noxSmr/${yOrm}`,
        method: 'get',
        params: query
    })
}
// 脱硝区域合计
export const get_nx_area = (query) => {
    return request({
        url: `/datamonitor/noxSmr/getAreaSmr`,
        method: 'get',
        params: query
    })
}

// 脱硫年月表
export const get_de_sum = (yOrm,query) => {
    return request({
        url: `/datamonitor/desulfurizationSummry/${yOrm}`,
        method: 'get',
        params: query
    })
}
// 脱硫年表--选择了区域
export const get_de_sum_area = (query) => {
    return request({
        url: '/datamonitor/desulfurizationSummry/selectByYearCode',
        method: 'get',
        params: query
    })
}
// 月表修改
export const de_xq_update = (query) => {
    return request({
        url: "/datamonitor/hdmonthreportmanualdata/update",
        method: 'post',
        data: query
    })
}

//批量插入
export const update_all = (query) => {
    return request({
        url: "/datamonitor/hdmonthreportmanualdata/bat",
        method: 'post',
        data: query
    })
}