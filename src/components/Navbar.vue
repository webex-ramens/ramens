<template>
  <v-app-bar>
    <div class="sign-in">
      <span @click="signIn">サインイン</span>
      <span @click="signOut">サインアウト</span>
    </div>
  </v-app-bar>
</template>

<script>
import firebase from 'firebase'

export default {
  methods: {
    signIn() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
    signOut() {
      firebase.auth().signOut()
      this.$router.push('/BeforeSignIn')
    },
  },
}
</script>

<style scoped>
.sign-in span {
  font-weight: bold;
  color: #0a4091;
  padding: 0 1rem;
}
.sign-in span:hover {
  color: #a332ad2b;
}

.sign-in {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
