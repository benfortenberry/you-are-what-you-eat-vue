import Vue from 'vue'
import fireDb from '@/fireDb';

const state = {
    entry: null
}

const getters = {
    entry: state => state.entry,
}

const mutations = {
    setEntry: (state, entry) => {
        state.entry = entry
    }
}

const actions = {
    saveEntry: ({ commit }) => {
        commit('setUser', auth.user())
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}