import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

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
