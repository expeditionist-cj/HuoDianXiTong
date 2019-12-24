import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/datamonitor/hdenergy/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/datamonitor/hdenergy',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/datamonitor/hdenergy/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/datamonitor/hdenergy/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/datamonitor/hdenergy',
    method: 'put',
    data: obj
  })
}
