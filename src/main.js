import Vue from 'vue';
import uswds from 'uswds';
import VueFirestore from 'vue-firestore'
import App from './App.vue';
import router from './router'
import { store } from '@/store'
import fireDb from '@/fireDb'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
import { faBacterium } from '@fortawesome/free-solid-svg-icons'
import { faWeight } from '@fortawesome/free-solid-svg-icons'
import { faIceCream } from '@fortawesome/free-solid-svg-icons'
import { faCookie } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

var infiniteScroll = require('vue-infinite-scroll');
Vue.use(infiniteScroll)

library.add(faUtensils)
library.add(faCheck)
library.add(faWeight)
library.add(faIceCream)
library.add(faBacterium)
library.add(faCookie)
library.add(faTrash)
library.add(faPen)
library.add(faPlus)
library.add(faSignOutAlt)
library.add(faTimes)
library.add(faArrowLeft)
library.add(faArrowRight)

Vue.component('font-awesome-icon', FontAwesomeIcon)

require('firebase/firestore')

Vue.use(VueFirestore)

Vue.config.productionTip = false;

Vue.use(uswds);

Vue.use(require('vue-moment'));

new Vue({
    router,
    store,
    beforeCreate() {
        fireDb.init(this)
    },
    render: (h) => h(App)
}).$mount('#app');