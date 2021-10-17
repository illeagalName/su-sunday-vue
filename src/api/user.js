import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/user/info',
    method: 'get',
    params: { token }
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
