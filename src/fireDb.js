import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import * as firebaseui from 'firebaseui';

const config = {

    apiKey: "AIzaSyAvjyF5hcKSPDsiDlD6d3w5zcCuc3vVv5E",
    authDomain: "you-are-what-you-eat-93aee.firebaseapp.com",
    databaseURL: "https://you-are-what-you-eat-93aee.firebaseio.com",
    projectId: "you-are-what-you-eat-93aee",
    storageBucket: "you-are-what-you-eat-93aee.appspot.com",
    messagingSenderId: "667115990837",
    appId: "1:667115990837:web:2da22af5edb285e131e67c"
};

var start = null // start position of listener
var end = null // end position of listener

const fireDb = {
    context: null,
    uiConfig: null,
    ui: null,

    init(context) {
        this.context = context;

        firebase.initializeApp(config);
        this.uiConfig = {
            // signInSuccessUrl: '/#/dashboard',
            signInOptions: [
                // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                // firebase.auth.EmailAuthProvider.PROVIDER_ID
            ]
        }

        this.ui = new firebaseui.auth.AuthUI(firebase.auth());

        firebase.auth().onAuthStateChanged((user) => {
            this.context.$store.dispatch('user/setCurrentUser')

            let requireAuth = this.context.$route.matched.some(record => record.meta.requireAuth)
            let guestOnly = this.context.$route.matched.some(record => record.meta.guestOnly)

            if (requireAuth && !user) this.context.$router.push('login')
            else if (guestOnly && user) this.context.$router.push('dashboard')
        });
    },
    authForm(container) {
        this.ui.start(container, this.uiConfig);
    },
    user() {
        return this.context ? firebase.auth().currentUser : null;
    },
    getEntries(userId) {
        return firebase.firestore().collection('entries').where('user', '==', userId).orderBy('date_time', 'desc').limit(20)
    },
    entriesNextPage(userId, last) {
        return firebase.firestore().collection('entries').where('user', '==', userId).orderBy('date_time', 'desc')
            .startAfter(last).limit(20)
    },

    modifyEntries() {
        return firebase.firestore().collection('entries')
    },
    logout() {
        firebase.auth().signOut();
    }
}

export default fireDb;