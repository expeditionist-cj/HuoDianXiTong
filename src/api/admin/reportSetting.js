import request from '@/router/axios'

// 查询
export function getBaseData(query) {
  return request({
    url: '/datamonitor/hd_plant_setting/query',
    method: 'get',
    params: query
  })
}
// 查询电耗计算
export function getRtTableData(query) {
  return request({
    url: '/datamonitor/hd_plant_setting/energy_config',
    method: 'get',
    params: query
  })
}
// 更新全项目设置接口
export function saveGlobal(query) {
  return request({
    url: '/datamonitor/hd_plant_setting/global',
    method: 'get',
    params: query
  })
}
// 更新单个电厂接口
export function saveTable(data) {
  return request({
    url: '/datamonitor/hd_plant_setting/single',
    method: 'post',
    data
  })
}
// 更新电耗计算
export function saveRtTable(data) {
  return request({
    url: '/datamonitor/hd_plant_setting/energy_config_update',
    method: 'post',
    data
  })
}