import Cookies from 'js-cookie'


const TYPES = {
    TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
    CLOSE_SIDEBAR: 'CLOSE_SIDEBAR',
    TOGGLE_DEVICE: 'TOGGLE_DEVICE'
}
const state = {
    sidebar: {
        opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
        withoutAnimation: false
    },
    device: 'desktop'
}

const mutations = {
    [TYPES.TOGGLE_SIDEBAR]: state => {
        state.sidebar.opened = !state.sidebar.opened
        state.sidebar.withoutAnimation = false
        if (state.sidebar.opened) {
            Cookies.set('sidebarStatus', 1)
        } else {
            Cookies.set('sidebarStatus', 0)
        }
    },
    [TYPES.CLOSE_SIDEBAR]: (state, withoutAnimation) => {
        Cookies.set('sidebarStatus', 0)
        state.sidebar.opened = false
        state.sidebar.withoutAnimation = withoutAnimation
    },
    [TYPES.TOGGLE_DEVICE]: (state, device) => {
        state.device = device
    }
}

const actions = {
    toggleSideBar({commit}) {
        commit(TYPES.TOGGLE_SIDEBAR)
    },
    closeSideBar({commit}, {withoutAnimation}) {
        commit(TYPES.CLOSE_SIDEBAR, withoutAnimation)
    },
    toggleDevice({commit}, device) {
        commit(TYPES.TOGGLE_DEVICE, device)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
