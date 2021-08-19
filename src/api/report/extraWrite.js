import request from '@/router/axios'; 

 
//未上线项目查询
export const getPlants = (query) => {
    return request({
        url: '/datamonitor/TmpDailyRpt/getPlantByMonth',
        method: 'get', 
        params: query
    })
}
//日报查询
export const getDelList = (deptCode) => {
    return request({
        url: `/admin/dept/delList/1/${deptCode}`,
        method: 'get', 
    })
}
// 查询
export const getData = (query) => {
    return request({
        url: '/datamonitor/TmpDailyRpt/getByCdt',
        method: 'get',
        params: query
    })
}
// 更新 
export const updateData = (query) => {
    return request({
        url: "/datamonitor/TmpDailyRpt/mdf",
        method: 'post',
        data: query
    })
}