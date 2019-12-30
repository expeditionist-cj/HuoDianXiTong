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