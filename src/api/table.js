import request from '@/utils/request'

export function getList(params) {
    return request({
        url: '/system/log/all',
        method: 'get',
        params
    })
}
