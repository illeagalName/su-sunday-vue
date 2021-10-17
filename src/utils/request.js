import axios from 'axios'
import {MessageBox, Message} from 'element-ui'
import store from '@/store'
import {getToken} from '@/utils/auth'

// 创建axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    // withCredentials: true, // 当跨域请求时发送cookie
    timeout: 10000 // 重试时间
})

// 请求拦截
service.interceptors.request.use(config => {
        //发送请求前可以操作一些东西

        if (store.getters.token) {
            config.headers.Authorization = 'Bearer ' + getToken()
        }
        config.headers['client_id'] = "web"
        return config
    }, error => {
        return Promise.reject(error)
    }
)

// 响应拦截
service.interceptors.response.use(
    response => {
        // 如果需要获取http的信息，如header、code等，则 response => response
        const res = response.data
        if (res.code !== 200) {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })

            // 50008: 非法token; 50012: 其他客户端登入; 50014: token过期;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                MessageBox.confirm('您已退出，您可以取消停留在此页面，或重新登录', '确认退出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload()
                    })
                })
            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    }, error => {
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
