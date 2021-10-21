import request from '@/utils/request'

export function todayElectricity() {
    return request({
        url: '/system/common/electricity',
        method: 'get'
    })
}