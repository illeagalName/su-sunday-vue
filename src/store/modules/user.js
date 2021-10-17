import {login, logout, getInfo} from '@/api/user'
import {getToken, setToken, removeToken} from '@/utils/auth'
import {resetRouter} from '@/router'

const TYPES = {
    RESET_STATE: 'RESET_STATE',// 重置state
    SET_TOKEN: 'SET_TOKEN',// 设置token
    SET_NAME: 'SET_NAME', // 设置名字
    SET_AVATAR: 'SET_AVATAR',// 设置头像
    SET_ROLES: 'SET_ROLES'// 设置角色
}

const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        avatar: '',
        roles: []
    }
}

const state = getDefaultState()

const mutations = {
    [TYPES.RESET_STATE]: (state) => {
        Object.assign(state, getDefaultState())
    },
    [TYPES.SET_TOKEN]: (state, token) => {
        state.token = token
    },
    [TYPES.SET_NAME]: (state, name) => {
        state.name = name
    },
    [TYPES.SET_AVATAR]: (state, avatar) => {
        state.avatar = avatar
    },
    [TYPES.SET_ROLES]: (state, roles) => {
        state.roles = roles
    }
}

const actions = {
    // 用户登录
    login({commit}, userInfo) {
        const {username, password} = userInfo
        return new Promise((resolve, reject) => {
            login({username: username.trim(), password: password}).then(response => {
                const {data} = response
                commit(TYPES.SET_TOKEN, data.token)
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 获取用户信息
    getInfo({commit, state}) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const {data} = response

                if (!data) {
                    reject('验证失败，请重新登录.')
                }

                const {roles, name, avatar} = data

                // 角色不能为空，后台在新增用户时必须赋予一个默认角色
                if (!roles || roles.length <= 0) {
                    reject('用户信息异常!')
                }

                commit(TYPES.SET_ROLES, roles)
                commit(TYPES.SET_NAME, name)
                commit(TYPES.SET_AVATAR, avatar)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 用户登出
    logout({commit, state}) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                // 先移除token
                removeToken()
                resetRouter()
                commit(TYPES.RESET_STATE)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    resetToken({commit}) {
        return new Promise(resolve => {
            // 先移除token
            removeToken()
            commit(TYPES.RESET_STATE)
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

