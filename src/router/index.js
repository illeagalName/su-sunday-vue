import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

// // if set to true, lt will not appear in sidebar nav.
// // e.g. login or 401 page or as some editing pages /edit/1 (Default: false)
// hidden: true
//
// // this route cannot be clicked in breadcrumb navigation when noRedirect is set
// redirect: noRedirect
//
// // when you route a children below the declaration of more than one route,
// // it will automatically become a nested mode - such as the component page
// // when there is only one, the child route will be displayed as the root route
// // if you want to display your root route
// // regardless of the number of children declarations under the route
// // you can set alwaysShow: true
// // so that it will ignore the previously defined rules and always show the root route
// alwaysShow: true
//
// // set router name. It must be set，in order to avoid problems with <keep-alive>.
// name: 'router-name'
//
// meta: {
//     // required roles to navigate to this route. Support multiple permissions stacking.
//     // if not set means it doesn't need any permission.
//     roles: ['admin', 'editor']
//
//     // the title of the route to show in various components (e.g. sidebar, breadcrumbs).
//     title: 'title'
//
//     // svg icon class
//     icon: 'svg-name' // or el-icon-x
//
//     // when set true, the route will not be cached by <keep-alive> (default false)
//     noCache: true
//
//     // if false, the item will hidden in breadcrumb(default is true)
//     breadcrumb: false
//
//     // if set to true, it can be fixed in tags-view (default false)
//     affix: true // this is very useful in some scenarios, // click on the article to enter the article details page,
//
//     // When you set, the related item in the sidebar will be highlighted
//     // for example: a list page route of an article is: /article/list
//     // at this time the route is /article/1, but you want to highlight the route of the article list in the sidebar,
//     // you can set the following
//     activeMenu: '/article/list'
// }

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index'),
            meta: {title: '仪表盘', icon: 'dashboard'}
        }]
    }
    // ,
    // {
    //     path: '/example',
    //     component: Layout,
    //     redirect: '/example/table',
    //     name: 'Example',
    //     meta: {title: '案例', icon: 'el-icon-s-help'},
    //     children: [
    //         {
    //             path: 'table',
    //             name: 'Table',
    //             component: () => import('@/views/table/index'),
    //             meta: {title: '表格', icon: 'table'}
    //         },
    //         {
    //             path: 'tree',
    //             name: 'Tree',
    //             component: () => import('@/views/tree/index'),
    //             meta: {title: '树形', icon: 'tree'}
    //         }
    //     ]
    // },
    //
    // {
    //     path: '/form',
    //     component: Layout,
    //     children: [
    //         {
    //             path: 'index',
    //             name: 'Form',
    //             component: () => import('@/views/form/index'),
    //             meta: {title: '表单', icon: 'form'}
    //         }
    //     ]
    // }
]


const createRouter = () => new Router({
    // mode: 'history', // 默认hash
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // 重置路由
}


const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

export default router
