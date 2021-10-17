import router from './router'
import store from './store'
// message提示
import {Message} from 'element-ui'
// 进度条
import NProgress from 'nprogress'
//  进度条 bar style
import 'nprogress/nprogress.css'
// 获取token
import {getToken} from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

// NProgress 配置
NProgress.configure({showSpinner: false})

// 路由白名单
const whiteList = ['/login', '/register']

router.beforeEach(async (to, from, next) => {
    NProgress.start()

    // 设置浏览器导航上的名字
    document.title = getPageTitle(to.meta.title)

    const hasToken = getToken()

    if (hasToken) {
        if (to.path === '/login') {
            next({path: '/'})
            NProgress.done()
        } else {
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if (hasRoles) {
                next()
            } else {
                try {
                    const {roles} = await store.dispatch('user/getInfo')

                    // 动态路由生成
                    const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
                    accessRoutes.push({path: '*', redirect: '/404', hidden: true})
                    accessRoutes.forEach(route => {
                        router.addRoute(route)
                    })
                    // hack method 确保addRoutes完成
                    // 设置replace: true，这样导航就不会留下历史记录
                    next({...to, replace: true})
                } catch (error) {
                    await store.dispatch('user/resetToken')
                    Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})
