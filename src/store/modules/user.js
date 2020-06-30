import Vue from 'vue'
import fireDb from '@/fireDb';

const state = {
    user: null
}

const getters = {
    user: state => state.user,
    isLogged: state => (state.user !== null)
}

const mutations = {
    setUser: (state, user) => {
        state.user = user
    }
}

const actions = {
    setCurrentUser: ({ commit }) => {
        commit('setUser', fireDb.user())
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}