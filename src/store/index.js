import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import entry from './modules/entry'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        user,
        entry
    }
})