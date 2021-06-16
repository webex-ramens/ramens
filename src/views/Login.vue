<template>
  <div id="app"></div>
</template>

<script>
import firebase from 'firebase/app'
import db from 'firebase'
export default {
  name: 'login',
  data() {
    return {
      errorMessage: '',
      type: 'seller',
    }
  },
  methods: {
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          const userData = {
            id: result.user.uid,
            name: result.additionalUserInfo.profile.given_name,
            email: result.additionalUserInfo.profile.email,
            sex: '',
          }
          console.log(userData)
          db.firestore().collection('users').doc(result.user.uid).set(userData)
          this.$router.push('/')
        })
        .catch((error) => {
          this.errorMessage = error.message
        })
    },
  },
}
</script>

<style scoped>
.header {
  display: flex;
  text-align: right;
}
</style>
