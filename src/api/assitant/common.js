import request from '@/router/axios'
export const getInstanceId = (query)=>{
    return request({
        url: `/smartassist/basicinfo/queryInstance`,
        method: 'get',
        params: query 
      })
}
export const getDustData = (query)=>{
  return request({
      url: `/smartassist/basicinfo/queryModelRecentCall`,
      method: 'get',
      params: query 
    })
}