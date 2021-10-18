import {constantRoutes} from '@/router'
import {listRoutes} from "@/api/user";
import Layout from '@/layout'
import Link from '@/layout/components/Sidebar/Link'

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes) {
    const res = []

    routes.forEach(route => {
        const tmp = {...route}
        if (tmp.component === 'Layout') {
            tmp.component = Layout
        } else if (tmp.component === 'Link') {
            tmp.component = Link
        } else {
            tmp.component = loadView(tmp.component)
        }
        if (tmp.children != null && tmp.children && tmp.children.length) {
            tmp.children = filterAsyncRoutes(tmp.children)
        } else {
            delete route['children']
            delete route['redirect']
        }
        res.push(tmp)
    })

    return res
}

// 静态路由懒加载
export const loadView = (view) => {
    return (resolve) => require([`@/views/${view}`], resolve)
}

const TYPES = {
    SET_ROUTES: 'SET_ROUTES'
}

const state = {
    routes: [],
    addRoutes: []
}

const mutations = {
    [TYPES.SET_ROUTES]: (state, routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    }
}

const actions = {
    generateRoutes({commit}) {
        return new Promise((resolve, reject) => {
            listRoutes().then(response => {
                const menus = JSON.parse(JSON.stringify(response.data))
                let accessedRoutes = filterAsyncRoutes(menus)
                commit(TYPES.SET_ROUTES, accessedRoutes)
                resolve(accessedRoutes)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
