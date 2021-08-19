import request from '@/router/axios'; 
 

//  日报查询
export const getData = (query) => {
    return request({
        url: "/datamonitor/DailyRptMd/getByCdt",
        method: 'get',
        params: query
    })
}

//废水查询
export const getFsData = (query) => {
    return request({
        url: "/datamonitor/hdmonthreportmanualdata/getHdMonthReportManualDataFs",
        method: 'get',
        params: query
    })
}
//废水单行插入
export const saveFsRow = (query) => {
    return request({
        url: "/datamonitor/hdmonthreportmanualdata/update",
        method: 'post',
        data: query
    })
}
//废水单行插入
export const update_fs_all = (query) => {
    return request({
        url: "/datamonitor/hdmonthreportmanualdata/update",
        method: 'post',
        data: query
    })
}

//日报查询填报的限制时间
export const getLmtHour = () => {
    return request({
        url: "/datamonitor/DailyRptMd/getLmtHm",
        method: 'get',
    })
}