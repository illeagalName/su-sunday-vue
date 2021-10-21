import {login, logout, getInfo} from '@/api/user'
import {resetRouter} from '@/router'
import jwt_decode from "jwt-decode"

const TYPES = {
    RESET_STATE: 'RESET_STATE',// 重置state
    SET_TOKEN: 'SET_TOKEN',// 设置token
    SET_USER_NAME: 'SET_USER_NAME', // 设置名字
    SET_NICK_NAME: 'SET_NICK_NAME', // 设置名字
    SET_AVATAR: 'SET_AVATAR',// 设置头像
    SET_ROLES: 'SET_ROLES'// 设置角色
}

const getDefaultState = () => {
    return {
        token: localStorage.getExpire("token"),
        userName: '',
        nickName: '',
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
    [TYPES.SET_USER_NAME]: (state, userName) => {
        state.userName = userName
    },
    [TYPES.SET_NICK_NAME]: (state, nickName) => {
        state.nickName = nickName
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
                // 解析token
                const {exp} = jwt_decode(data.token)
                localStorage.setExpire("token", data.token, exp * 1000)
                // setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 获取用户信息
    getInfo({commit}) {
        return new Promise((resolve, reject) => {
            getInfo().then(response => {
                const {data} = response

                if (!data) {
                    reject('验证失败，请重新登录.')
                }

                const {roles, nickName, userName, avatar} = data;

                // 角色不能为空，后台在新增用户时必须赋予一个默认角色
                if (!roles || roles.length <= 0) {
                    reject('用户信息异常!')
                }

                commit(TYPES.SET_ROLES, roles)
                commit(TYPES.SET_USER_NAME, userName)
                commit(TYPES.SET_NICK_NAME, nickName)
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
                localStorage.removeItem("token")
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
            localStorage.removeItem("token")
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

