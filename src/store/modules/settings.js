import defaultSettings from '@/settings'

const {showSettings, fixedHeader, sidebarLogo} = defaultSettings

const TYPES = {
    CHANGE_SETTING: 'CHANGE_SETTING'
}

const state = {
    showSettings: showSettings,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo
}

const mutations = {
    [TYPES.CHANGE_SETTING]: (state, {key, value}) => {
        // eslint-disable-next-line no-prototype-builtins
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }
    }
}

const actions = {
    changeSetting({commit}, data) {
        commit(TYPES.CHANGE_SETTING, data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

