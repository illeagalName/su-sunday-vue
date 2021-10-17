import request from '@/utils/request'

export function getList(params) {
    return request({
        url: '/user/log/all',
        method: 'get',
        params
    })
}
