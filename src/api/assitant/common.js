import request from '@/router/axios'
import moment from 'moment'
export const getInstanceId = (query) => {
    return request({
        url: `/smartassist/basicinfo/queryInstance`,
        method: 'get',
        params: query
    })
}
//烟气流量智能分析接口
export const getDustData = (query) => {
    return request({
        url: `/smartassist/basicinfo/queryModelRecentCall`,
        method: 'get',
        params: query
    })
}
// 查询模型实列曲线过去两小时运行情况
export const getCurveData = (instanceId,
    beginTime = moment(Date.now()).subtract(3, "hours").format("YYYY-MM-DD HH:mm:ss"),
    endTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')) => {
    return request.get("/smartassist/basicinfo/queryCurveData", {
        params: {
            instanceId, beginTime, endTime
        }
    }).then(res => {
        return res.data.data
    })
}
// 查询历史曲线
export const getHistoryCurveData = (instanceId, beginTime, endTime, interval) => {
    
    return request.get("/smartassist/basicinfo/queryCurveData", {
        params: {
            instanceId, beginTime, endTime, interval
        }
    }).then(res => {
        return res.data.data
    })
}

