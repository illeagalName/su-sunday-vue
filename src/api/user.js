import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/user/info',
    method: 'get'
  })
}

export function listRoutes() {
  return request({
    url: '/user/user/menus',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'delete'
  })
}

export function todayElectricity() {
  return request({
    url: '/user/user/electricity',
    method: 'get'
  })
}
