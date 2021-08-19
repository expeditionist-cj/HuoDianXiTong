import request from '@/router/axios'
// 查询区域、项目
// type 0 无权限 1 有权限
export const getAreaAndPlant = (type,pid)=>{
    return request({
        url: `/admin/dept/list/${type}/${pid}`,
        method: 'get',
      })
}
// 查询机组
export const getUnit = (pid)=>{
  return request({
      url: `datamonitor/sysdevice/deptlist/${pid}`,
      method: 'get',
    })
}
// 数据字典
export const checkDict = (type)=>{
  return request({
    url:`/admin/dict/type/${type}`,
    method: 'get',
  })
}
// 导出excel
export const excel = (url,query)=>{
  return request({
    url,
    method: 'get',
    params: query,
    responseType: 'arraybuffer'
  })
}
// 导出excel
export const excelPost = (url,query)=>{
  return request({
    url,
    method: 'post',
    data: query,
    responseType: 'arraybuffer'
  })
}

// 查询电厂数据状态
export const getPlantDs = (query)=>{
  return request({
    url:"job/dataStatus/getPlantDs",
    method: 'get',
    params: query,
  })
}
// 查询区域数据状态
export const getAreaDs = (query)=>{
  return request({
    url:"job/dataStatus/getDs",
    method: 'get',
    params: query,
  })
}

// 人工补偿
export const runCpsByMan = (query)=>{
  return request({
    url:"job/dataStatus/runCpsByMan",
    method: 'get',
    params: query,
  })
}
