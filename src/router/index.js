import Vue from 'vue'
import VueRouter from 'vue-router'
import fireDb from '@/fireDb'

import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'
import Dashboard from '../views/Dashboard.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Login',
        component: Auth,
        meta: { guestOnly: true },
    },
    { path: '*', redirect: '/login', meta: { guestOnly: true }, },
    {
        path: '/login',
        name: 'Login',
        meta: { guestOnly: true },
        component: Auth
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        meta: { requireAuth: true },
        component: Dashboard
    }
]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
})


export default router

router.beforeEach((to, from, next) => {
    let currentUser = fireDb.user()
        // let requireAuth = to.matched.some(record => record.meta.requireAuth)
    let guestOnly = to.matched.some(record => record.meta.guestOnly)

    //  if (requireAuth && !currentUser) next('auth')
    if (guestOnly && currentUser) next('dashboard')
    else next()
})