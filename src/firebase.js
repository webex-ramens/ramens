import Vue from 'vue'
import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBPEDmrp-PU_5_akwer78whzf2dqOktNd4',
  authDomain: 'ramens-4803b.firebaseapp.com',
  projectId: 'ramens-4803b',
  storageBucket: 'ramens-4803b.appspot.com',
  messagingSenderId: '1059430771906',
  appId: '1:1059430771906:web:06baac9b1d8b23566a1f5b',
  measurementId: 'G-59WFS3EJ1G',
}

firebase.initializeApp(firebaseConfig)

const initialUserState = {
  uid: '',
  displayName: '',
  photoURL: '',
}

const $auth = Vue.observable({
  currentUser: { ...initialUserState },
})
firebase.auth().onAuthStateChanged((user) => {
  let state
  if (user) {
    const { uid, displayName, photoURL } = user
    firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          state = {
            uid,
            displayName,
            photoURL,
            ...doc.data(),
          }
        } else {
          state = {
            uid,
            displayName,
            photoURL,
          }
          firebase.firestore().collection('users').doc(user.uid).set({
            uid,
            name: displayName,
            photoURL: photoURL,
            isVIP: false,
            profile: '',
          })
        }
        Object.assign($auth.currentUser, state)
      })
  } else {
    state = initialUserState
    Object.assign($auth.currentUser, state)
  }
})
Vue.prototype.$auth = $auth
